// Enhanced FAQ-based chatbot with comprehensive keyword matching
const chatbotResponses = {
  greeting: {
    keywords: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening', 'greetings', 'hola', 'sup'],
    response: 'Hello! Welcome to Green Aro SACCO. How can I assist you today? I can help you with:\n• Loan products and applications\n• Savings accounts and deposits\n• Membership registration\n• Office locations and hours\n• General inquiries'
  },
  loans: {
    keywords: ['loan', 'borrow', 'credit', 'financing', 'lend', 'advance', 'debt'],
    response: 'We offer various loan products:\n• Personal Loans (up to KES 500,000)\n• Business Loans (up to KES 2M)\n• Home Improvement Loans\n• Education Loans\n• Emergency Loans\n• Asset Financing\n\nMost loans are approved within 24-48 hours. Would you like information about a specific loan product or how to apply?'
  },
  personalLoan: {
    keywords: ['personal loan', 'individual loan', 'private loan'],
    response: 'Personal Loans Details:\n• Amount: Up to KES 500,000\n• Rate: From 12% p.a.\n• Period: Up to 36 months\n• Features: Quick processing, minimal documentation, no collateral required for amounts under KES 200,000\n\nVisit our Products page or Downloads section for the application form!'
  },
  businessLoan: {
    keywords: ['business loan', 'commercial loan', 'company loan', 'enterprise'],
    response: 'Business Loans Details:\n• Amount: Up to KES 2,000,000\n• Rate: From 10% p.a.\n• Period: Up to 48 months\n• Features: Business growth capital, grace period available, business advisory support\n\nWe can help your business grow! Download the application form or contact us for more details.'
  },
  savings: {
    keywords: ['savings', 'save', 'deposit', 'account', 'investment', 'dividends'],
    response: 'Green Aro offers multiple savings options:\n• Regular Savings Account (up to 10% p.a.)\n• Fixed Deposit Account (up to 12% p.a.)\n• Locked Savings (up to 11% p.a.)\n• Junior Savings Account (up to 9% p.a.)\n\nAll accounts have competitive dividends and flexible terms. Which one interests you?'
  },
  membership: {
    keywords: ['member', 'join', 'registration', 'sign up', 'enroll', 'register', 'become member'],
    response: 'Becoming a member is easy!\n\n📝 Requirements:\n• Completed membership form\n• Copy of ID/Passport\n• Passport photo\n• Minimum share capital: KES 5,000 (payable in installments)\n\n📥 Download the form from our Downloads page or visit any branch. Need help with the process?'
  },
  contact: {
    keywords: ['contact', 'call', 'email', 'reach', 'office', 'location', 'address', 'branch'],
    response: '📍 Head Office: 123 Financial Street, Nairobi, Kenya\n📞 Phone: +254 700 000 000\n📧 Email: info@greenarrow.co.ke\n\n🕐 Working Hours:\n• Mon-Fri: 8:00 AM - 5:00 PM\n• Saturday: 9:00 AM - 1:00 PM\n\nVisit our Contact page for more details or to send us a message!'
  },
  hours: {
    keywords: ['hours', 'open', 'close', 'time', 'working', 'schedule', 'when'],
    response: 'Our office hours:\n\n🕐 Monday - Friday: 8:00 AM - 5:00 PM\n🕐 Saturday: 9:00 AM - 1:00 PM\n🕐 Sunday: Closed\n\nSome branches may have different hours. Which branch are you interested in?'
  },
  requirements: {
    keywords: ['requirement', 'need', 'document', 'necessary', 'needed', 'must have'],
    response: 'Requirements vary by service:\n\n👤 Membership: ID, photo, membership form, KES 5,000 minimum share capital\n\n💰 Loans: ID, application form, payslips/bank statements, guarantors (varies by amount)\n\n💳 Savings Account: ID, account opening form, initial deposit\n\nCheck our Downloads page for specific requirements and forms!'
  },
  application: {
    keywords: ['apply', 'application', 'how to apply', 'process', 'procedure'],
    response: 'Application Process:\n\n1️⃣ Download the relevant form from our Downloads page\n2️⃣ Complete all required fields\n3️⃣ Gather supporting documents\n4️⃣ Submit at any branch or upload online\n5️⃣ Receive confirmation within 24-48 hours\n\nWhat would you like to apply for? Loan, savings account, or membership?'
  },
  interest: {
    keywords: ['interest', 'rate', 'percentage', 'dividend', 'returns'],
    response: 'Our competitive rates:\n\n💰 Loans:\n• Personal: From 12% p.a.\n• Business: From 10% p.a.\n• Education: From 9% p.a.\n\n💵 Savings:\n• Regular: Up to 10% p.a.\n• Fixed Deposit: Up to 12% p.a.\n• Locked: Up to 11% p.a.\n\nRates are subject to review. Contact us for current rates!'
  },
  repayment: {
    keywords: ['repay', 'payment', 'installment', 'pay back', 'monthly payment'],
    response: 'Loan Repayment Options:\n\n✅ Automatic salary deduction\n✅ Standing order from your bank\n✅ MPESA payments\n✅ Direct bank transfer\n✅ Cash/cheque at any branch\n\nFlexible terms from 6-60 months depending on loan type. Need a repayment calculator?'
  },
  withdraw: {
    keywords: ['withdraw', 'withdrawal', 'take out', 'access money'],
    response: 'Withdrawal Information:\n\n💳 Regular Savings: Partial withdrawals allowed, minimum balance KES 1,000\n🔒 Fixed Deposits: Cannot withdraw before maturity without penalty\n📊 Shares: Can be withdrawn upon membership termination (60 days notice)\n\nWhat type of withdrawal are you interested in?'
  },
  fees: {
    keywords: ['fee', 'charge', 'cost', 'price', 'expense'],
    response: 'Fee Structure:\n\n✅ No monthly account maintenance fees\n✅ No hidden charges\n✅ Transparent loan processing fees\n✅ Competitive transaction fees\n\nWe believe in honest, transparent pricing. Specific fees depend on the service. What service are you asking about?'
  },
  online: {
    keywords: ['online', 'digital', 'mobile', 'app', 'internet', 'portal'],
    response: 'Digital Services:\n\n📱 Mobile app for account management\n💻 Online member portal\n📲 MPESA integration\n📧 Email statements\n💬 Live chat support (you\'re using it now!)\n\nWe\'re committed to making banking convenient for you!'
  },
  safety: {
    keywords: ['safe', 'secure', 'safety', 'protection', 'insured', 'risk'],
    response: 'Your Money is Safe! 🔒\n\n✅ Licensed and regulated by SASRA\n✅ Regular audits and compliance\n✅ Comprehensive insurance coverage\n✅ Strong governance structure\n✅ 15+ years of trusted service\n\nYour financial security is our priority!'
  },
  download: {
    keywords: ['download', 'form', 'pdf', 'document', 'file'],
    response: 'Visit our Downloads page to access:\n\n📄 Membership application forms\n📄 Loan application forms\n📄 Savings account forms\n📄 Policy documents\n📄 Terms and conditions\n\nAll forms are available in PDF format. Need help finding a specific form?'
  },
  thanks: {
    keywords: ['thank', 'thanks', 'appreciate', 'grateful'],
    response: 'You\'re welcome! 😊 Is there anything else I can help you with today? Our team is always here to support your financial journey!'
  },
  goodbye: {
    keywords: ['bye', 'goodbye', 'see you', 'later', 'thanks bye'],
    response: 'Thank you for contacting Green Aro SACCO! Have a great day! 👋\n\nFeel free to reach out anytime. We\'re here to help!'
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
  
  // Check for urgent/complex keywords that should trigger human assistance
  const urgentKeywords = ['urgent', 'emergency', 'complaint', 'problem', 'issue', 'error', 'wrong', 'help me', 'need help', 'not working'];
  const needsHuman = urgentKeywords.some(keyword => lowerMessage.includes(keyword));
  
  if (needsHuman) {
    return {
      response: 'I understand this is important to you. Let me connect you with a customer service representative who can provide personalized assistance. They will contact you shortly via email or phone.',
      requiresHuman: true
    };
  }
  
  // If no match found, suggest human assistance
  return {
    response: 'I want to make sure you get the best help possible. Let me connect you with a customer service representative who can better assist with your specific question. They\'ll reach out to you shortly!',
    requiresHuman: true
  };
}

module.exports = { findBestResponse };