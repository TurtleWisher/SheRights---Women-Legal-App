// In-memory database for demo purposes
let cases = [
  {
    id: 1,
    user_id: 'user1',
    description: 'Sample case',
    status: 'open',
    updates: 'Initial case',
    created_at: new Date().toISOString()
  }
];
let nextId = 2;

export default function handler(req, res) {
  if (req.method === 'GET') {
    // Get cases by user_id
    const { userId } = req.query;
    const userCases = cases.filter(c => c.user_id === userId);
    res.status(200).json(userCases);
  } else if (req.method === 'POST') {
    // Add new case
    const { user_id, description } = req.body;
    const newCase = {
      id: nextId++,
      user_id,
      description,
      status: 'open',
      updates: '',
      created_at: new Date().toISOString()
    };
    cases.push(newCase);
    res.status(201).json({ id: newCase.id });
  } else if (req.method === 'PUT') {
    // Update case
    const { id } = req.query;
    const { status, updates } = req.body;
    const caseIndex = cases.findIndex(c => c.id == id);
    if (caseIndex !== -1) {
      cases[caseIndex].status = status;
      cases[caseIndex].updates = updates;
      res.status(200).json({ changes: 1 });
    } else {
      res.status(404).json({ error: 'Case not found' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
