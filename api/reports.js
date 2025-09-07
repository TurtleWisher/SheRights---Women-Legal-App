// In-memory database for demo purposes
let reports = [];
let nextReportId = 1;

export default function handler(req, res) {
  if (req.method === 'GET') {
    // Get all reports
    res.status(200).json(reports);
  } else if (req.method === 'POST') {
    // Add new report
    const { user_name, location, issue, description } = req.body;
    const newReport = {
      id: nextReportId++,
      user_name,
      location,
      issue,
      description,
      created_at: new Date().toISOString()
    };
    reports.push(newReport);
    res.status(201).json({ id: newReport.id });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
