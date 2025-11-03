// Simple FAQ-based chatbot with keyword matching
const chatbotResponses = {
  greeting: {
    keywords: ['hello', 'hi', 'hey', 'good morning', 'good afternoon'],
    response: 'Hello! Welcome to Green Arrow. How can I assist you today? I can help you with information about our loans, savings products, membership, or contact details.'
  },
  loans: {
    keywords: ['loan', 'borrow', 'credit', 'financing'],
    response: 'We offer various loan products including personal loans, business loans, and emergency loans. Would you like to know more about specific loan products or how to apply?'
  },
  savings: {
    keywords: ['savings', 'save', 'deposit', 'account'],
    response: 'Green Arrow provides multiple savings products to help you grow your money. We have regular savings accounts, fixed deposits, and special savings plans. What interests you?'
  },
  membership: {
    keywords: ['member', 'join', 'registration', 'sign up'],
    response: 'Becoming a member is easy! You can download our membership form from the Downloads page, fill it out, and submit it at any of our offices or upload it online. Would you like help with the registration process?'
  },
  contact: {
    keywords: ['contact', 'call', 'email', 'reach', 'office', 'location'],
    response: 'You can reach us via email, phone, or visit our offices. Please check our Contact Us page for detailed information, or I can transfer you to a customer service representative.'
  },
  hours: {
    keywords: ['hours', 'open', 'close', 'time', 'working'],
    response: 'Our offices are typically open Monday to Friday, 8:00 AM to 5:00 PM, and Saturday 9:00 AM to 1:00 PM. Some branches may have different hours.'
  },
  requirements: {
    keywords: ['requirement', 'need', 'document', 'necessary'],
    response: 'Requirements vary depending on the service. Generally, you\'ll need a valid ID, proof of income, and completed application forms. Check our Downloads page for specific requirements for each product.'
  }
};

function findBestResponse(message) {
  const lowerMessage = message.toLowerCase();
  
  // Check each category for keyword matches
  for (const [category, data] of Object.entries(chatbotResponses)) {
    for (const keyword of data.keywords) {
      if (lowerMessage.includes(keyword)) {
        return {
          response: data.response,
          requiresHuman: false
        };
      }
    }
  }
  
  // If no match found, suggest human assistance
  return {
    response: 'I\'m not sure I understand your question. Let me connect you with a customer service representative who can better assist you.',
    requiresHuman: true
  };
}

module.exports = { findBestResponse };