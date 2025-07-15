export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ success: false, error: 'Method Not Allowed' });
    return;
  }

  let body = req.body;
  if (!body || typeof body !== 'object') {
    try {
      body = JSON.parse(req.body);
    } catch {
      body = {};
    }
  }

  const zapierUrl = 'https://hooks.zapier.com/hooks/catch/23779999/u2u1shg/';
  try {
    const zapierRes = await fetch(zapierUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    const data = await zapierRes.text();
    if (zapierRes.ok) {
      res.status(200).json({ success: true, zapierStatus: zapierRes.status, zapierBody: data });
    } else {
      res.status(zapierRes.status).json({ success: false, error: data, zapierStatus: zapierRes.status });
    }
  } catch (err) {
    res.status(500).json({ success: false, error: (err && err.stack ? err.stack : err) });
  }
} 