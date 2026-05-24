require('dotenv').config()
const express = require('express')
const cors    = require('cors')

const paymentsRouter = require('./routes/payments')

const app = express()

const PORT = process.env.PORT || 9090

const ALLOWED_ORIGINS = [
  process.env.FRONTEND_URL,
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:3000',
  'http://localhost:4173',
].filter(Boolean).map(o => o.trim().replace(/\/+$/, ''))

console.log('Allowed origins:', ALLOWED_ORIGINS)

const corsOptions = {
  origin(origin, callback) {
    if (!origin) return callback(null, true)
    const trimmed = origin.trim().replace(/\/+$/, '')
    if (ALLOWED_ORIGINS.includes(trimmed)) return callback(null, true)
    if (
      trimmed.endsWith('.vercel.app') ||
      trimmed.endsWith('.railway.app') ||
      trimmed.endsWith('.up.railway.app')
    ) {
      return callback(null, true)
    }
    console.warn('CORS blocked origin:', origin)
    callback(new Error('CORS blocked: ' + origin))
  },
  methods:      ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials:  true,
  optionsSuccessStatus: 200,
}

app.options('*', cors(corsOptions))
app.use(cors(corsOptions))

app.set('trust proxy', 1)

app.use(
  '/api/payments/webhook',
  express.raw({ type: '*/*' })
)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

/* ── Routes ───────────────────────────────────────────────── */
app.use('/api/payments', paymentsRouter)

/* ── Chat AI route ────────────────────────────────────────── */
app.post('/api/chat', async (req, res) => {
  const { messages, system } = req.body

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'messages array required' })
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type':      'application/json',
        'x-api-key':         process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model:      'claude-sonnet-4-20250514',
        max_tokens: 300,
        system:     system || '',
        messages,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      return res.status(response.status).json({ error: data.error?.message || 'API error' })
    }

    res.json({ content: data.content?.[0]?.text || '' })
  } catch (err) {
    console.error('Chat error:', err.message)
    res.status(500).json({ error: 'Server error' })
  }
})

/* ── Health check ─────────────────────────────────────────── */
app.get('/',        (_req, res) => res.json({ ok: true, service: 'EcomEvolve API' }))
app.get('/health',  (_req, res) => res.json({
  ok:        true,
  timestamp: new Date().toISOString(),
  port:      PORT,
  origins:   ALLOWED_ORIGINS,
  env: {
    NODE_ENV:      process.env.NODE_ENV || 'development',
    FRONTEND_URL:  process.env.FRONTEND_URL || 'not set',
    FLW_KEY_SET:   !!process.env.FLW_SECRET_KEY,
    RESEND_SET:    !!process.env.RESEND_API_KEY,
    ANTHROPIC_SET: !!process.env.ANTHROPIC_API_KEY,
  },
}))

/* ── 404 ──────────────────────────────────────────────────── */
app.use((req, res) => {
  res.status(404).json({
    error:  'Route not found',
    method: req.method,
    path:   req.path,
  })
})

/* ── Global error handler ─────────────────────────────────── */
app.use((err, _req, res, _next) => {
  console.error('Server error:', err.message)
  if (err.message?.startsWith('CORS blocked')) {
    return res.status(403).json({ error: err.message })
  }
  res.status(500).json({ error: 'Internal server error' })
})

/* ── Start ────────────────────────────────────────────────── */
app.listen(PORT, '0.0.0.0', () => {
  console.log(`EcomEvolve backend running → port ${PORT}`)
  console.log(`Health: http://localhost:${PORT}/health`)
})