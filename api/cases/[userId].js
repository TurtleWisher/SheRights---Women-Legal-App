const db = require('../../db');

export default function handler(req, res) {
  const { userId } = req.query;

  if (req.method === 'GET') {
    db
      .from('cases')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .then(({ data, error }) => {
        if (error) {
          res.status(500).json({ error: error.message });
          return;
        }
        res.status(200).json(data);
      });
  } else if (req.method === 'PUT') {
    const { status, updates } = req.body;
    db
      .from('cases')
      .update({ status, updates })
      .eq('id', userId)
      .then(({ data, error }) => {
        if (error) {
          res.status(500).json({ error: error.message });
          return;
        }
        res.status(200).json({ changes: data });
      });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
