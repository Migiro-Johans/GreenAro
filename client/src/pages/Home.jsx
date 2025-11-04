import { Link } from 'react-router-dom';
import { TrendingUp, Shield, Users, ArrowRight, Clock, Award, CheckCircle } from 'lucide-react';

function Home() {
  const features = [
    {
      icon: <TrendingUp className="w-12 h-12 text-primary" />,
      title: "Competitive Rates",
      description: "Get the best interest rates on loans and savings accounts in the market."
    },
    {
      icon: <Shield className="w-12 h-12 text-primary" />,
      title: "Secure & Trusted",
      description: "Your money is safe with us. Licensed and regulated financial institution."
    },
    {
      icon: <Clock className="w-12 h-12 text-primary" />,
      title: "Quick Approval",
      description: "Get loan approvals within 24-48 hours with minimal documentation."
    },
    {
      icon: <Users className="w-12 h-12 text-primary" />,
      title: "Customer First",
      description: "Dedicated support team ready to help you achieve your financial goals."
    }
  ];

  const stats = [
    { number: "10,000+", label: "Happy Members" },
    { number: "KES 500M+", label: "Loans Disbursed" },
    { number: "15+", label: "Years of Service" },
    { number: "98%", label: "Satisfaction Rate" }
  ];

  const benefits = [
    "Low interest rates on all loan products",
    "Flexible repayment terms up to 48 months",
    "No hidden charges or fees",
    "Quick and easy application process",
    "Instant SMS notifications",
    "Online account management"
  ];

  return (
    <div>
      {/* Enhanced Hero Section */}
      <section className="relative bg-gradient-to-br from-green-600 via-green-500 to-emerald-500 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-white z-10">
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6 animate-fade-in">
                <Shield className="w-4 h-4" />
                <span className="text-sm font-medium">Licensed & Regulated SACCO</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight animate-fade-in-up">
                Your Journey to{' '}
                <span className="text-yellow-300">Financial Freedom</span>{' '}
                Starts Here
              </h1>

              {/* Subheadline */}
              <p className="text-xl md:text-2xl text-green-50 mb-8 leading-relaxed animate-fade-in-up delay-200">
                Join <strong>10,000+ members</strong> enjoying competitive loans, 
                attractive savings plans, and exceptional financial services tailored to your needs.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8 animate-fade-in-up delay-300">
                <Link
                  to="/product"
                  className="group bg-white hover:bg-yellow-300 text-green-600 px-8 py-4 rounded-lg font-bold text-lg transition-all transform hover:scale-105 shadow-xl hover:shadow-2xl flex items-center justify-center gap-2"
                >
                  Explore Products
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/contact"
                  className="bg-transparent hover:bg-white/10 text-white border-2 border-white px-8 py-4 rounded-lg font-bold text-lg transition-all backdrop-blur-sm flex items-center justify-center gap-2"
                >
                  <Users className="w-5 h-5" />
                  Become a Member
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center gap-6 text-green-50 animate-fade-in-up delay-400">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-yellow-300" />
                  <span className="text-sm">No Hidden Fees</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-yellow-300" />
                  <span className="text-sm">24hr Approval</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-yellow-300" />
                  <span className="text-sm">98% Satisfaction</span>
                </div>
              </div>
            </div>

            {/* Right Content - Feature Card */}
            <div className="hidden lg:block z-10 animate-fade-in-left">
              <div className="bg-white p-8 rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-300">
                {/* Top Badge */}
                <div className="flex items-center justify-between mb-6 pb-6 border-b-2 border-green-100">
                  <div className="flex items-center gap-3">
                    <div className="bg-green-100 p-3 rounded-full">
                      <Award className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-navy-900">Award Winning</h3>
                      <p className="text-sm text-navy-600">Best SACCO 2024</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-primary">15+</div>
                    <div className="text-xs text-navy-600">Years</div>
                  </div>
                </div>

                {/* Benefits List */}
                <div className="space-y-4 mb-6">
                  {benefits.slice(0, 5).map((benefit, index) => (
                    <div 
                      key={index} 
                      className="flex items-start gap-3 p-3 rounded-lg hover:bg-green-50 transition-colors"
                    >
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-navy-700 font-medium">{benefit}</span>
                    </div>
                  ))}
                </div>

                {/* Bottom Stats */}
                <div className="grid grid-cols-3 gap-4 pt-6 border-t-2 border-green-100">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">500M+</div>
                    <div className="text-xs text-navy-600">Loans</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">10K+</div>
                    <div className="text-xs text-navy-600">Members</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">98%</div>
                    <div className="text-xs text-navy-600">Happy</div>
                  </div>
                </div>
              </div>

              {/* Floating Icons Animation */}
              <div className="mt-8 flex justify-center gap-4">
                <div className="bg-white/20 backdrop-blur-sm p-4 rounded-full animate-bounce-slow">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div className="bg-white/20 backdrop-blur-sm p-4 rounded-full animate-bounce-slow delay-200">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div className="bg-white/20 backdrop-blur-sm p-4 rounded-full animate-bounce-slow delay-400">
                  <Clock className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Wave Decoration */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-16 fill-white" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
          </svg>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform duration-300">{stat.number}</div>
                <div className="text-navy-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-navy-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-navy-900 mb-4">
              Why Choose Green Arrow?
            </h2>
            <p className="text-xl text-navy-600 max-w-3xl mx-auto">
              We're committed to providing exceptional financial services that empower 
              our members to achieve their dreams.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-navy-100"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-navy-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-navy-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-emerald-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-green-50 mb-8 max-w-2xl mx-auto">
            Join Green Arrow today and take control of your financial future. 
            Our team is ready to help you every step of the way.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/downloads"
              className="bg-white hover:bg-navy-50 text-green-600 px-8 py-4 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Download Membership Form
            </Link>
            <Link
              to="/contact"
              className="bg-navy-900 hover:bg-navy-800 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Talk to an Expert
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;