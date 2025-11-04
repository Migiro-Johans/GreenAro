import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Product';
import Contact from './pages/Contact';
import Downloads from './pages/Downloads';
import FAQs from './pages/FAQs';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Chatbot from './components/chatbot/Chatbot';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/product" element={<Products />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/downloads" element={<Downloads />} />
          <Route path="/faqs" element={<FAQs />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
        </Routes>
        <Chatbot />
      </Layout>
    </Router>
  );
}

export default App;