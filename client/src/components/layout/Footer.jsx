import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Send } from 'lucide-react';
import axios from 'axios';

function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: 'loading', message: 'Subscribing...' });

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/newsletter/subscribe`, { email });
      setStatus({ type: 'success', message: 'Successfully subscribed!' });
      setEmail('');
      setTimeout(() => setStatus({ type: '', message: '' }), 3000);
    } catch (error) {
      setStatus({
        type: 'error',
        message: error.response?.data?.error || 'Subscription failed',
      });
      setTimeout(() => setStatus({ type: '', message: '' }), 3000);
    }
  };

  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'About Us', path: '/about' },
    { name: 'Our Products', path: '/product' },
    { name: 'Downloads', path: '/downloads' },
    { name: 'FAQs', path: '/faqs' },
    { name: 'Contact', path: '/contact' },
  ];

  const products = [
    { name: 'Personal Loans', path: '/product' },
    { name: 'Business Loans', path: '/product' },
    { name: 'Savings Accounts', path: '/product' },
    { name: 'Fixed Deposits', path: '/product' },
  ];

  const legal = [
    { name: 'Privacy Policy', path: '/privacy' },
    { name: 'Terms & Conditions', path: '/terms' },
  ];

  return (
    <footer className="bg-navy-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* About Section */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-light rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">GA</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold">Green Arrow</span>
                <span className="text-xs text-navy-400 uppercase tracking-wide">SACCO</span>
              </div>
            </div>
            <p className="text-sm text-navy-300 mb-6 leading-relaxed">
              Your trusted financial partner for loans, savings, and financial growth since 2010. Building better futures together.
            </p>
            <div className="flex space-x-3">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" 
                 className="w-10 h-10 flex items-center justify-center bg-navy-800 hover:bg-primary rounded-lg transition-all duration-300 transform hover:-translate-y-1">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
                 className="w-10 h-10 flex items-center justify-center bg-navy-800 hover:bg-primary rounded-lg transition-all duration-300 transform hover:-translate-y-1">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                 className="w-10 h-10 flex items-center justify-center bg-navy-800 hover:bg-primary rounded-lg transition-all duration-300 transform hover:-translate-y-1">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                 className="w-10 h-10 flex items-center justify-center bg-navy-800 hover:bg-primary rounded-lg transition-all duration-300 transform hover:-translate-y-1">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-sm text-navy-300 hover:text-primary transition-colors duration-200 flex items-center group"
                  >
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white">Our Products</h3>
            <ul className="space-y-3">
              {products.map((product) => (
                <li key={product.name}>
                  <Link
                    to={product.path}
                    className="text-sm text-navy-300 hover:text-primary transition-colors duration-200 flex items-center group"
                  >
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {product.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white">Stay Updated</h3>
            <p className="text-sm text-navy-300 mb-6 leading-relaxed">
              Subscribe to our newsletter for updates, financial tips, and exclusive offers.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full px-4 py-3 bg-navy-800 text-white border border-navy-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm placeholder-navy-500 transition-all"
                />
              </div>
              <button
                type="submit"
                disabled={status.type === 'loading'}
                className="w-full bg-primary hover:bg-primary-dark text-white px-4 py-3 rounded-lg transition-all duration-300 disabled:opacity-50 font-semibold shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
              >
                <span>{status.type === 'loading' ? 'Subscribing...' : 'Subscribe'}</span>
                <Send className="w-4 h-4" />
              </button>
              {status.message && status.type !== 'loading' && (
                <p className={`text-xs ${
                  status.type === 'success' ? 'text-green-400' : 
                  status.type === 'error' ? 'text-red-400' : 
                  'text-navy-300'
                }`}>
                  {status.message}
                </p>
              )}
            </form>
          </div>

        </div>

        {/* Contact Info Bar */}
        <div className="border-t border-navy-800 pt-12 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 flex items-center justify-center bg-navy-800 rounded-lg flex-shrink-0">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold mb-1 text-white">Head Office</p>
                <p className="text-navy-300 leading-relaxed">123 Financial Street, Nairobi, Kenya</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 flex items-center justify-center bg-navy-800 rounded-lg flex-shrink-0">
                <Phone className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold mb-1 text-white">Call Us</p>
                <p className="text-navy-300">+254 700 000 000</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 flex items-center justify-center bg-navy-800 rounded-lg flex-shrink-0">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold mb-1 text-white">Email Us</p>
                <p className="text-navy-300">info@greenarrow.co.ke</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-navy-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-navy-400">
            <p>&copy; {currentYear} Green Arrow SACCO. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              {legal.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="hover:text-primary transition-colors duration-200"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;