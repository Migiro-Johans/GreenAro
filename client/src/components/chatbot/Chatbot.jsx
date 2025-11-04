import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import axios from 'axios';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [userInfo, setUserInfo] = useState({ name: '', email: '', phone: '' });
  const [sessionId] = useState(() => `session_${Date.now()}_${Math.random()}`);
  const [showForm, setShowForm] = useState(true);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          text: 'Hello! Welcome to Green Arrow. Please provide your details to get started.',
          isBot: true,
          timestamp: new Date(),
        },
      ]);
    }
  }, [isOpen]);

  const handleSubmitInfo = (e) => {
    e.preventDefault();
    if (userInfo.name && userInfo.email) {
      setShowForm(false);
      setMessages((prev) => [
        ...prev,
        {
          text: `Thank you, ${userInfo.name}! How can I help you today?`,
          isBot: true,
          timestamp: new Date(),
        },
      ]);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newMessage = {
      text: inputMessage,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputMessage('');

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/chatbot/message`, {
        sessionId,
        name: userInfo.name,
        email: userInfo.email,
        phone: userInfo.phone,
        message: inputMessage,
      });

      const botMessage = {
        text: response.data.response,
        isBot: true,
        timestamp: new Date(),
        requiresHuman: response.data.requiresHuman,
      };

      setMessages((prev) => [...prev, botMessage]);

      if (response.data.requiresHuman) {
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            {
              text: 'A customer service representative has been notified and will contact you shortly via email or phone.',
              isBot: true,
              timestamp: new Date(),
            },
          ]);
        }, 1000);
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages((prev) => [
        ...prev,
        {
          text: 'Sorry, I encountered an error. Please try again.',
          isBot: true,
          timestamp: new Date(),
        },
      ]);
    }
  };

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-primary hover:bg-secondary text-white rounded-full p-4 shadow-lg transition-all z-50"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[500px] bg-white rounded-lg shadow-2xl flex flex-col z-50">
          {/* Header */}
          <div className="bg-primary text-white p-4 rounded-t-lg flex justify-between items-center">
            <h3 className="font-semibold">Green Arrow Support</h3>
            <button onClick={() => setIsOpen(false)} className="hover:bg-secondary rounded p-1">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    msg.isBot
                      ? 'bg-white text-gray-800 border border-gray-200'
                      : 'bg-primary text-white'
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                  {msg.requiresHuman && (
                    <p className="text-xs mt-2 italic">🔔 Escalated to customer service</p>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t">
            {showForm ? (
              <form onSubmit={handleSubmitInfo} className="space-y-2">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={userInfo.name}
                  onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                  required
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  value={userInfo.email}
                  onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                  required
                />
                <input
                  type="tel"
                  placeholder="Phone (optional)"
                  value={userInfo.phone}
                  onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                />
                <button
                  type="submit"
                  className="w-full bg-primary text-white py-2 rounded-lg hover:bg-secondary transition-colors"
                >
                  Start Chat
                </button>
              </form>
            ) : (
              <form onSubmit={handleSendMessage} className="flex space-x-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button
                  type="submit"
                  className="bg-primary text-white p-2 rounded-lg hover:bg-secondary transition-colors"
                >
                  <Send className="w-5 h-5" />
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}