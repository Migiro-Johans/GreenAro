# Green Aro SACCO Backend API - Implementation Guide

## ✅ Completed Components

### 1. Database Schema (`database/enhanced_schema.sql`)
- ✅ Applications table (loans & savings)
- ✅ Leadership team table
- ✅ Downloadable forms table
- ✅ Contact submissions table
- ✅ Chat sessions & messages tables
- ✅ Newsletter subscribers table
- ✅ Admin users table
- ✅ Activity logs table
- ✅ File uploads table

### 2. Middleware Created
- ✅ `middleware/auth.js` - JWT authentication & role-based authorization
- ✅ `middleware/validation.js` - Request validation using express-validator
- ✅ `middleware/upload.js` - File upload handling with Multer
- ✅ `middleware/errorHandler.js` - Centralized error handling

### 3. Utilities Created
- ✅ `utils/logger.js` - File-based logging system
- ✅ `utils/responseHelper.js` - Standardized API responses

### 4. Controllers Created
- ✅ `controllers/applicationsController.js` - Complete CRUD for applications

## 📋 Next Steps - Controllers to Create

### Leadership Controller (`controllers/leadershipController.js`)
```javascript
- addLeader() - POST with image upload
- getAllLeaders() - GET with sorting
- getLeaderById() - GET single leader
- updateLeader() - PUT with optional image update
- deleteLeader() - DELETE with image cleanup
```

### Downloads Controller (`controllers/downloadsController.js`)
```javascript
- uploadForm() - POST form file
- getAllForms() - GET with category filter
- getFormById() - GET single form
- downloadForm() - GET file & increment counter
- deleteForm() - DELETE with file cleanup
```

### Enhanced Contact Controller
```javascript
- submitContact() - POST submission
- getAllContacts() - GET with filters
- getContactById() - GET single contact
- updateContactStatus() - PUT status/notes
- deleteContact() - DELETE submission
```

### Chat Controller
```javascript
- createSession() - POST new chat session
- sendMessage() - POST message to session
- getSessions() - GET all sessions
- getSessionMessages() - GET messages by session
- endSession() - PUT to close session
```

### Newsletter Controller
```javascript
- subscribe() - POST email subscription
- getSubscribers() - GET all subscribers
- unsubscribe() - DELETE subscription
```

## 📋 Routes to Create

### Application Routes (`routes/applicationRoutes.js`)
```javascript
POST   /api/applications/loan          - Submit loan application
POST   /api/applications/saving        - Submit saving application
GET    /api/applications                - Get all (admin)
GET    /api/applications/:id            - Get specific application
PUT    /api/applications/:id/status     - Update status (admin)
DELETE /api/applications/:id            - Delete (admin)
GET    /api/applications/stats          - Get statistics (admin)
```

### Leadership Routes (`routes/leadershipRoutes.js`)
```javascript
POST   /api/leadership                  - Add leader (admin)
GET    /api/leadership                  - Get all leaders
GET    /api/leadership/:id              - Get specific leader
PUT    /api/leadership/:id              - Update leader (admin)
DELETE /api/leadership/:id              - Delete leader (admin)
```

### Downloads Routes (`routes/downloadsRoutes.js`)
```javascript
POST   /api/downloads                   - Upload form (admin)
GET    /api/downloads                   - Get all forms
GET    /api/downloads/:id               - Get form details
GET    /api/downloads/:id/file          - Download file
DELETE /api/downloads/:id               - Delete form (admin)
```

## 🔧 Required Package Installation

Run this command in the server directory:
```bash
npm install express-validator joi bcryptjs jsonwebtoken helmet morgan express-rate-limit uuid
```

## 📝 Environment Variables (.env)

```env
# Server Configuration
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000

# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=green_aro_sacco

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_in_production
JWT_EXPIRATION=7d

# Email Configuration (for nodemailer)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password

# File Upload Limits
MAX_FILE_SIZE=10485760
MAX_IMAGE_SIZE=5242880
```

## 🚀 Enhanced Server Configuration

Update `server.js` to include:
```javascript
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const { errorHandler, notFoundHandler } = require('./middleware/errorHandler');

// Security middleware
app.use(helmet());

// Request logging
app.use(morgan('combined'));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);

// Add all routes here

// Error handling (must be last)
app.use(notFoundHandler);
app.use(errorHandler);
```

## 📊 API Response Format

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error message",
  "errors": [ ... ]
}
```

### Paginated Response
```json
{
  "success": true,
  "message": "Data retrieved",
  "data": [ ... ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "totalPages": 10,
    "hasMore": true
  }
}
```

## 🔒 Authentication Flow

1. Admin users must login to get JWT token
2. Token included in Authorization header: `Bearer <token>`
3. Protected routes validate token and check roles
4. Tokens expire based on JWT_EXPIRATION setting

## 📦 File Upload Structure

```
uploads/
├── leadership/        # Team member photos
├── forms/            # Downloadable application forms
├── applications/     # User-submitted documents
└── temp/             # Temporary uploads
```

## ✅ Testing Checklist

- [ ] Install all npm packages
- [ ] Configure .env file
- [ ] Run enhanced_schema.sql to create database
- [ ] Test all application endpoints
- [ ] Test file upload functionality
- [ ] Test authentication & authorization
- [ ] Test input validation
- [ ] Test error handling
- [ ] Test pagination
- [ ] Test search & filters

## 🎯 Production Deployment Checklist

- [ ] Change JWT_SECRET to strong random string
- [ ] Set NODE_ENV=production
- [ ] Configure proper database credentials
- [ ] Set up SSL/TLS for HTTPS
- [ ] Configure CORS for production domain
- [ ] Set up proper file storage (S3, etc.)
- [ ] Configure email service
- [ ] Set up monitoring & logging
- [ ] Configure backup strategy
- [ ] Set up rate limiting
- [ ] Review security headers

## 📚 Additional Features to Implement

1. **Email Notifications**
   - Application status updates
   - Contact form auto-reply
   - Newsletter welcome email

2. **Admin Dashboard**
   - Statistics overview
   - Recent applications
   - Unread contacts

3. **File Management**
   - Cloud storage integration (AWS S3)
   - Image optimization
   - Automatic backups

4. **Advanced Features**
   - Application PDF export
   - Email templates
   - SMS notifications
   - Document signing

This implementation provides a solid foundation for the Green Aro SACCO backend API with proper security, validation, and scalability.
