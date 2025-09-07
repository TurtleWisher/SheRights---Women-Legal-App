document.addEventListener('DOMContentLoaded', () => {
  const userIdInput = document.getElementById('user-id');
  const loadCasesBtn = document.getElementById('load-cases');
  const casesList = document.getElementById('cases-list');
  const newCaseDesc = document.getElementById('new-case-desc');
  const addCaseBtn = document.getElementById('add-case');

  loadCasesBtn.addEventListener('click', loadCases);
  addCaseBtn.addEventListener('click', addCase);

  const API_BASE_URL = 'http://localhost:3001';

  function loadCases() {
    const userId = userIdInput.value.trim();
    if (!userId) {
      alert('Please enter a User ID');
      return;
    }

    fetch(`${API_BASE_URL}/api/cases/${userId}`)
      .then(response => response.json())
      .then(cases => {
        casesList.innerHTML = '';
        cases.forEach(caseItem => {
          const caseEl = document.createElement('div');
          caseEl.className = 'case-item';
          caseEl.innerHTML = `
            <h4>Case ID: ${caseItem.id}</h4>
            <p>Description: ${caseItem.description}</p>
            <p>Status: ${caseItem.status}</p>
            <p>Updates: ${caseItem.updates || 'No updates yet'}</p>
            <button onclick="updateCase(${caseItem.id})" class="btn-glow">Update Status</button>
          `;
          casesList.appendChild(caseEl);
        });
      })
      .catch(error => console.error('Error loading cases:', error));
  }

  function addCase() {
    const userId = userIdInput.value.trim();
    const description = newCaseDesc.value.trim();
    if (!userId || !description) {
      alert('Please enter User ID and case description');
      return;
    }

    fetch(`${API_BASE_URL}/api/cases`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: userId, description })
    })
      .then(response => response.json())
      .then(data => {
        alert('Case added successfully');
        newCaseDesc.value = '';
        loadCases();
      })
      .catch(error => console.error('Error adding case:', error));
  }

  window.updateCase = function(caseId) {
    const newStatus = prompt('Enter new status (open, in progress, closed):');
    const updates = prompt('Enter updates:');
    if (newStatus && updates) {
    fetch(`${API_BASE_URL}/api/cases/${caseId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus, updates })
      })
        .then(response => response.json())
        .then(data => {
          alert('Case updated successfully');
          loadCases();
        })
        .catch(error => console.error('Error updating case:', error));
    }
  };
});
