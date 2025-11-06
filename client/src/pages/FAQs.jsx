import { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle, Search } from 'lucide-react';

function FAQs() {
  const [openIndex, setOpenIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const faqs = [
    {
      category: 'membership',
      question: 'How do I become a member of Green Aro SACCO?',
      answer: 'To become a member, download and complete the membership application form from our Downloads page. Submit it along with a copy of your ID, passport photo, and the minimum share capital. You can submit at any of our branches or upload online.'
    },
    {
      category: 'membership',
      question: 'What is the minimum share capital required?',
      answer: 'The minimum share capital required is KES 5,000. This can be paid in installments over the first 6 months of membership.'
    },
    {
      category: 'membership',
      question: 'Can I withdraw my shares?',
      answer: 'Shares can be withdrawn when you terminate your membership. A notice period of 60 days is required, and all outstanding loans must be cleared before withdrawal.'
    },
    {
      category: 'loans',
      question: 'What types of loans does Green Aro offer?',
      answer: 'We offer Personal Loans, Business Loans, Home Improvement Loans, Education Loans, Emergency Loans, and Asset Financing. Each product has specific terms and conditions tailored to meet different needs.'
    },
    {
      category: 'loans',
      question: 'How much can I borrow?',
      answer: 'Loan amounts depend on your savings, guarantors, and repayment capacity. Generally, you can borrow up to 3 times your savings. Personal loans go up to KES 500,000, while business loans can reach KES 2,000,000.'
    },
    {
      category: 'loans',
      question: 'How long does loan approval take?',
      answer: 'Most loans are approved within 24-48 hours after submission of complete documentation. Emergency loans can be processed on the same day.'
    },
    {
      category: 'loans',
      question: 'Do I need collateral for a loan?',
      answer: 'Personal loans up to KES 200,000 typically don\'t require collateral, only guarantors. Larger loans and business loans may require collateral depending on the amount.'
    },
    {
      category: 'loans',
      question: 'What happens if I miss a loan payment?',
      answer: 'We encourage members to communicate early if they face payment challenges. Late payments attract a penalty fee. Continued default may lead to recovery procedures as outlined in our loan policy.'
    },
    {
      category: 'savings',
      question: 'What is the interest rate on savings?',
      answer: 'Regular savings accounts earn up to 10% per annum in dividends. Fixed deposits earn up to 12% depending on the term. Dividends are declared annually based on SACCO performance.'
    },
    {
      category: 'savings',
      question: 'Can I withdraw from my savings account?',
      answer: 'Yes, partial withdrawals are allowed from regular savings accounts. A minimum balance of KES 1,000 must be maintained. Fixed deposits cannot be withdrawn before maturity without penalty.'
    },
    {
      category: 'savings',
      question: 'How do I make deposits?',
      answer: 'Deposits can be made via MPESA, bank transfer, standing order, or cash/cheque at any of our branches. All payment details are available in the member portal.'
    },
    {
      category: 'general',
      question: 'What are the office hours?',
      answer: 'Our offices are open Monday to Friday from 8:00 AM to 5:00 PM, and Saturday from 9:00 AM to 1:00 PM. Some branches may have different hours.'
    },
    {
      category: 'general',
      question: 'How do I check my account balance?',
      answer: 'You can check your balance through our online member portal, mobile app, or by visiting any branch. You can also request a statement via email or SMS.'
    },
    {
      category: 'general',
      question: 'Is my money safe with Green Aro?',
      answer: 'Yes, absolutely. We are a licensed and regulated SACCO under the SASRA regulations. We maintain proper governance, regular audits, and comprehensive insurance coverage for member deposits.'
    },
    {
      category: 'general',
      question: 'How do I update my contact information?',
      answer: 'Visit any of our branches with your ID, or send an email to info@greenaro.co.ke with your updated information. Changes will be processed within 2 business days.'
    },
    {
      category: 'general',
      question: 'Do you charge monthly account maintenance fees?',
      answer: 'No, Green Aro does not charge monthly maintenance fees for regular savings or loan accounts. We believe in transparent pricing with no hidden charges.'
    }
  ];

  const categories = [
    { id: 'all', label: 'All Questions' },
    { id: 'membership', label: 'Membership' },
    { id: 'loans', label: 'Loans' },
    { id: 'savings', label: 'Savings' },
    { id: 'general', label: 'General' }
  ];

  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <HelpCircle className="w-16 h-16 text-primary mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600">
            Find answers to common questions about Green Aro SACCO services.
          </p>
        </div>

        {/* Search */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search for answers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 mb-8 justify-center">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-6 py-2 rounded-full font-medium transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* FAQ List */}
        {filteredFaqs.length > 0 ? (
          <div className="space-y-4">
            {filteredFaqs.map((faq, index) => (
              <div 
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-1 pr-4">
                    <span className="text-xs font-semibold text-primary uppercase tracking-wide">
                      {faq.category}
                    </span>
                    <h3 className="text-lg font-semibold text-gray-900 mt-1">
                      {faq.question}
                    </h3>
                  </div>
                  {openIndex === index ? (
                    <ChevronUp className="w-6 h-6 text-primary flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-6 h-6 text-gray-400 flex-shrink-0" />
                  )}
                </button>
                
                {openIndex === index && (
                  <div className="px-6 py-5 bg-gray-50 border-t border-gray-100">
                    <p className="text-gray-700 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <HelpCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-xl text-gray-500">No FAQs found</p>
            <p className="text-gray-400 mt-2">Try adjusting your search or filter</p>
          </div>
        )}

        {/* Contact CTA */}
        <div className="mt-16 bg-gradient-to-r from-green-50 to-green-100 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Still Have Questions?
          </h2>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            Can't find the answer you're looking for? Our friendly customer support 
            team is ready to help you.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/contact"
              className="bg-primary hover:bg-secondary text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Contact Support
            </a>
            <button
              onClick={() => {
                // Trigger chatbot to open
                const chatbotButton = document.querySelector('button[class*="fixed bottom-6"]');
                if (chatbotButton) chatbotButton.click();
              }}
              className="bg-white hover:bg-gray-50 text-primary border-2 border-primary px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Chat With Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FAQs;