document.addEventListener('DOMContentLoaded', () => {
  const reportForm = document.getElementById('report-form');
  const reportStatus = document.getElementById('report-status');

  reportForm.addEventListener('submit', submitReport);

  function submitReport(event) {
    event.preventDefault();

    const userName = document.getElementById('user-name').value.trim();
    const location = document.getElementById('location').value.trim();
    const issue = document.getElementById('issue-type').value;
    const description = document.getElementById('description').value.trim();

    if (!userName || !location || !issue || !description) {
      reportStatus.textContent = 'Please fill in all fields';
      reportStatus.style.color = '#ff6b6b';
      return;
    }

    fetch('/api/reports', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_name: userName, location, issue, description })
    })
      .then(response => response.json())
      .then(data => {
        reportStatus.textContent = 'Report submitted successfully. Report ID: ' + data.id;
        reportStatus.style.color = '#00d4ff';
        reportForm.reset();
      })
      .catch(error => {
        console.error('Error submitting report:', error);
        reportStatus.textContent = 'Error submitting report. Please try again.';
        reportStatus.style.color = '#ff6b6b';
      });
  }
});
