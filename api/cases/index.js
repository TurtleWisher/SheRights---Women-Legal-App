const db = require('../../db');

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { user_id, description } = req.body;
    db
      .from('cases')
      .insert({ user_id, description })
      .select()
      .then(({ data, error }) => {
        if (error) {
          res.status(500).json({ error: error.message });
          return;
        }
        res.status(201).json({ id: data[0].id });
      });
  } else if (req.method === 'GET') {
    const { userId } = req.query;
    if (!userId) {
      res.status(400).json({ error: 'Missing userId query parameter' });
      return;
    }
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
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
