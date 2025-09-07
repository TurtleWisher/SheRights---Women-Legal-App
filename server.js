const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const db = require('./db');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Serve index.html for the root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API to get case status by user_id
app.get('/api/cases/:userId', (req, res) => {
  const userId = req.params.userId;
  db.all('SELECT * FROM cases WHERE user_id = ?', [userId], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// API to add a new case
app.post('/api/cases', (req, res) => {
  const { user_id, description } = req.body;
  const sql = 'INSERT INTO cases (user_id, description) VALUES (?, ?)';
  db.run(sql, [user_id, description], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ id: this.lastID });
  });
});

// API to update case status and updates
app.put('/api/cases/:id', (req, res) => {
  const id = req.params.id;
  const { status, updates } = req.body;
  const sql = 'UPDATE cases SET status = ?, updates = ? WHERE id = ?';
  db.run(sql, [status, updates, id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ changes: this.changes });
  });
});

// API to submit a report
app.post('/api/reports', (req, res) => {
  const { user_name, location, issue, description } = req.body;
  const sql = 'INSERT INTO reports (user_name, location, issue, description) VALUES (?, ?, ?, ?)';
  db.run(sql, [user_name, location, issue, description], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ id: this.lastID });
  });
});

// API to get all reports
app.get('/api/reports', (req, res) => {
  db.all('SELECT * FROM reports ORDER BY created_at DESC', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
