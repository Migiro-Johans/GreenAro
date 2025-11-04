import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  CreditCard, 
  TrendingUp, 
  Briefcase, 
  Home, 
  GraduationCap, 
  Zap,
  PiggyBank,
  Target,
  Lock,
  ArrowRight,
  Check
} from 'lucide-react';

function Products() {
  const [activeTab, setActiveTab] = useState('loans');

  const loanProducts = [
    {
      icon: <CreditCard className="w-12 h-12 text-primary" />,
      title: "Personal Loans",
      description: "Quick access to funds for personal needs",
      amount: "Up to KES 500,000",
      rate: "From 12% p.a.",
      period: "Up to 36 months",
      features: [
        "Instant loan processing",
        "Minimal documentation",
        "Flexible repayment options",
        "No collateral required"
      ]
    },
    {
      icon: <Briefcase className="w-12 h-12 text-primary" />,
      title: "Business Loans",
      description: "Grow your business with our competitive rates",
      amount: "Up to KES 2,000,000",
      rate: "From 10% p.a.",
      period: "Up to 48 months",
      features: [
        "Business growth capital",
        "Grace period available",
        "Business advisory support",
        "Asset financing options"
      ]
    },
    {
      icon: <Home className="w-12 h-12 text-primary" />,
      title: "Home Improvement Loans",
      description: "Make your dream home a reality",
      amount: "Up to KES 1,000,000",
      rate: "From 11% p.a.",
      period: "Up to 60 months",
      features: [
        "Renovation financing",
        "Construction loans",
        "Land purchase support",
        "Property title security"
      ]
    },
    {
      icon: <GraduationCap className="w-12 h-12 text-primary" />,
      title: "Education Loans",
      description: "Invest in your future through education",
      amount: "Up to KES 800,000",
      rate: "From 9% p.a.",
      period: "Up to 48 months",
      features: [
        "School fees financing",
        "Upkeep allowances",
        "Deferred payments option",
        "Support for all levels"
      ]
    },
    {
      icon: <Zap className="w-12 h-12 text-primary" />,
      title: "Emergency Loans",
      description: "Quick cash when you need it most",
      amount: "Up to KES 200,000",
      rate: "From 13% p.a.",
      period: "Up to 12 months",
      features: [
        "Same-day approval",
        "Minimal requirements",
        "Quick disbursement",
        "Short-term solution"
      ]
    },
    {
      icon: <CreditCard className="w-12 h-12 text-primary" />,
      title: "Asset Financing",
      description: "Finance vehicles and equipment",
      amount: "Up to KES 3,000,000",
      rate: "From 11% p.a.",
      period: "Up to 60 months",
      features: [
        "Vehicle financing",
        "Equipment purchase",
        "Up to 90% financing",
        "Competitive rates"
      ]
    }
  ];

  const savingsProducts = [
    {
      icon: <PiggyBank className="w-12 h-12 text-primary" />,
      title: "Regular Savings Account",
      description: "Build your wealth with attractive dividends",
      rate: "Up to 10% p.a.",
      minimum: "KES 1,000",
      features: [
        "Competitive dividend rates",
        "Unlimited deposits",
        "Partial withdrawals allowed",
        "No monthly fees"
      ]
    },
    {
      icon: <Target className="w-12 h-12 text-primary" />,
      title: "Fixed Deposit Account",
      description: "Lock in high returns with fixed deposits",
      rate: "Up to 12% p.a.",
      minimum: "KES 50,000",
      features: [
        "Higher interest rates",
        "Guaranteed returns",
        "3, 6, 12 month terms",
        "Loan security option"
      ]
    },
    {
      icon: <Lock className="w-12 h-12 text-primary" />,
      title: "Locked Savings",
      description: "Commit to long-term savings goals",
      rate: "Up to 11% p.a.",
      minimum: "KES 5,000/month",
      features: [
        "Disciplined saving",
        "Goal-based planning",
        "Premium interest rates",
        "Maturity bonuses"
      ]
    },
    {
      icon: <TrendingUp className="w-12 h-12 text-primary" />,
      title: "Junior Savings Account",
      description: "Secure your child's future",
      rate: "Up to 9% p.a.",
      minimum: "KES 500",
      features: [
        "Education planning",
        "Parental control",
        "Birthday bonuses",
        "Financial literacy support"
      ]
    }
  ];

  const currentProducts = activeTab === 'loans' ? loanProducts : savingsProducts;

  return (
    <div className="min-h-screen bg-navy-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-navy-900 mb-4">Our Products & Services</h1>
          <p className="text-xl text-navy-600 max-w-3xl mx-auto">
            Discover our comprehensive range of financial products designed to meet 
            your personal and business needs.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-white rounded-xl p-1.5 shadow-md border border-navy-200">
            <button
              onClick={() => setActiveTab('loans')}
              className={`px-8 py-3 rounded-lg font-semibold transition-all duration-300 ${
                activeTab === 'loans'
                  ? 'bg-primary text-white shadow-lg transform scale-105'
                  : 'text-navy-700 hover:text-navy-900'
              }`}
            >
              Loan Products
            </button>
            <button
              onClick={() => setActiveTab('savings')}
              className={`px-8 py-3 rounded-lg font-semibold transition-all duration-300 ${
                activeTab === 'savings'
                  ? 'bg-primary text-white shadow-lg transform scale-105'
                  : 'text-navy-700 hover:text-navy-900'
              }`}
            >
              Savings Products
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {currentProducts.map((product, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2 border border-navy-100"
            >
              <div className="p-8">
                <div className="mb-6 transform transition-transform hover:scale-110 duration-300">{product.icon}</div>
                <h3 className="text-2xl font-bold text-navy-900 mb-3">
                  {product.title}
                </h3>
                <p className="text-navy-600 mb-6">{product.description}</p>

                <div className="space-y-3 mb-6 bg-navy-50 rounded-lg p-4">
                  {product.amount && (
                    <div className="flex justify-between items-center">
                      <span className="text-navy-600 font-medium">Amount:</span>
                      <span className="font-bold text-navy-900">{product.amount}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center">
                    <span className="text-navy-600 font-medium">Rate:</span>
                    <span className="font-bold text-primary">{product.rate}</span>
                  </div>
                  {product.period && (
                    <div className="flex justify-between items-center">
                      <span className="text-navy-600 font-medium">Period:</span>
                      <span className="font-bold text-navy-900">{product.period}</span>
                    </div>
                  )}
                  {product.minimum && (
                    <div className="flex justify-between items-center">
                      <span className="text-navy-600 font-medium">Minimum:</span>
                      <span className="font-bold text-navy-900">{product.minimum}</span>
                    </div>
                  )}
                </div>

                <div className="border-t border-navy-200 pt-6 mb-6">
                  <h4 className="font-bold text-navy-900 mb-4">Key Features:</h4>
                  <ul className="space-y-3">
                    {product.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-navy-700 text-sm leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  to="/contact"
                  className="block w-full bg-primary hover:bg-primary-dark text-white text-center py-3.5 rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  Apply Now
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-500 rounded-2xl p-8 md:p-12 text-center shadow-xl">
          <h2 className="text-3xl font-bold text-white mb-4">
            Need Help Choosing the Right Product?
          </h2>
          <p className="text-lg text-green-50 mb-8 max-w-2xl mx-auto">
            Our financial advisors are ready to help you select the perfect product 
            that matches your needs and goals.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              className="bg-white hover:bg-navy-50 text-green-600 px-8 py-3.5 rounded-lg font-semibold transition-all duration-300 inline-flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Contact an Advisor
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/downloads"
              className="bg-navy-900 hover:bg-navy-800 text-white px-8 py-3.5 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Download Application Forms
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;