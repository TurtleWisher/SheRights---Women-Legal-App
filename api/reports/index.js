const db = require('../../db');

export default function handler(req, res) {
  if (req.method === 'GET') {
    db
      .from('reports')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data, error }) => {
        if (error) {
          res.status(500).json({ error: error.message });
          return;
        }
        res.status(200).json(data);
      });
  } else if (req.method === 'POST') {
    const { user_name, location, issue, description } = req.body;
    db
      .from('reports')
      .insert({ user_name, location, issue, description })
      .select()
      .then(({ data, error }) => {
        if (error) {
          res.status(500).json({ error: error.message });
          return;
        }
        res.status(201).json({ id: data[0].id });
      });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
