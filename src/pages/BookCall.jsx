import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  RiCalendarLine, RiCheckboxCircleFill, RiArrowRightUpLine,
  RiUserLine, RiMailLine, RiPhoneLine, RiStore2Line,
  RiMessage2Line, RiInstagramLine, RiWhatsappLine,
  RiTimeLine, RiShieldCheckLine, RiStarFill,
  RiFacebookBoxLine, RiMapPinLine,
} from 'react-icons/ri'
import { SiTiktok } from 'react-icons/si'
import { useBooking } from '../hooks/useBooking'

const services = [
  'Shopify Store Design', 'Digital Marketing', 'SEO Optimization',
  'Social Media Management', 'Email Marketing', 'Website Design', 'Not Sure Yet',
]

const budgets = ['Under $300', '$300 – $500', '$500 – $1,000', '$1,000+', 'Not sure yet']

const steps = [
  { icon: RiCalendarLine,     title: 'Book Your Call',      desc: 'Fill the form and tell us about your brand and goals.' },
  { icon: RiMessage2Line,     title: 'Discovery Session',   desc: 'We talk about your brand, challenges, and what you want to achieve.' },
  { icon: RiStore2Line,       title: 'Get Your Strategy',   desc: 'We map out a clear plan and recommend the best service for your business.' },
  { icon: RiArrowRightUpLine, title: 'We Execute',          desc: "Once you're in, we get to work — fast, focused, and results-driven." },
]

const perks = [
  { icon: RiShieldCheckLine, text: '100% free, zero obligation' },
  { icon: RiTimeLine,        text: '30-minute focused session' },
  { icon: RiStarFill,        text: 'Tailored advice for your brand' },
  { icon: RiCalendarLine,    text: 'Flexible scheduling' },
]

const socials = [
  {
    icon: RiWhatsappLine, href: 'https://wa.me/message/322ETXOWGEWVG1',
    label: 'WhatsApp', handle: 'Quick replies, usually within 1hr',
    color: '#25D366', bg: 'rgba(37,211,102,0.08)', border: 'rgba(37,211,102,0.20)',
  },
  {
    icon: RiInstagramLine, href: 'https://www.instagram.com/proven_profit_?igsh=YzljYTk1ODg3Zg==',
    label: '@proven_profit_', handle: 'DM us on Instagram',
    color: '#E1306C', bg: 'rgba(225,48,108,0.08)', border: 'rgba(225,48,108,0.20)',
  },
  {
    icon: RiFacebookBoxLine, href: 'https://www.facebook.com/profile.php?id=100090118610774&mibextid=ZbWKwL',
    label: 'Facebook', handle: 'Follow our Facebook page',
    color: '#1877F2', bg: 'rgba(24,119,242,0.08)', border: 'rgba(24,119,242,0.20)',
  },
  {
    icon: SiTiktok, href: 'https://www.tiktok.com/@provenprofit',
    label: '@provenprofit', handle: 'Follow us on TikTok',
    color: '#0a0808', bg: 'rgba(10,8,8,0.06)', border: 'rgba(10,8,8,0.15)',
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.4, 0, 0.2, 1] } },
}
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } }

function SuccessScreen({ name, onReset }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center text-center gap-6 py-10"
    >
      <div className="relative">
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center text-3xl text-white"
          style={{ background: 'linear-gradient(135deg, #7C3AED, #F97316)', boxShadow: '0 8px 32px rgba(124,58,237,0.35)' }}
        >
          <RiCheckboxCircleFill />
        </div>
        <div
          className="absolute inset-0 rounded-full animate-ping opacity-20"
          style={{ background: 'linear-gradient(135deg, #7C3AED, #F97316)' }}
        />
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-2xl font-bold" style={{ fontFamily: "'Syne', sans-serif", color: 'var(--text)' }}>
          You're booked in, {name}! 🎉
        </h3>
        <p className="text-sm leading-relaxed max-w-sm mx-auto" style={{ color: 'var(--text-muted)' }}>
          We've received your request and will reach out within{' '}
          <strong style={{ color: 'var(--purple)' }}>24 hours</strong> to confirm your call time.
          Check your inbox and WhatsApp.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 mt-2">
        <a
          href="https://www.instagram.com/proven_profit_?igsh=YzljYTk1ODg3Zg=="
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary text-sm"
        >
          <RiInstagramLine /> Follow on Instagram
        </a>
        <button
          onClick={onReset}
          className="text-sm font-medium transition-colors duration-200 hover:text-[#7C3AED]"
          style={{ color: 'var(--light-muted)' }}
        >
          Submit another request
        </button>
      </div>
    </motion.div>
  )
}

export default function BookCall() {
  const { submit, status, message: hookMessage, reset } = useBooking()

  const [form, setForm] = useState({
    name: '', email: '', phone: '', business: '',
    service: '', budget: '', message: '', preferredTime: '',
  })
  const [errors, setErrors] = useState({})

  const set = (key, val) => {
    setForm(f => ({ ...f, [key]: val }))
    if (errors[key]) setErrors(e => ({ ...e, [key]: '' }))
  }

  const validate = () => {
    const e = {}
    if (!form.name.trim())  e.name    = 'Name is required'
    if (!form.email.trim()) e.email   = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email'
    if (!form.service)      e.service = 'Please select a service'
    return e
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    await submit({ ...form })
  }

  const handleReset = () => {
    reset()
    setForm({ name: '', email: '', phone: '', business: '', service: '', budget: '', message: '', preferredTime: '' })
    setErrors({})
  }

  const isSuccess = status === 'success'
  const isLoading = status === 'loading'

  return (
    <div style={{ background: 'var(--light)' }} className="min-h-screen">

      {/* ── Hero ── */}
      <section className="relative pt-32 sm:pt-40 pb-16 overflow-hidden">
        <div className="absolute top-0 left-0 w-[600px] h-[400px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at top left, rgba(124,58,237,0.10) 0%, transparent 70%)', filter: 'blur(40px)' }} />
        <div className="absolute top-0 right-0 w-[400px] h-[300px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at top right, rgba(249,115,22,0.08) 0%, transparent 70%)', filter: 'blur(40px)' }} />

        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 relative z-10">
          <motion.div variants={stagger} initial="hidden" animate="show"
            className="flex flex-col items-center text-center gap-5 max-w-2xl mx-auto">
            <motion.span variants={fadeUp} className="section-tag">
              <RiCalendarLine /> Free Discovery Call
            </motion.span>
            <motion.h1 variants={fadeUp}
              className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight"
              style={{ fontFamily: "'Syne', sans-serif", color: 'var(--text)' }}>
              Let's Build Your Brand <span className="text-gradient">Together</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-base leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              Book a free 30-minute call. No pitch, no pressure — just a real conversation about your brand and how we can help it grow.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-4 pt-1">
              {perks.map(({ icon: Icon, text }) => (
                <span key={text} className="flex items-center gap-1.5 text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
                  <Icon style={{ color: 'var(--purple)' }} className="text-sm" /> {text}
                </span>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Main content ── */}
      <section className="pb-24 sm:pb-32">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-[1fr_1.5fr] gap-10 lg:gap-14 items-start">

            {/* ── Left ── */}
            <motion.div
              initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
              className="lg:sticky lg:top-28 flex flex-col gap-8"
            >
              {/* How it works */}
              <div className="card-base flex flex-col gap-5">
                <h3 className="text-lg font-bold" style={{ fontFamily: "'Syne', sans-serif", color: 'var(--text)' }}>
                  How It Works
                </h3>
                <div className="flex flex-col gap-4">
                  {steps.map(({ icon: Icon, title, desc }, i) => (
                    <div key={title} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center text-sm text-white flex-shrink-0"
                          style={{ background: 'linear-gradient(135deg, #7C3AED, #5B21B6)', boxShadow: '0 4px 12px rgba(124,58,237,0.30)' }}>
                          <Icon />
                        </div>
                        {i < steps.length - 1 && (
                          <div className="w-px flex-1 mt-2"
                            style={{ background: 'linear-gradient(to bottom, rgba(124,58,237,0.25), transparent)' }} />
                        )}
                      </div>
                      <div className="pb-4">
                        <p className="font-semibold text-sm mb-0.5" style={{ fontFamily: "'Syne', sans-serif", color: 'var(--text)' }}>{title}</p>
                        <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact */}
              <div className="card-base flex flex-col gap-4">
                <h3 className="text-base font-bold" style={{ fontFamily: "'Syne', sans-serif", color: 'var(--text)' }}>
                  Or reach out directly
                </h3>
                <div className="flex flex-col gap-2.5">
                  <a href="tel:+2348059846912" className="flex items-center gap-2.5 text-sm transition-colors duration-200 hover:text-[#7C3AED]" style={{ color: 'var(--text-muted)' }}>
                    <RiPhoneLine style={{ color: 'var(--purple)' }} /> +234 805 984 6912
                  </a>
                  <a href="mailto:info@provenprofitmarketing.com" className="flex items-center gap-2.5 text-sm transition-colors duration-200 hover:text-[#7C3AED]" style={{ color: 'var(--text-muted)' }}>
                    <RiMailLine style={{ color: 'var(--orange)' }} /> info@provenprofitmarketing.com
                  </a>
                  <div className="flex items-center gap-2.5 text-sm" style={{ color: 'var(--text-muted)' }}>
                    <RiMapPinLine style={{ color: 'var(--purple)' }} /> Lagos, Ikeja, Nigeria
                  </div>
                </div>
                <div className="h-px" style={{ background: 'var(--dark-border)' }} />
                <div className="flex flex-col gap-2">
                  {socials.map(({ icon: Icon, href, label, handle, color, bg, border }) => (
                    <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200 group"
                      style={{ background: bg, border: `1px solid ${border}` }}>
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center text-base flex-shrink-0 group-hover:scale-110 transition-transform duration-200"
                        style={{ background: `${color}20`, color }}>
                        <Icon />
                      </div>
                      <div>
                        <p className="font-semibold text-sm" style={{ color: 'var(--text)' }}>{label}</p>
                        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{handle}</p>
                      </div>
                      <RiArrowRightUpLine className="ml-auto text-sm group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200"
                        style={{ color: 'var(--light-muted)' }} />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* ── Right: Form ── */}
            <motion.div
              initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
            >
              <div className="rounded-3xl overflow-hidden shadow-xl"
                style={{ background: '#FFFFFF', border: '1px solid var(--dark-border)' }}>
                {/* Header */}
                <div className="px-6 sm:px-8 py-6"
                  style={{ background: 'linear-gradient(135deg, #7C3AED 0%, #5B21B6 50%, #F97316 100%)' }}>
                  <h2 className="text-white font-black text-xl" style={{ fontFamily: "'Syne', sans-serif" }}>
                    Book Your Free Call
                  </h2>
                  <p className="text-white/70 text-xs mt-1">Fill this in and we'll confirm your time within 24 hours.</p>
                </div>

                <div className="p-6 sm:p-8">
                  <AnimatePresence mode="wait">
                    {isSuccess ? (
                      <SuccessScreen key="success" name={form.name.split(' ')[0]} onReset={handleReset} />
                    ) : (
                      <motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        onSubmit={handleSubmit} className="flex flex-col gap-5">

                        {/* Name + Email */}
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold uppercase tracking-wider"
                              style={{ color: 'var(--text-muted)', fontFamily: "'Syne', sans-serif" }}>Full Name *</label>
                            <div className="relative">
                              <RiUserLine className="absolute left-3 top-1/2 -translate-y-1/2 text-sm" style={{ color: '#94A3B8' }} />
                              <input type="text" placeholder="John Doe" value={form.name}
                                onChange={e => set('name', e.target.value)}
                                className={`input-base pl-9 ${errors.name ? 'border-red-400' : ''}`} />
                            </div>
                            {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold uppercase tracking-wider"
                              style={{ color: 'var(--text-muted)', fontFamily: "'Syne', sans-serif" }}>Email Address *</label>
                            <div className="relative">
                              <RiMailLine className="absolute left-3 top-1/2 -translate-y-1/2 text-sm" style={{ color: '#94A3B8' }} />
                              <input type="email" placeholder="john@example.com" value={form.email}
                                onChange={e => set('email', e.target.value)}
                                className={`input-base pl-9 ${errors.email ? 'border-red-400' : ''}`} />
                            </div>
                            {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
                          </div>
                        </div>

                        {/* Phone + Business */}
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold uppercase tracking-wider"
                              style={{ color: 'var(--text-muted)', fontFamily: "'Syne', sans-serif" }}>WhatsApp / Phone</label>
                            <div className="relative">
                              <RiPhoneLine className="absolute left-3 top-1/2 -translate-y-1/2 text-sm" style={{ color: '#94A3B8' }} />
                              <input type="tel" placeholder="+234 800 000 0000" value={form.phone}
                                onChange={e => set('phone', e.target.value)} className="input-base pl-9" />
                            </div>
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold uppercase tracking-wider"
                              style={{ color: 'var(--text-muted)', fontFamily: "'Syne', sans-serif" }}>Business / Brand Name</label>
                            <div className="relative">
                              <RiStore2Line className="absolute left-3 top-1/2 -translate-y-1/2 text-sm" style={{ color: '#94A3B8' }} />
                              <input type="text" placeholder="Your Brand Co." value={form.business}
                                onChange={e => set('business', e.target.value)} className="input-base pl-9" />
                            </div>
                          </div>
                        </div>

                        {/* Service pill selector */}
                        <div className="flex flex-col gap-2">
                          <label className="text-xs font-semibold uppercase tracking-wider"
                            style={{ color: 'var(--text-muted)', fontFamily: "'Syne', sans-serif" }}>Service You're Interested In *</label>
                          <div className="flex flex-wrap gap-2">
                            {services.map(s => (
                              <button key={s} type="button" onClick={() => set('service', s)}
                                className="text-xs font-semibold px-3.5 py-2 rounded-full border transition-all duration-200"
                                style={form.service === s ? {
                                  background: 'linear-gradient(135deg, #7C3AED, #5B21B6)',
                                  borderColor: '#7C3AED', color: '#fff',
                                  boxShadow: '0 4px 12px rgba(124,58,237,0.30)',
                                } : {
                                  background: 'transparent',
                                  borderColor: 'var(--dark-border)',
                                  color: 'var(--text-muted)',
                                }}>
                                {s}
                              </button>
                            ))}
                          </div>
                          {errors.service && <p className="text-red-500 text-xs">{errors.service}</p>}
                        </div>

                        {/* Budget pill selector */}
                        <div className="flex flex-col gap-2">
                          <label className="text-xs font-semibold uppercase tracking-wider"
                            style={{ color: 'var(--text-muted)', fontFamily: "'Syne', sans-serif" }}>Approximate Budget</label>
                          <div className="flex flex-wrap gap-2">
                            {budgets.map(b => (
                              <button key={b} type="button" onClick={() => set('budget', b)}
                                className="text-xs font-semibold px-3.5 py-2 rounded-full border transition-all duration-200"
                                style={form.budget === b ? {
                                  background: 'rgba(249,115,22,0.10)',
                                  borderColor: 'rgba(249,115,22,0.50)', color: '#F97316',
                                } : {
                                  background: 'transparent',
                                  borderColor: 'var(--dark-border)',
                                  color: 'var(--text-muted)',
                                }}>
                                {b}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Preferred time */}
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-semibold uppercase tracking-wider"
                            style={{ color: 'var(--text-muted)', fontFamily: "'Syne', sans-serif" }}>Preferred Call Time</label>
                          <input type="text" placeholder="e.g. Weekdays after 5pm WAT, or weekends"
                            value={form.preferredTime} onChange={e => set('preferredTime', e.target.value)}
                            className="input-base" />
                        </div>

                        {/* Message */}
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-semibold uppercase tracking-wider"
                            style={{ color: 'var(--text-muted)', fontFamily: "'Syne', sans-serif" }}>Tell Us About Your Brand</label>
                          <textarea rows={4} value={form.message}
                            placeholder="What are you building? What's your goal in the next 90 days? Where are you stuck?"
                            onChange={e => set('message', e.target.value)}
                            className="input-base resize-none" />
                        </div>

                        {/* API / hook error */}
                        {(errors.submit || (status === 'error' && hookMessage)) && (
                          <p className="text-xs rounded-xl px-4 py-3"
                            style={{ background: 'rgba(239,68,68,0.08)', color: '#EF4444', border: '1px solid rgba(239,68,68,0.20)' }}>
                            {errors.submit || hookMessage}
                          </p>
                        )}

                        {/* Submit */}
                        <button type="submit" disabled={isLoading}
                          className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed mt-1">
                          {isLoading ? (
                            <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Submitting...</>
                          ) : (
                            <><RiCalendarLine className="text-base" /> Book My Free Call <RiArrowRightUpLine /></>
                          )}
                        </button>

                        <p className="text-center text-[11px] leading-relaxed" style={{ color: 'var(--light-dim)' }}>
                          By submitting, you agree to be contacted via email or WhatsApp to confirm your session. No spam, ever.
                        </p>
                      </motion.form>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    </div>
  )
}