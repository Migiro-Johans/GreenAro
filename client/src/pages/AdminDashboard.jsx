import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Users,
  FileText,
  MessageSquare,
  Mail,
  Download,
  TrendingUp,
  LogOut,
  Settings
} from 'lucide-react';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    applications: { total: 0, pending: 0, approved: 0 },
    contacts: { total: 0, unread: 0 },
    chat: { total: 0, active: 0 },
    newsletter: { total: 0, active: 0 }
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('adminToken');
    const userData = localStorage.getItem('adminUser');

    if (!token || !userData) {
      navigate('/admin/login');
      return;
    }

    setUser(JSON.parse(userData));
    fetchStats(token);
  }, [navigate]);

  const fetchStats = async (token) => {
    try {
      // Fetch application stats
      const appStats = await axios.get('http://localhost:5000/api/applications/stats', {
        headers: { Authorization: `Bearer ${token}` }
      });

      // Fetch contact stats
      const contactStats = await axios.get('http://localhost:5000/api/contact/stats', {
        headers: { Authorization: `Bearer ${token}` }
      });

      // Fetch chat stats
      const chatStats = await axios.get('http://localhost:5000/api/chat/stats', {
        headers: { Authorization: `Bearer ${token}` }
      });

      // Fetch newsletter stats
      const newsletterStats = await axios.get('http://localhost:5000/api/newsletter/stats', {
        headers: { Authorization: `Bearer ${token}` }
      });

      setStats({
        applications: appStats.data.data,
        contacts: contactStats.data.data,
        chat: chatStats.data.data,
        newsletter: newsletterStats.data.data
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    navigate('/admin/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  const statCards = [
    {
      title: 'Applications',
      total: stats.applications.total_applications || 0,
      subtitle: `${stats.applications.pending_count || 0} pending`,
      icon: FileText,
      color: 'bg-blue-500',
      link: '/admin/applications'
    },
    {
      title: 'Contact Submissions',
      total: stats.contacts.total || 0,
      subtitle: `${stats.contacts.unread || 0} unread`,
      icon: MessageSquare,
      color: 'bg-green-500',
      link: '/admin/contacts'
    },
    {
      title: 'Chat Sessions',
      total: stats.chat.total_sessions || 0,
      subtitle: `${stats.chat.active_sessions || 0} active`,
      icon: Users,
      color: 'bg-purple-500',
      link: '/admin/chat'
    },
    {
      title: 'Newsletter Subscribers',
      total: stats.newsletter.active || 0,
      subtitle: `${stats.newsletter.recent_7days || 0} this week`,
      icon: Mail,
      color: 'bg-orange-500',
      link: '/admin/newsletter'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-sm text-gray-600">Welcome back, {user?.full_name || user?.username}</p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                {user?.role}
              </span>
              <button
                onClick={() => navigate('/admin/settings')}
                className="p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100"
              >
                <Settings className="w-5 h-5" />
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((card, index) => (
            <div
              key={index}
              onClick={() => navigate(card.link)}
              className="bg-white rounded-xl shadow-sm p-6 cursor-pointer hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`${card.color} p-3 rounded-lg`}>
                  <card.icon className="w-6 h-6 text-white" />
                </div>
                <TrendingUp className="w-5 h-5 text-green-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{card.total}</h3>
              <p className="text-sm font-medium text-gray-600">{card.title}</p>
              <p className="text-xs text-gray-500 mt-1">{card.subtitle}</p>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button
              onClick={() => navigate('/admin/applications')}
              className="flex flex-col items-center p-4 border-2 border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors"
            >
              <FileText className="w-8 h-8 text-green-600 mb-2" />
              <span className="text-sm font-medium text-gray-700">View Applications</span>
            </button>
            <button
              onClick={() => navigate('/admin/leadership')}
              className="flex flex-col items-center p-4 border-2 border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors"
            >
              <Users className="w-8 h-8 text-green-600 mb-2" />
              <span className="text-sm font-medium text-gray-700">Manage Team</span>
            </button>
            <button
              onClick={() => navigate('/admin/downloads')}
              className="flex flex-col items-center p-4 border-2 border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors"
            >
              <Download className="w-8 h-8 text-green-600 mb-2" />
              <span className="text-sm font-medium text-gray-700">Manage Downloads</span>
            </button>
            <button
              onClick={() => navigate('/admin/contacts')}
              className="flex flex-col items-center p-4 border-2 border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors"
            >
              <MessageSquare className="w-8 h-8 text-green-600 mb-2" />
              <span className="text-sm font-medium text-gray-700">Contact Messages</span>
            </button>
          </div>
        </div>

        {/* Recent Activity Placeholder */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <p className="text-gray-500 text-center py-8">Activity log will be displayed here</p>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
