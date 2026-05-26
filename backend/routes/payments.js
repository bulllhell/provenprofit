const express    = require('express')
const router     = express.Router()
const axios      = require('axios')
const { Resend } = require('resend')

const resend     = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null
const FLW_SECRET = process.env.FLW_SECRET_KEY
const FLW_BASE   = 'https://api.flutterwave.com/v3'

const BRAND = {
  name:        'Proven Profit Marketing Agency Marketing',
  email:       'info@provenprofitmarketing.com',
  instagram:   'https://www.instagram.com/proven_profit_',
  whatsapp:    'https://wa.me/message/322ETXOWGEWVG1',
  facebook:    'https://www.facebook.com/provenprofit001',
  tiktok:      'https://www.tiktok.com/@provenprofit',
  linkedin:    'https://www.linkedin.com/in/olatunbosun-adeyemo-b09b84378',
  accentColor: '#7C3AED',
  orangeColor: '#F97316',
}

// Mirrors src/data/packages.js
const PACKAGES = {
  // eCommerce
  'ecom-starter':    { name: 'Starter',    amount: 499,  currency: 'USD', type: 'one-time' },
  'ecom-growth':     { name: 'Growth',     amount: 999,  currency: 'USD', type: 'one-time' },
  'ecom-pro':        { name: 'Pro',        amount: 1999, currency: 'USD', type: 'one-time' },
  // Social Media (monthly)
  'social-basic':    { name: 'Social Basic',    amount: 299, currency: 'USD', type: 'monthly' },
  'social-standard': { name: 'Social Standard', amount: 599, currency: 'USD', type: 'monthly' },
  'social-premium':  { name: 'Social Premium',  amount: 999, currency: 'USD', type: 'monthly' },
}

/* ══════════════════════════════════════════════════════════════
   POST /api/payments/initiate
══════════════════════════════════════════════════════════════ */
router.post('/initiate', async (req, res) => {
  try {
    const { packageId, customerName, customerEmail, businessName } = req.body

    const pkg = PACKAGES[packageId]
    if (!pkg) return res.status(400).json({ error: 'Invalid package selected' })
    if (!customerName || !customerEmail)
      return res.status(400).json({ error: 'Name and email are required' })

    const txRef = `PP-${packageId.toUpperCase()}-${Date.now()}`

    const payload = {
      tx_ref:       txRef,
      amount:       pkg.amount,
      currency:     pkg.currency,
      redirect_url: `${process.env.FRONTEND_URL}/thank-you?type=payment`,
      customer:     { email: customerEmail, name: customerName },
      customizations: {
        title:       BRAND.name,
        description: `${pkg.name} Package${pkg.type === 'monthly' ? ' (Monthly)' : ''}`,
        logo:        `${process.env.FRONTEND_URL}/favicon.ico`,
      },
      meta: { packageId, packageName: pkg.name, packageType: pkg.type, businessName: businessName || '' },
    }

    const response = await axios.post(`${FLW_BASE}/payments`, payload, {
      headers: { Authorization: `Bearer ${FLW_SECRET}`, 'Content-Type': 'application/json' },
    })

    if (response.data.status === 'success') {
      res.json({ paymentLink: response.data.data.link, txRef })
    } else {
      throw new Error('Failed to create payment link')
    }
  } catch (err) {
    console.error('Initiate error:', err.response?.data || err.message)
    res.status(500).json({ error: err.response?.data?.message || err.message })
  }
})

/* ══════════════════════════════════════════════════════════════
   POST /api/payments/webhook
══════════════════════════════════════════════════════════════ */
router.post('/webhook', async (req, res) => {
  try {
    const signature = req.headers['verif-hash']
    if (!signature || signature !== process.env.FLW_WEBHOOK_SECRET)
      return res.status(401).json({ error: 'Invalid signature' })

    const event = typeof req.body === 'string' ? JSON.parse(req.body) : req.body

    if (event.event === 'charge.completed' && event.data.status === 'successful') {
      const { customer, meta, amount, currency } = event.data
      const { packageName, packageType, businessName } = meta || {}

      console.log(`Payment confirmed: ${packageName} from ${customer.email}`)

      await sendClientEmail({ customerName: customer.name, customerEmail: customer.email, packageName, packageType, businessName, amount, currency })
      await sendOwnerEmail({  customerName: customer.name, customerEmail: customer.email, packageName, packageType, businessName, amount, currency })
    }

    res.json({ status: 'success' })
  } catch (err) {
    console.error('Webhook error:', err.message)
    res.status(500).json({ error: err.message })
  }
})

/* ══════════════════════════════════════════════════════════════
   GET /api/payments/verify
══════════════════════════════════════════════════════════════ */
router.get('/verify', async (req, res) => {
  try {
    const { transaction_id } = req.query
    if (!transaction_id) return res.status(400).json({ error: 'Transaction ID required' })

    const response = await axios.get(`${FLW_BASE}/transactions/${transaction_id}/verify`, {
      headers: { Authorization: `Bearer ${FLW_SECRET}` },
    })

    const data = response.data.data
    if (data.status === 'successful') {
      res.json({
        success:     true,
        amount:      data.amount,
        currency:    data.currency,
        customer:    data.customer,
        packageName: data.meta?.packageName || '',
        txRef:       data.tx_ref,
      })
    } else {
      res.json({ success: false, status: data.status })
    }
  } catch (err) {
    console.error('Verify error:', err.response?.data || err.message)
    res.status(500).json({ error: err.message })
  }
})

/* ══════════════════════════════════════════════════════════════
   POST /api/payments/booking
══════════════════════════════════════════════════════════════ */
router.post('/booking', async (req, res) => {
  try {
    const { name, email, phone, business, service, budget, preferredTime, message } = req.body

    if (!name || !email || !service)
      return res.status(400).json({ error: 'Name, email and service are required' })

    await resend.emails.send({
      from:    process.env.EMAIL_FROM,
      to:      BRAND.email,
      subject: `New Call Booking from ${name}`,
      html: `
        <h2 style="font-family:sans-serif">New Discovery Call Request</h2>
        <table style="font-family:sans-serif;border-collapse:collapse">
          <tr><td style="padding:6px 16px 6px 0"><b>Name</b></td><td>${name}</td></tr>
          <tr><td style="padding:6px 16px 6px 0"><b>Email</b></td><td>${email}</td></tr>
          <tr><td style="padding:6px 16px 6px 0"><b>Phone</b></td><td>${phone || 'Not provided'}</td></tr>
          <tr><td style="padding:6px 16px 6px 0"><b>Business</b></td><td>${business || 'Not provided'}</td></tr>
          <tr><td style="padding:6px 16px 6px 0"><b>Service</b></td><td>${service}</td></tr>
          <tr><td style="padding:6px 16px 6px 0"><b>Budget</b></td><td>${budget || 'Not specified'}</td></tr>
          <tr><td style="padding:6px 16px 6px 0"><b>Preferred Time</b></td><td>${preferredTime || 'Flexible'}</td></tr>
          <tr><td style="padding:6px 16px 6px 0"><b>Message</b></td><td>${message || 'No message'}</td></tr>
        </table>
      `,
    })

    await resend.emails.send({
      from:    process.env.EMAIL_FROM,
      to:      email,
      subject: `We received your request, ${name.split(' ')[0]}!`,
      html:    bookingConfirmHtml(name.split(' ')[0], service),
    })

    res.json({ success: true })
  } catch (err) {
    console.error('Booking error:', err.message)
    res.status(500).json({ error: err.message })
  }
})

/* ══════════════════════════════════════════════════════════════
   EMAIL HELPERS
══════════════════════════════════════════════════════════════ */
async function sendClientEmail({ customerName, customerEmail, packageName, packageType, businessName, amount, currency }) {
  try {
    await resend.emails.send({
      from:    process.env.EMAIL_FROM,
      to:      customerEmail,
      subject: `Payment Confirmed - ${packageName}`,
      html:    paymentConfirmHtml({ firstName: customerName.split(' ')[0], packageName, packageType, businessName, amount, currency }),
    })
  } catch (err) { console.error('Client email error:', err.message) }
}

async function sendOwnerEmail({ customerName, customerEmail, packageName, packageType, businessName, amount, currency }) {
  try {
    await resend.emails.send({
      from:    process.env.EMAIL_FROM,
      to:      BRAND.email,
      subject: `New Payment - ${packageName} (${currency} ${amount})`,
      html: `
        <h2 style="font-family:sans-serif">New Order Received</h2>
        <table style="font-family:sans-serif;border-collapse:collapse">
          <tr><td style="padding:6px 16px 6px 0"><b>Package</b></td><td>${packageName}</td></tr>
          <tr><td style="padding:6px 16px 6px 0"><b>Type</b></td><td>${packageType === 'monthly' ? 'Monthly Subscription' : 'One-time Payment'}</td></tr>
          <tr><td style="padding:6px 16px 6px 0"><b>Amount</b></td><td>${currency} ${amount}</td></tr>
          <tr><td style="padding:6px 16px 6px 0"><b>Customer</b></td><td>${customerName}</td></tr>
          <tr><td style="padding:6px 16px 6px 0"><b>Email</b></td><td>${customerEmail}</td></tr>
          <tr><td style="padding:6px 16px 6px 0"><b>Business</b></td><td>${businessName || 'Not provided'}</td></tr>
        </table>
        <p style="font-family:sans-serif">
          <a href="https://dashboard.flutterwave.com" style="color:${BRAND.accentColor}">View in Flutterwave Dashboard</a>
        </p>
      `,
    })
  } catch (err) { console.error('Owner email error:', err.message) }
}

/* ══════════════════════════════════════════════════════════════
   EMAIL TEMPLATES
══════════════════════════════════════════════════════════════ */
function paymentConfirmHtml({ firstName, packageName, packageType, businessName, amount, currency }) {
  return `
    <div style="font-family:sans-serif;max-width:540px;margin:0 auto;background:#F8F7FF;padding:32px;border-radius:16px">
      <div style="background:linear-gradient(135deg,#7C3AED,#5B21B6,#F97316);padding:36px 32px;border-radius:12px;text-align:center;margin-bottom:28px">
        <h1 style="color:#fff;margin:0;font-size:24px">Payment Confirmed!</h1>
        <p style="color:rgba(255,255,255,0.80);margin:10px 0 0;font-size:15px">Proven Profit Marketing Agency Marketing</p>
      </div>
      <p style="color:#1E1B2E;font-size:15px">Hi ${firstName},</p>
      <p style="color:#4B4669;font-size:14px;line-height:1.7">
        Your payment of <strong>${currency} ${amount}</strong> for the
        <strong>${packageName}</strong> package${packageType === 'monthly' ? ' (monthly subscription)' : ''} has been confirmed.
        ${businessName ? 'We will be working on <strong>' + businessName + '</strong>.' : ''}
      </p>
      <div style="background:#fff;border-left:4px solid #7C3AED;padding:18px 20px;margin:24px 0;border-radius:8px">
        <p style="margin:0;font-weight:700;color:#1E1B2E;font-size:14px">What happens next?</p>
        <p style="margin:10px 0 0;color:#4B4669;font-size:13px;line-height:1.65">
          Our team will reach out within <strong>24 hours</strong> to kick off your project.
          Keep an eye on your inbox and WhatsApp.
        </p>
      </div>
      <p style="color:#4B4669;font-size:13px;line-height:1.7">
        Reach us directly on
        <a href="${BRAND.whatsapp}" style="color:#7C3AED">WhatsApp</a> or follow us on
        <a href="${BRAND.instagram}" style="color:#7C3AED">Instagram</a>.
      </p>
      <p style="color:#4B4669;font-size:14px;margin-top:28px">
        Talk soon,<br/>
        <strong>The Proven Profit Marketing Agency Team</strong>
      </p>
      <div style="margin-top:32px;padding-top:20px;border-top:1px solid #E2D9F3">
        <a href="${BRAND.instagram}" style="color:#7C3AED;font-size:12px;margin-right:16px">Instagram</a>
        <a href="${BRAND.tiktok}"    style="color:#7C3AED;font-size:12px;margin-right:16px">TikTok</a>
        <a href="${BRAND.facebook}"  style="color:#7C3AED;font-size:12px;margin-right:16px">Facebook</a>
        <a href="${BRAND.whatsapp}"  style="color:#7C3AED;font-size:12px">WhatsApp</a>
      </div>
    </div>
  `
}

function bookingConfirmHtml(firstName, service) {
  return `
    <div style="font-family:sans-serif;max-width:540px;margin:0 auto;background:#F8F7FF;padding:32px;border-radius:16px">
      <div style="background:linear-gradient(135deg,#7C3AED,#5B21B6,#F97316);padding:36px 32px;border-radius:12px;text-align:center;margin-bottom:28px">
        <h1 style="color:#fff;margin:0;font-size:24px">Request Received!</h1>
        <p style="color:rgba(255,255,255,0.80);margin:10px 0 0;font-size:15px">Proven Profit Marketing Agency Marketing</p>
      </div>
      <p style="color:#1E1B2E;font-size:15px">Hi ${firstName},</p>
      <p style="color:#4B4669;font-size:14px;line-height:1.7">
        We have received your request for a <strong>${service}</strong> discovery call.
        Our team will be in touch within <strong>24 hours</strong> to confirm your slot.
      </p>
      <div style="background:#fff;border-left:4px solid #7C3AED;padding:18px 20px;margin:24px 0;border-radius:8px">
        <p style="margin:0;font-weight:700;color:#1E1B2E;font-size:14px">While you wait</p>
        <p style="margin:10px 0 0;color:#4B4669;font-size:13px;line-height:1.65">
          Check out our work on <a href="${BRAND.instagram}" style="color:#7C3AED">Instagram</a>
          or message us on <a href="${BRAND.whatsapp}" style="color:#7C3AED">WhatsApp</a>.
        </p>
      </div>
      <p style="color:#4B4669;font-size:14px;margin-top:28px">
        Talk soon,<br/>
        <strong>The Proven Profit Marketing Agency Team</strong>
      </p>
      <div style="margin-top:32px;padding-top:20px;border-top:1px solid #E2D9F3">
        <a href="${BRAND.instagram}" style="color:#7C3AED;font-size:12px;margin-right:16px">Instagram</a>
        <a href="${BRAND.tiktok}"    style="color:#7C3AED;font-size:12px;margin-right:16px">TikTok</a>
        <a href="${BRAND.facebook}"  style="color:#7C3AED;font-size:12px;margin-right:16px">Facebook</a>
        <a href="${BRAND.whatsapp}"  style="color:#7C3AED;font-size:12px">WhatsApp</a>
      </div>
    </div>
  `
}

module.exports = router