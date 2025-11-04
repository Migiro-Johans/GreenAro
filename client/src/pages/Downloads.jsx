import { useState } from 'react';
import { Download, FileText, Search, Filter } from 'lucide-react';

function Downloads() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const documents = [
    {
      id: 1,
      category: 'membership',
      title: 'Membership Application Form',
      description: 'Complete this form to become a member of Green Arrow SACCO',
      size: '245 KB',
      format: 'PDF'
    },
    {
      id: 2,
      category: 'membership',
      title: 'Member Registration Requirements',
      description: 'List of documents required for membership registration',
      size: '180 KB',
      format: 'PDF'
    },
    {
      id: 3,
      category: 'loans',
      title: 'Personal Loan Application Form',
      description: 'Apply for a personal loan with this form',
      size: '320 KB',
      format: 'PDF'
    },
    {
      id: 4,
      category: 'loans',
      title: 'Business Loan Application Form',
      description: 'Complete business loan application with business plan template',
      size: '450 KB',
      format: 'PDF'
    },
    {
      id: 5,
      category: 'loans',
      title: 'Home Improvement Loan Form',
      description: 'Application form for home improvement financing',
      size: '290 KB',
      format: 'PDF'
    },
    {
      id: 6,
      category: 'loans',
      title: 'Education Loan Application',
      description: 'Apply for education financing for school fees',
      size: '275 KB',
      format: 'PDF'
    },
    {
      id: 7,
      category: 'loans',
      title: 'Loan Repayment Schedule Calculator',
      description: 'Excel template to calculate your loan repayment schedule',
      size: '85 KB',
      format: 'XLSX'
    },
    {
      id: 8,
      category: 'savings',
      title: 'Savings Account Opening Form',
      description: 'Open a new savings account with Green Arrow',
      size: '210 KB',
      format: 'PDF'
    },
    {
      id: 9,
      category: 'savings',
      title: 'Fixed Deposit Account Form',
      description: 'Open a fixed deposit account for better returns',
      size: '195 KB',
      format: 'PDF'
    },
    {
      id: 10,
      category: 'savings',
      title: 'Standing Order Form',
      description: 'Set up automatic monthly savings contributions',
      size: '165 KB',
      format: 'PDF'
    },
    {
      id: 11,
      category: 'policies',
      title: 'SACCO By-Laws',
      description: 'Complete Green Arrow SACCO by-laws and regulations',
      size: '890 KB',
      format: 'PDF'
    },
    {
      id: 12,
      category: 'policies',
      title: 'Privacy Policy',
      description: 'How we protect your personal information',
      size: '220 KB',
      format: 'PDF'
    },
    {
      id: 13,
      category: 'policies',
      title: 'Terms and Conditions',
      description: 'General terms and conditions for SACCO membership',
      size: '340 KB',
      format: 'PDF'
    },
    {
      id: 14,
      category: 'policies',
      title: 'Loan Policy Document',
      description: 'Complete loan policy and lending guidelines',
      size: '425 KB',
      format: 'PDF'
    },
    {
      id: 15,
      category: 'other',
      title: 'Account Statement Request Form',
      description: 'Request your account statement',
      size: '145 KB',
      format: 'PDF'
    },
    {
      id: 16,
      category: 'other',
      title: 'Complaint Resolution Form',
      description: 'Submit a formal complaint or feedback',
      size: '175 KB',
      format: 'PDF'
    }
  ];

  const categories = [
    { id: 'all', label: 'All Documents', count: documents.length },
    { id: 'membership', label: 'Membership', count: documents.filter(d => d.category === 'membership').length },
    { id: 'loans', label: 'Loans', count: documents.filter(d => d.category === 'loans').length },
    { id: 'savings', label: 'Savings', count: documents.filter(d => d.category === 'savings').length },
    { id: 'policies', label: 'Policies', count: documents.filter(d => d.category === 'policies').length },
    { id: 'other', label: 'Other', count: documents.filter(d => d.category === 'other').length }
  ];

  const filteredDocuments = documents.filter(doc => {
    const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory;
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleDownload = (doc) => {
    // Placeholder for actual download functionality
    alert(`Downloading: ${doc.title}\nThis will be implemented with backend integration.`);
  };

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Downloads Center</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Access all forms, documents, and resources you need for your SACCO transactions.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search documents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            
            {/* Category Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent appearance-none bg-white cursor-pointer min-w-[200px]"
              >
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {cat.label} ({cat.count})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Category Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full font-medium transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {cat.label} ({cat.count})
            </button>
          ))}
        </div>

        {/* Documents Grid */}
        {filteredDocuments.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDocuments.map(doc => (
              <div 
                key={doc.id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow p-6 border border-gray-100"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <FileText className="w-8 h-8 text-primary" />
                  </div>
                  <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                    {doc.format}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {doc.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {doc.description}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="text-sm text-gray-500">{doc.size}</span>
                  <button
                    onClick={() => handleDownload(doc)}
                    className="flex items-center gap-2 bg-primary hover:bg-secondary text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-xl text-gray-500">No documents found</p>
            <p className="text-gray-400 mt-2">Try adjusting your search or filter criteria</p>
          </div>
        )}

        {/* Help Section */}
        <div className="mt-16 bg-gradient-to-r from-green-50 to-green-100 rounded-2xl p-8 md:p-12">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Need Help with Forms?
            </h2>
            <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
              Our team is ready to assist you with completing any forms or answering 
              questions about required documents.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="/contact"
                className="bg-primary hover:bg-secondary text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Contact Support
              </a>
              <a
                href="/faqs"
                className="bg-white hover:bg-gray-50 text-primary border-2 border-primary px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                View FAQs
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Downloads;