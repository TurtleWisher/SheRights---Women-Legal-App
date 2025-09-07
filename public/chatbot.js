document.addEventListener('DOMContentLoaded', () => {
  const chatMessages = document.getElementById('chat-messages');
  const chatInput = document.getElementById('chat-input');
  const sendBtn = document.getElementById('send-btn');

  let conversationHistory = [];

  const responses = {
    'marriage': [
      'Marriage laws can be complex. In many countries, the legal age is 18, but there are exceptions. What specific aspect are you asking about?',
      'For marriage rights, women have equal rights in most modern jurisdictions. However, cultural practices can vary. Do you need help with a specific situation?'
    ],
    'workplace': [
      'Workplace harassment is a serious issue and illegal in many places. Have you reported it to your HR department?',
      'Under workplace laws, you have the right to a safe environment. If you\'re facing discrimination, consider contacting a labor rights organization.'
    ],
    'property': [
      'Property rights for women are protected by law in most countries. In inheritance, women often have equal shares. What type of property issue are you dealing with?',
      'For property disputes, it\'s best to consult a lawyer. Laws vary by location and marital status.'
    ],
    'family': [
      'Family law covers custody, divorce, and support. Custody decisions prioritize the child\'s best interest. Do you need information on a specific family law topic?',
      'In divorce cases, assets are usually divided equally. Child support is calculated based on income and needs.'
    ],
    'harassment': [
      'Harassment, whether at work or elsewhere, is not acceptable. Document everything and report it to the appropriate authorities.',
      'If you\'re experiencing harassment, seek immediate help from local support services or police.'
    ],
    'divorce': [
      'Divorce proceedings vary by jurisdiction. Mediation can be a less adversarial option. Have you considered counseling?',
      'During divorce, spousal support may be awarded based on financial need and duration of marriage.'
    ],
    'custody': [
      'Child custody is determined by the court\'s assessment of the child\'s best interests. Factors include stability, parenting ability, and the child\'s wishes if old enough.',
      'Joint custody is becoming more common. Courts aim for arrangements that benefit the child.'
    ],
    'default': [
      'I\'m here to help with legal questions related to women\'s rights. Can you tell me more about your situation?',
      'Legal matters can be complex. For personalized advice, please consult a qualified attorney.',
      'What specific legal issue are you facing? I can provide general information on marriage, workplace, property, or family law.'
    ]
  };

  sendBtn.addEventListener('click', sendMessage);
  chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
  });

  function sendMessage() {
    const message = chatInput.value.trim();
    if (message) {
      addMessage('You: ' + message, 'user');
      conversationHistory.push({ role: 'user', content: message });
      // Add class to hide the label
      chatMessages.classList.add('has-message');
      const response = getResponse(message);
      setTimeout(() => {
        addMessage('Legal Assistant: ' + response, 'bot');
        conversationHistory.push({ role: 'assistant', content: response });
      }, 1000 + Math.random() * 1000); // Random delay for realism
      chatInput.value = '';
    }
  }

  function addMessage(message, sender) {
    const messageEl = document.createElement('div');
    messageEl.className = `message ${sender}`;
    messageEl.textContent = message;
    chatMessages.appendChild(messageEl);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function getResponse(message) {
    const lowerMessage = message.toLowerCase();
    for (const key in responses) {
      if (lowerMessage.includes(key)) {
        const responseArray = responses[key];
        return responseArray[Math.floor(Math.random() * responseArray.length)];
      }
    }
    const defaultArray = responses.default;
    return defaultArray[Math.floor(Math.random() * defaultArray.length)];
  }
});
