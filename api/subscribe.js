const KIT_FORM_ID = '9719331';

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  var body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch (e) { body = {}; }
  }
  body = body || {};

  var email = String(body.email || '').trim();
  var name = String(body.name || '').trim();

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'A valid email is required' });
  }

  var apiKey = process.env.KIT_API_KEY;
  if (!apiKey) {
    console.error('KIT_API_KEY is not configured');
    return res.status(500).json({ error: 'Server not configured' });
  }

  var kitHeaders = { 'Content-Type': 'application/json', 'X-Kit-Api-Key': apiKey };

  try {
    var createRes = await fetch('https://api.kit.com/v4/subscribers', {
      method: 'POST',
      headers: kitHeaders,
      body: JSON.stringify({ email_address: email, first_name: name })
    });

    if (!createRes.ok) {
      console.error('Kit create subscriber failed', createRes.status, await createRes.text());
      return res.status(502).json({ error: 'Could not save subscriber' });
    }

    var created = await createRes.json();
    var subscriberId = created.subscriber && created.subscriber.id;

    var addRes = await fetch('https://api.kit.com/v4/forms/' + KIT_FORM_ID + '/subscribers/' + subscriberId, {
      method: 'POST',
      headers: kitHeaders
    });

    if (!addRes.ok) {
      console.error('Kit add to form failed', addRes.status, await addRes.text());
      return res.status(502).json({ error: 'Could not save subscriber' });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Kit subscribe error', err);
    return res.status(502).json({ error: 'Could not save subscriber' });
  }
};
