// Load environment variables from .env (if present)
try { require('dotenv').config({ path: '.env' }); } catch (e) { /* dotenv may be absent; that's fine */ }
const express = require('express');
const app = express();

app.use(express.json({ limit: '10mb' }));

app.post('/generate', async (req, res) => {
  try {
    const key = process.env.GOOGLE_API_KEY;
    if (!key) return res.status(500).json({ error: 'Missing server API key' });

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${key}`;

    // Use global fetch when available (Node 18+). If not present, require node-fetch will be attempted.
    let fetchFn = global.fetch;
    if (!fetchFn) {
      try {
        // node-fetch v2 supports CommonJS; if unavailable this will throw and user will need Node 18+
        // eslint-disable-next-line global-require
        fetchFn = require('node-fetch');
      } catch (e) {
        return res.status(500).json({ error: 'Server fetch not available. Use Node 18+ or install node-fetch.' });
      }
    }

    const r = await fetchFn(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });

    const text = await r.text();
    res.status(r.status).send(text);
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

// Serve static files so you can open summarium.html at http://localhost:3000/summarium.html
app.use(express.static('.'));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`proxy listening on http://localhost:${port}`));
