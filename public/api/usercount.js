import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  let count = (await kv.get('usercount')) || 0;

  if (req.method === 'POST') {
    count = parseInt(req.body.count) || count;
    await kv.set('usercount', count);
  }

  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.status(200).json({ online_users: count });
}
