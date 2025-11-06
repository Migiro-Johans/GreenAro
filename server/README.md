# Green Aro SACCO Backend API

Complete Node.js/Express/MySQL backend API for Green Aro SACCO financial services platform.

## 🚀 Features

- **Authentication & Authorization**: JWT-based authentication with role-based access control
- **Applications Management**: Loan and saving applications with status tracking
- **Leadership Management**: Team member profiles with image uploads
- **Downloads Management**: Downloadable forms with tracking and categories
- **Contact Management**: Contact form submissions with admin workflow
- **Chat System**: Real-time chat sessions with feedback and analytics
- **Newsletter**: Subscription management with CSV export
- **File Uploads**: Secure file handling for images and documents
- **Activity Logging**: Audit trail for admin actions
- **Statistics**: Dashboard endpoints for all modules

## 📋 Prerequisites

- Node.js >= 14.x
- MySQL >= 5.7 or 8.x
- npm or yarn

## 🛠️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/Migiro-Johans/GreenAro.git
cd GreenAro/Arrow/server
```

### 2. Install dependencies

```bash
npm install
```

### 3. Database Setup

```bash
# Login to MySQL
mysql -u root -p

# Create database
CREATE DATABASE green_aro_sacco;

# Use the database
USE green_aro_sacco;

# Run the schema
source ../database/enhanced_schema.sql
```

Or directly from command line:

```bash
mysql -u root -p green_aro_sacco < ../database/enhanced_schema.sql
```

### 4. Environment Configuration

Create a `.env` file in the `server` directory:

```bash
cp .env.example .env
```

Update the `.env` file with your configuration:

```env
# Server Configuration
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:5173

# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=green_aro_sacco
DB_PORT=3306

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here_change_in_production
JWT_EXPIRES_IN=24h

# Email Configuration (for notifications)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_app_password
FROM_EMAIL=greenarosacco@yahoo.com
FROM_NAME=Green Aro SACCO

# File Upload Configuration
MAX_FILE_SIZE=10485760
UPLOAD_DIR=./uploads

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### 5. Create Required Directories

```bash
mkdir -p uploads/leadership uploads/forms uploads/applications uploads/temp logs
```

### 6. Start the Server

**Development mode:**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

Server will run on `http://localhost:5000`

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication

All protected routes require a JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

---

## 🔐 Authentication Endpoints

### POST `/auth/register`
**Access**: Super Admin only  
**Description**: Register a new admin user

**Request Body:**
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "securePassword123",
  "full_name": "John Doe",
  "role": "admin"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Registration successful",
  "data": {
    "id": 1,
    "username": "johndoe",
    "email": "john@example.com",
    "role": "admin"
  }
}
```

### POST `/auth/login`
**Access**: Public  
**Description**: Login admin user

**Request Body:**
```json
{
  "username": "johndoe",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": 1,
      "username": "johndoe",
      "email": "john@example.com",
      "role": "admin"
    }
  }
}
```

### GET `/auth/me`
**Access**: Private  
**Description**: Get current user info

### PUT `/auth/change-password`
**Access**: Private  
**Description**: Change user password

### PUT `/auth/profile`
**Access**: Private  
**Description**: Update user profile

### POST `/auth/logout`
**Access**: Private  
**Description**: Logout user

---

## 📝 Applications Endpoints

### POST `/applications/loan`
**Access**: Public  
**Description**: Submit a loan application

**Request Body:**
```json
{
  "full_name": "Jane Doe",
  "email": "jane@example.com",
  "phone": "+254712345678",
  "id_number": "12345678",
  "loan_type": "personal",
  "loan_amount": 50000,
  "loan_term": 12,
  "employment_status": "employed",
  "monthly_income": 80000,
  "loan_purpose": "Business expansion",
  "application_data": {
    "business_type": "retail",
    "existing_loans": false
  }
}
```

### GET `/applications`
**Access**: Admin  
**Description**: Get all applications with filtering

**Query Parameters:**
- `type`: loan | saving
- `status`: pending | approved | rejected | disbursed
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 20)
- `search`: Search term
- `sort`: Field to sort by
- `order`: asc | desc

### GET `/applications/:id`
**Access**: Admin  
**Description**: Get single application

### PUT `/applications/:id/status`
**Access**: Admin/Manager  
**Description**: Update application status

### DELETE `/applications/:id`
**Access**: Super Admin  
**Description**: Delete application

### GET `/applications/stats`
**Access**: Admin  
**Description**: Get applications statistics

---

## 👥 Leadership Endpoints

### POST `/leadership`
**Access**: Admin  
**Description**: Add new team member with image

**Request**: multipart/form-data
- `name`: string (required)
- `position`: string (required)
- `bio`: text
- `image`: file (JPG, PNG, WEBP, max 5MB)
- `display_order`: number
- `is_active`: boolean

### GET `/leadership`
**Access**: Public  
**Description**: Get all team members

**Query Parameters:**
- `active_only`: true | false (default: true)

### GET `/leadership/:id`
**Access**: Public  
**Description**: Get single team member

### PUT `/leadership/:id`
**Access**: Admin  
**Description**: Update team member

### DELETE `/leadership/:id`
**Access**: Super Admin  
**Description**: Delete team member

---

## 📥 Downloads Endpoints

### POST `/downloads`
**Access**: Admin  
**Description**: Upload a downloadable form

**Request**: multipart/form-data
- `title`: string (required)
- `description`: text
- `file`: document (PDF, DOC, DOCX, max 10MB)
- `category`: loan_application | savings_application | general
- `is_active`: boolean

### GET `/downloads`
**Access**: Public  
**Description**: Get all forms

**Query Parameters:**
- `category`: loan_application | savings_application | general | all
- `active_only`: true | false

### GET `/downloads/:id`
**Access**: Public  
**Description**: Get form details

### GET `/downloads/:id/file`
**Access**: Public  
**Description**: Download form file (increments counter)

### PUT `/downloads/:id`
**Access**: Admin  
**Description**: Update form

### DELETE `/downloads/:id`
**Access**: Admin  
**Description**: Delete form

---

## 📧 Contact Endpoints

### POST `/contact`
**Access**: Public  
**Description**: Submit contact form

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+254712345678",
  "subject": "Inquiry about loans",
  "message": "I would like to know more about your loan products"
}
```

### GET `/contact`
**Access**: Admin  
**Description**: Get all contact submissions

**Query Parameters:**
- `status`: new | in_progress | resolved | closed
- `page`: Page number
- `limit`: Items per page
- `search`: Search term

### GET `/contact/:id`
**Access**: Admin  
**Description**: Get single submission (marks as read)

### PUT `/contact/:id/status`
**Access**: Admin  
**Description**: Update submission status

### DELETE `/contact/:id`
**Access**: Super Admin  
**Description**: Delete submission

### GET `/contact/stats`
**Access**: Admin  
**Description**: Get contact statistics

---

## 💬 Chat Endpoints

### POST `/chat/sessions`
**Access**: Public  
**Description**: Create new chat session

**Request Body:**
```json
{
  "visitor_name": "Jane Doe",
  "visitor_email": "jane@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "session_id": "550e8400-e29b-41d4-a716-446655440000",
    "visitor_name": "Jane Doe",
    "status": "active"
  }
}
```

### POST `/chat/messages`
**Access**: Public  
**Description**: Send a message

**Request Body:**
```json
{
  "session_id": "550e8400-e29b-41d4-a716-446655440000",
  "message": "Hello, I need help with loan application",
  "sender_type": "visitor"
}
```

### GET `/chat/sessions`
**Access**: Admin  
**Description**: Get all chat sessions

### GET `/chat/sessions/:session_id/messages`
**Access**: Public/Admin  
**Description**: Get messages for session

### PUT `/chat/sessions/:session_id/end`
**Access**: Public/Admin  
**Description**: End chat session

### PUT `/chat/sessions/:session_id/feedback`
**Access**: Public  
**Description**: Submit feedback

**Request Body:**
```json
{
  "rating": 5,
  "feedback_comment": "Very helpful service!"
}
```

### GET `/chat/stats`
**Access**: Admin  
**Description**: Get chat statistics

---

## 📰 Newsletter Endpoints

### POST `/newsletter/subscribe`
**Access**: Public  
**Description**: Subscribe to newsletter

**Request Body:**
```json
{
  "email": "subscriber@example.com",
  "name": "Jane Doe"
}
```

### POST `/newsletter/unsubscribe`
**Access**: Public  
**Description**: Unsubscribe from newsletter

**Request Body:**
```json
{
  "email": "subscriber@example.com",
  "token": "optional_unsubscribe_token"
}
```

### GET `/newsletter/subscribers`
**Access**: Admin  
**Description**: Get all subscribers

**Query Parameters:**
- `status`: active | unsubscribed | all
- `page`: Page number
- `limit`: Items per page
- `search`: Search term

### GET `/newsletter/export`
**Access**: Admin  
**Description**: Export subscribers as CSV

### DELETE `/newsletter/subscribers/:id`
**Access**: Super Admin  
**Description**: Delete subscriber

### GET `/newsletter/stats`
**Access**: Admin  
**Description**: Get newsletter statistics

---

## 🔒 User Roles & Permissions

### Super Admin
- Full access to all endpoints
- Can manage admin users
- Can delete any resource

### Admin
- Manage applications (view, update status)
- Manage leadership members
- Manage downloads
- View contact submissions
- View chat sessions
- View newsletter subscribers

### Manager
- View applications
- View contact submissions
- View chat sessions
- Limited admin access

---

## 📊 Database Schema

### Tables

1. **applications** - Loan and saving applications
2. **leadership** - Team member profiles
3. **downloads** - Downloadable forms
4. **contact_submissions** - Contact form submissions
5. **chat_sessions** - Chat conversation sessions
6. **chat_messages** - Individual chat messages
7. **newsletter_subscribers** - Email subscriptions
8. **admin_users** - Admin authentication
9. **activity_logs** - Audit trail
10. **file_uploads** - File management

Full schema in: `database/enhanced_schema.sql`

---

## 🛡️ Security Features

- **Helmet.js**: Security headers
- **JWT Authentication**: Secure token-based auth
- **Password Hashing**: bcrypt with salt rounds
- **Rate Limiting**: DDoS protection
- **CORS**: Configured origin restrictions
- **Input Validation**: express-validator
- **SQL Injection Protection**: Parameterized queries
- **File Upload Validation**: Type and size checks
- **Role-Based Access Control**: Fine-grained permissions

---

## 📝 Logging

- **File Logging**: Daily log files in `logs/` directory
- **HTTP Logging**: Morgan middleware
- **Error Logging**: Comprehensive error tracking
- **Activity Logging**: Admin action audit trail

---

## 🧪 Testing

**Test endpoints with:**
- Postman
- Thunder Client (VS Code extension)
- cURL commands

**Example cURL:**
```bash
# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"password123"}'

# Get applications (with token)
curl -X GET http://localhost:5000/api/applications \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## 🚀 Deployment

### Production Checklist

- [ ] Update `.env` with production values
- [ ] Change `JWT_SECRET` to a strong random string
- [ ] Configure production database credentials
- [ ] Set `NODE_ENV=production`
- [ ] Enable HTTPS/SSL
- [ ] Configure proper CORS origins
- [ ] Set up database backups
- [ ] Configure logging and monitoring
- [ ] Use process manager (PM2)
- [ ] Set up reverse proxy (Nginx)
- [ ] Configure firewall rules
- [ ] Enable rate limiting in production
- [ ] Review file upload security

### Hosting Options

- **Railway**: Easy Node.js + MySQL deployment
- **Render**: Free tier available
- **DigitalOcean**: App Platform or Droplet
- **AWS**: EC2 + RDS
- **Heroku**: With ClearDB MySQL addon
- **PlanetScale**: Serverless MySQL

### PM2 Setup

```bash
npm install -g pm2

# Start server
pm2 start server.js --name green-aro-api

# Enable startup script
pm2 startup
pm2 save

# Monitor
pm2 monit

# Logs
pm2 logs green-aro-api
```

---

## 🔧 Troubleshooting

### Database Connection Issues
```bash
# Check MySQL is running
mysql -u root -p

# Verify database exists
SHOW DATABASES;

# Check user permissions
SHOW GRANTS FOR 'your_user'@'localhost';
```

### Port Already in Use
```bash
# Find process using port 5000
lsof -i :5000

# Kill the process
kill -9 <PID>
```

### File Upload Errors
```bash
# Ensure upload directories exist
mkdir -p uploads/leadership uploads/forms uploads/applications

# Check permissions
chmod 755 uploads
```

---

## 📞 Support

For issues and questions:
- Email: greenarosacco@yahoo.com
- GitHub: [Issues](https://github.com/Migiro-Johans/GreenAro/issues)

---

## 📄 License

This project is proprietary software for Green Aro SACCO.

---

## 👨‍💻 Developer

Built by [Yohans Migiro](https://github.com/Migiro-Johans)

---

## 📅 Version History

### v2.0.0 (Current)
- Complete backend API implementation
- JWT authentication system
- All CRUD operations for major features
- File upload management
- Statistics and analytics
- Activity logging
- Enhanced security

### v1.0.0
- Initial basic server setup
- Contact form
- Newsletter subscription
- Basic chatbot

---

## 🎯 Future Enhancements

- [ ] Real-time notifications (WebSockets)
- [ ] Email templates for automated emails
- [ ] SMS integration for notifications
- [ ] Document e-signing integration
- [ ] Payment gateway integration (M-Pesa)
- [ ] Advanced analytics dashboard
- [ ] Multi-language support
- [ ] Two-factor authentication
- [ ] API rate limiting per user
- [ ] Automated backup system
