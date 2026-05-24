/**
 * chat-proxy.js
 * 
 * A tiny Express endpoint that proxies requests to the Anthropic API
 * so your ANTHROPIC_API_KEY never touches the browser.
 * 
 * Add to your existing Express/Node backend, OR run as a standalone
 * server on a separate port and proxy it in vite.config.js
 * 
 * Install: npm install express cors
 * Run:     node chat-proxy.js
 */

const express = require('express');
const cors    = require('cors');

const app  = express();
const PORT = process.env.CHAT_PORT || 3001;

app.use(cors({ origin: ['http://localhost:5173', 'http://localhost:5174', 'https://www.provenprofitbrand.com'] }));
app.use(express.json());

app.post('/api/chat', async (req, res) => {
  const { messages, system } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'messages array required' });
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type':         'application/json',
        'x-api-key':            process.env.ANTHROPIC_API_KEY,
        'anthropic-version':    '2023-06-01',
      },
      body: JSON.stringify({
        model:      'claude-sonnet-4-20250514',
        max_tokens: 300,
        system:     system || '',
        messages,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: data.error?.message || 'API error' });
    }

    res.json({ content: data.content?.[0]?.text || '' });
  } catch (err) {
    console.error('Chat proxy error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Chat proxy running on port ${PORT}`);
});