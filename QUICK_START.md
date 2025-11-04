# 🚀 Quick Start Guide - Green Arrow SACCO

## Get Your MVP Running in 10 Minutes!

### Prerequisites Check
```bash
# Check Node.js version (need v18+)
node --version

# Check MySQL (need v8.0+)
mysql --version

# Check npm
npm --version
```

---

## Step 1: Database Setup (2 minutes)

```bash
# Login to MySQL
mysql -u root -p

# Run these commands in MySQL:
CREATE DATABASE green_arrow_db;
USE green_arrow_db;
source /path/to/Arrow/database/schema.sql;
EXIT;
```

---

## Step 2: Backend Setup (3 minutes)

```bash
# Navigate to server folder
cd Arrow/server

# Install dependencies
npm install

# Create environment file
cat > .env << EOF
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=green_arrow_db
FRONTEND_URL=http://localhost:5173

# Email Configuration (optional for MVP)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
EOF

# Start the server
npm run dev
```

✅ Backend should now be running on http://localhost:5000

---

## Step 3: Frontend Setup (3 minutes)

```bash
# Open a new terminal
# Navigate to client folder
cd Arrow/client

# Install dependencies
npm install

# Create environment file
cat > .env << EOF
VITE_API_URL=http://localhost:5000/api
EOF

# Start the development server
npm run dev
```

✅ Frontend should now be running on http://localhost:5173

---

## Step 4: Verify Everything Works (2 minutes)

### Open http://localhost:5173 in your browser

Check these features:
- ✅ Home page loads with hero section
- ✅ Navigate to Products page - tabs work
- ✅ Navigate to About page - mission/vision visible
- ✅ Navigate to Downloads page - search works
- ✅ Navigate to FAQs page - accordion works
- ✅ Navigate to Contact page - form visible
- ✅ Click chatbot icon (bottom right) - opens chat
- ✅ Footer shows social links and newsletter signup

---

## 🎯 Quick Test Commands

### Test Backend API
```bash
# Test health endpoint
curl http://localhost:5000/api/health

# Expected response:
# {"status":"Server is running"}
```

### Test Database Connection
```bash
mysql -u root -p green_arrow_db -e "SHOW TABLES;"

# Should show: contacts, chat_messages, documents, etc.
```

---

## 🐛 Common Issues & Solutions

### Issue 1: "Cannot connect to database"
**Solution:**
```bash
# Check MySQL is running
sudo systemctl status mysql   # Linux
brew services list             # macOS

# Verify credentials in server/.env
# Make sure DB_PASSWORD matches your MySQL password
```

### Issue 2: "Port 5000 already in use"
**Solution:**
```bash
# Change port in server/.env
PORT=5001

# Update client/.env
VITE_API_URL=http://localhost:5001/api
```

### Issue 3: "Module not found" errors
**Solution:**
```bash
# Delete node_modules and reinstall
cd client
rm -rf node_modules package-lock.json
npm install

cd ../server
rm -rf node_modules package-lock.json
npm install
```

### Issue 4: Chatbot not responding
**Solution:**
- Check browser console for errors
- Verify API_URL in client/.env
- Test backend: curl http://localhost:5000/api/health
- Check server terminal for errors

---

## 📱 Access Points

Once running, access:
- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:5000/api
- **Health Check:** http://localhost:5000/api/health

---

## 🎨 Default Credentials & Data

The MVP doesn't require login yet, but when you add authentication:
- Admin email: admin@greenarrow.co.ke
- Member ID format: GA-XXXX-YYYY

---

## 🚀 Production Deployment Quick Steps

### Frontend (Vercel/Netlify)
```bash
cd client
npm run build
# Upload 'dist' folder to your hosting
```

### Backend (Heroku/Railway)
```bash
cd server
# Set environment variables in platform
# Deploy using platform-specific instructions
```

### Database (DigitalOcean/AWS)
- Create managed MySQL database
- Import schema.sql
- Update connection strings

---

## 📊 What's Included in This MVP

### Pages (All Working)
✅ Home - Hero, features, stats, CTAs  
✅ Products - 6 loans + 4 savings products  
✅ About - Mission, vision, team, timeline  
✅ Downloads - 16 documents with search  
✅ FAQs - 16 Q&As with filtering  
✅ Contact - Form with validation  
✅ Privacy Policy - Complete legal text  
✅ Terms & Conditions - Complete legal text  

### Features (All Functional)
✅ Responsive navigation with mobile menu  
✅ AI Chatbot with 18 response categories  
✅ Newsletter subscription  
✅ Contact form submission  
✅ Document search & filtering  
✅ FAQ search & filtering  
✅ Social media links  
✅ Footer with all info  

---

## 🎯 Next Steps After Launch

1. **Monitor** - Check analytics and user behavior
2. **Gather Feedback** - Use chatbot logs and contact forms
3. **Phase 2** - Add authentication and member portal
4. **Marketing** - Share on social media
5. **Support** - Respond to inquiries promptly

---

## 💡 Pro Tips

1. **Development:** Use two terminals (one for backend, one for frontend)
2. **Testing:** Test on mobile devices using your local IP (e.g., http://192.168.1.100:5173)
3. **Security:** Never commit .env files to git
4. **Performance:** Run `npm run build` to check production bundle size
5. **Documentation:** Keep README.md updated with changes

---

## 📞 Need Help?

- **Documentation:** See README.md for detailed info
- **Enhancement Summary:** See MVP_ENHANCEMENT_SUMMARY.md
- **Issues:** Check browser console and server logs
- **Email:** info@greenarrow.co.ke

---

## ✅ Checklist Before Going Live

- [ ] Test all pages on mobile
- [ ] Test all forms
- [ ] Verify chatbot responses
- [ ] Check all links work
- [ ] Test contact form email delivery
- [ ] Review privacy policy content
- [ ] Review terms & conditions content
- [ ] Update contact information
- [ ] Update company details
- [ ] Set up analytics (Google Analytics)
- [ ] Set up error tracking (Sentry)
- [ ] Create database backup strategy
- [ ] Configure SSL certificate
- [ ] Set up monitoring alerts

---

**You're now ready to launch! 🎉**

*Remember: This is an MVP. Start small, gather feedback, iterate quickly.*

---

Last Updated: November 4, 2025
