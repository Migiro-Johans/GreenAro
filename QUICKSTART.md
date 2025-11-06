# Green Aro SACCO - Quick Start Guide

## 🎯 Get Running in 5 Minutes

### Prerequisites
- Node.js 14+ installed
- MySQL 5.7+ installed and running
- Git installed

---

## 📦 Quick Setup

### 1. Clone and Install (2 minutes)

```bash
# Clone the repository
git clone https://github.com/Migiro-Johans/GreenAro.git
cd GreenAro/Arrow

# Install frontend dependencies
cd client
npm install

# Install backend dependencies
cd ../server
npm install
# OR use the automated setup script:
./setup.sh
```

---

### 2. Database Setup (1 minute)

```bash
# Login to MySQL
mysql -u root -p

# Run these commands in MySQL:
CREATE DATABASE green_aro_sacco;
USE green_aro_sacco;
source database/enhanced_schema.sql;
exit;

# Or run directly:
mysql -u root -p green_aro_sacco < database/enhanced_schema.sql
```

---

### 3. Configure Backend (1 minute)

```bash
cd server

# Copy environment template
cp .env.example .env

# Edit .env file and update these values:
# DB_PASSWORD=your_mysql_password
# JWT_SECRET=your_random_secret_key_here
# FRONTEND_URL=http://localhost:5173
```

**Minimum required in `.env`:**
```env
DB_PASSWORD=your_mysql_root_password
JWT_SECRET=change_this_to_a_random_string
```

---

### 4. Start Servers (1 minute)

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
# Server runs on http://localhost:5000
```

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
# Frontend runs on http://localhost:5173
```

---

## ✅ Verify Everything Works

### Test Backend API
```bash
curl http://localhost:5000/health
# Should return: {"status":"Server is running"}
```

### Test Frontend
Open browser: `http://localhost:5173`
- You should see the Green Aro SACCO homepage

---

## 🔐 Create First Admin User

### Option 1: Direct Database Insert
```bash
mysql -u root -p green_aro_sacco

INSERT INTO admin_users (username, email, password_hash, full_name, role, is_active) 
VALUES (
  'admin', 
  'admin@greenarosacco.com', 
  '$2a$10$YourBcryptHashHere',  -- Use bcrypt to hash 'admin123'
  'System Administrator', 
  'super_admin', 
  1
);
```

### Option 2: Create via API (after first admin exists)
```bash
# Login first
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'

# Use the token from response to create new admin
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "username":"newadmin",
    "email":"new@example.com",
    "password":"password123",
    "role":"admin"
  }'
```

---

## 🧪 Test Key Features

### 1. Submit Loan Application (Public)
```bash
curl -X POST http://localhost:5000/api/applications/loan \
  -H "Content-Type: application/json" \
  -d '{
    "full_name": "John Doe",
    "email": "john@example.com",
    "phone": "+254712345678",
    "id_number": "12345678",
    "loan_type": "personal",
    "loan_amount": 50000,
    "loan_term": 12,
    "employment_status": "employed",
    "monthly_income": 80000,
    "loan_purpose": "Business"
  }'
```

### 2. Subscribe to Newsletter (Public)
```bash
curl -X POST http://localhost:5000/api/newsletter/subscribe \
  -H "Content-Type: application/json" \
  -d '{"email":"subscriber@example.com","name":"Jane Doe"}'
```

### 3. Submit Contact Form (Public)
```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name":"John Doe",
    "email":"john@example.com",
    "phone":"+254712345678",
    "subject":"Inquiry",
    "message":"I would like to know more about your services"
  }'
```

### 4. Create Chat Session (Public)
```bash
curl -X POST http://localhost:5000/api/chat/sessions \
  -H "Content-Type: application/json" \
  -d '{"visitor_name":"John Doe","visitor_email":"john@example.com"}'
```

---

## 📊 Access Admin Features

1. **Login** to get JWT token
2. **Use token** in Authorization header for admin endpoints

```bash
# Get all applications
curl http://localhost:5000/api/applications \
  -H "Authorization: Bearer YOUR_TOKEN"

# Get statistics
curl http://localhost:5000/api/applications/stats \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## 🚨 Common Issues & Fixes

### Backend won't start
```bash
# Check if MySQL is running
mysql -u root -p

# Check if port 5000 is available
lsof -i :5000
# If in use, kill the process or change PORT in .env

# Check if dependencies are installed
npm install
```

### Frontend won't start
```bash
# Check if port 5173 is available
lsof -i :5173

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Database connection error
```bash
# Verify MySQL credentials in .env
# DB_HOST=localhost
# DB_USER=root
# DB_PASSWORD=your_password
# DB_NAME=green_aro_sacco

# Test MySQL connection
mysql -u root -p -e "USE green_aro_sacco; SHOW TABLES;"
```

### File upload not working
```bash
# Ensure upload directories exist
cd server
mkdir -p uploads/leadership uploads/forms uploads/applications uploads/temp

# Check permissions
chmod 755 uploads
```

---

## 📚 Next Steps

### For Development
1. Read `server/README.md` for complete API documentation
2. Check `server/BACKEND_IMPLEMENTATION_GUIDE.md` for architecture
3. Review `BACKEND_SUMMARY.md` for implementation details

### For Production
1. Update `.env` with production values
2. Set strong `JWT_SECRET`
3. Configure production database
4. Deploy using hosting platform (Railway, Render, etc.)
5. Set up SSL/HTTPS
6. Configure domain name
7. Enable monitoring and backups

---

## 🔗 Important URLs

| Service | URL |
|---------|-----|
| Frontend | http://localhost:5173 |
| Backend API | http://localhost:5000 |
| Health Check | http://localhost:5000/health |
| API Base | http://localhost:5000/api |

---

## 📞 Need Help?

- **Email**: greenarosacco@yahoo.com
- **Documentation**: See `server/README.md`
- **Issues**: GitHub Issues

---

## 🎉 You're Ready!

Your Green Aro SACCO application is now running. Start testing the features or begin development!

**Happy coding! 🚀**
