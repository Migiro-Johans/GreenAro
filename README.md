# Green Arrow SACCO - Financial Services Platform

![Green Arrow Logo](https://via.placeholder.com/150x150?text=GA)

## 🌟 Overview

Green Arrow SACCO is a comprehensive financial services platform designed for Savings and Credit Cooperative Organizations (SACCOs). This web application provides members with easy access to loan products, savings accounts, financial information, and customer support through an intuitive interface.

**Version:** 1.0.0 (MVP)  
**Last Updated:** November 2025

## 🚀 Features

### Core Features
- ✅ **Modern Responsive Design** - Mobile-first design with Tailwind CSS
- ✅ **Comprehensive Product Catalog** - Detailed loan and savings product information
- ✅ **Member Portal** - Easy access to forms and documents
- ✅ **AI-Powered Chatbot** - Intelligent customer support assistant
- ✅ **Contact Management** - Efficient inquiry handling system
- ✅ **Newsletter Subscription** - Stay updated with SACCO news
- ✅ **Document Management** - Download forms and policy documents
- ✅ **FAQ System** - Comprehensive frequently asked questions
- ✅ **Privacy & Terms Pages** - Legal compliance documentation

### Product Offerings
**Loan Products:**
- Personal Loans (up to KES 500,000)
- Business Loans (up to KES 2,000,000)
- Home Improvement Loans
- Education Loans
- Emergency Loans
- Asset Financing

**Savings Products:**
- Regular Savings Account (up to 10% p.a.)
- Fixed Deposit Account (up to 12% p.a.)
- Locked Savings (up to 11% p.a.)
- Junior Savings Account (up to 9% p.a.)

## 🛠 Tech Stack

### Frontend
- **React** 19.1.1 - Modern UI library
- **React Router DOM** 7.9.5 - Client-side routing
- **Vite** 7.1.7 - Fast build tool and dev server
- **Tailwind CSS** 4.1.16 - Utility-first CSS framework
- **Lucide React** - Beautiful icon library
- **Axios** - HTTP client for API calls

### Backend
- **Node.js** with Express 5.1.0 - Server framework
- **MySQL2** 3.15.3 - Database connectivity
- **Nodemailer** 7.0.10 - Email service
- **Multer** 2.0.2 - File upload handling
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

## 📁 Project Structure

```
Arrow/
├── client/                    # Frontend React application
│   ├── public/               # Static assets
│   ├── src/
│   │   ├── assets/          # Images, fonts, etc.
│   │   ├── components/      # Reusable components
│   │   │   ├── chatbot/    # AI chatbot component
│   │   │   ├── common/     # Shared components (Loader, etc.)
│   │   │   └── layout/     # Layout components (Navbar, Footer, etc.)
│   │   ├── pages/          # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Product.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── Downloads.jsx
│   │   │   ├── FAQs.jsx
│   │   │   ├── Privacy.jsx
│   │   │   └── Terms.jsx
│   │   ├── App.jsx         # Main app component
│   │   └── main.jsx        # Entry point
│   ├── .env                # Environment variables
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
│
├── server/                   # Backend Node.js application
│   ├── config/
│   │   └── database.js      # Database configuration
│   ├── controllers/         # Route controllers
│   │   ├── chatbotcontroller.js
│   │   └── contactController.js
│   ├── routes/             # API routes
│   │   ├── chatbotRoutes.js
│   │   ├── contactRoutes.js
│   │   ├── downloadRoutes.js
│   │   ├── newsletterRoutes.js
│   │   └── uploadRoutes.js
│   ├── utils/              # Utility functions
│   │   ├── chatbotLogic.js
│   │   └── emailService.js
│   ├── .env                # Server environment variables
│   ├── server.js           # Server entry point
│   └── package.json
│
└── database/                # Database scripts
    ├── schema.sql          # Database schema
    └── seed.sql            # Sample data
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MySQL (v8.0 or higher)
- npm or yarn package manager

### Installation

#### 1. Clone the Repository
```bash
git clone <repository-url>
cd Arrow
```

#### 2. Database Setup
```bash
# Login to MySQL
mysql -u root -p

# Create database and tables
source database/schema.sql

# (Optional) Add sample data
source database/seed.sql
```

#### 3. Backend Setup
```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your configuration
nano .env
```

**Server Environment Variables (.env):**
```env
PORT=5000
DB_HOST=localhost
DB_USER=your_mysql_user
DB_PASSWORD=your_mysql_password
DB_NAME=green_arrow_db
FRONTEND_URL=http://localhost:5173

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

#### 4. Frontend Setup
```bash
# Navigate to client directory
cd ../client

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with API URL
nano .env
```

**Client Environment Variables (.env):**
```env
VITE_API_URL=http://localhost:5000/api
```

#### 5. Run the Application

**Terminal 1 - Start Backend Server:**
```bash
cd server
npm run dev
# Server runs on http://localhost:5000
```

**Terminal 2 - Start Frontend:**
```bash
cd client
npm run dev
# Application runs on http://localhost:5173
```

## 📝 API Endpoints

### Contact
- `POST /api/contact/submit` - Submit contact form

### Chatbot
- `POST /api/chatbot/message` - Send message to chatbot

### Newsletter
- `POST /api/newsletter/subscribe` - Subscribe to newsletter

### Downloads
- `GET /api/downloads` - Get available documents
- `GET /api/downloads/:id` - Download specific document

### Upload
- `POST /api/upload` - Upload documents

## 🎨 Color Scheme

```css
Primary: #22c55e (Green)
Secondary: #16a34a (Dark Green)
Accent: #15803d (Forest Green)
Background: #ffffff (White)
Text: #111827 (Gray-900)
```

## 📱 Pages Overview

### 1. Home Page
- Hero section with CTA buttons
- Statistics showcase
- Feature highlights
- Call-to-action sections

### 2. Products Page
- Tabbed interface (Loans/Savings)
- Detailed product cards
- Interactive features
- Application CTAs

### 3. About Page
- Company mission & vision
- Core values
- Journey timeline
- Leadership team

### 4. Downloads Page
- Searchable document library
- Category filtering
- Document preview
- Download management

### 5. FAQs Page
- Searchable FAQ system
- Category organization
- Expandable answers
- Related resources

### 6. Contact Page
- Contact form
- Office information
- Map integration placeholder
- Response handling

## 🤖 Chatbot Features

The intelligent chatbot can help with:
- Loan product information
- Savings account details
- Membership requirements
- Office hours and locations
- Application processes
- Interest rates and terms
- General inquiries

## 🔒 Security Features

- Environment variable protection
- SQL injection prevention
- CORS configuration
- Input validation
- Secure file uploads
- Email verification
- Password hashing ready

## 📊 Database Schema

Key tables:
- `contacts` - Contact form submissions
- `chat_messages` - Chatbot conversation history
- `customer_service_alerts` - Escalation tracking
- `newsletter_subscriptions` - Email subscribers
- `documents` - Downloadable files
- `user_documents` - User uploads

## 🚀 Deployment

### Frontend Deployment (Vercel/Netlify)
```bash
cd client
npm run build
# Deploy dist/ folder
```

### Backend Deployment (Heroku/Railway)
```bash
cd server
# Set environment variables in platform
# Deploy according to platform instructions
```

### Database Deployment
- Use managed MySQL service (AWS RDS, DigitalOcean)
- Import schema.sql
- Update connection strings in .env

## 🧪 Testing

```bash
# Run frontend tests
cd client
npm run test

# Run backend tests
cd server
npm run test
```

## 📈 Future Enhancements

- [ ] Member login/authentication system
- [ ] Online loan application submission
- [ ] Real-time account balance checking
- [ ] Mobile money integration (MPESA)
- [ ] SMS notifications
- [ ] Mobile app (React Native)
- [ ] Admin dashboard
- [ ] Payment gateway integration
- [ ] Automated loan approval workflow
- [ ] Document verification system

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is proprietary software. All rights reserved by Green Arrow SACCO.

## 👥 Team

- **Development Team** - Full-stack development
- **UI/UX Design** - Interface design
- **Project Management** - Coordination
- **Quality Assurance** - Testing

## 📞 Support

For technical support or inquiries:
- **Email:** info@greenarrow.co.ke
- **Phone:** +254 700 000 000
- **Website:** www.greenarrow.co.ke

## 🙏 Acknowledgments

- React team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Lucide for beautiful icons
- All contributors and testers

---

**Built with ❤️ by the Green Arrow Development Team**

*Empowering Financial Freedom Since 2010*
