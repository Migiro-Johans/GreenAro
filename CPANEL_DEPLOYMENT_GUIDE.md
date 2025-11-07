# Green Aro SACCO - cPanel Deployment Guide

## Prerequisites
- cPanel access: https://cpanel.ilimat-it.com/
- Username: ilimatit
- Password: ilim@t2025#
- Subdomain: greenaro.ilimat-it.com

## Step-by-Step Deployment Process

### 1. Login to cPanel
1. Go to https://cpanel.ilimat-it.com/
2. Login with username: `ilimatit` and password: `ilim@t2025#`

### 2. Create Subdomain
1. In cPanel, search for **"Domains"** or **"Subdomains"**
2. Click on **"Subdomains"**
3. Create subdomain:
   - Subdomain: `greenaro`
   - Domain: `ilimat-it.com`
   - Document Root: `/home/ilimatit/greenaro.ilimat-it.com`
4. Click **"Create"**

### 3. Setup MySQL Database
1. Go to **"MySQL Databases"** in cPanel
2. Create a new database:
   - Database Name: `ilimatit_greenaro` (or similar)
   - Click **"Create Database"**
3. Create database user:
   - Username: `ilimatit_greenaro_user`
   - Password: (generate a strong password)
   - Click **"Create User"**
4. Add user to database:
   - Select the user and database
   - Grant **ALL PRIVILEGES**
   - Click **"Add"**
5. **Important:** Note down these credentials for later!

### 4. Import Database Schema
1. Go to **"phpMyAdmin"** in cPanel
2. Select your database (e.g., `ilimatit_greenaro`)
3. Click **"Import"** tab
4. Upload `database/enhanced_schema.sql` from your project
5. Click **"Go"** to import

### 5. Setup Node.js Application
1. In cPanel, search for **"Setup Node.js App"**
2. Click **"Create Application"**
3. Configure:
   - **Node.js version:** Select latest stable (16.x or higher)
   - **Application mode:** Production
   - **Application root:** `/home/ilimatit/greenaro.ilimat-it.com/server`
   - **Application URL:** `greenaro.ilimat-it.com`
   - **Application startup file:** `server.js`
   - **Passenger log file:** (leave default)
4. Click **"Create"**

### 6. Upload Files via File Manager or FTP

#### Option A: Using cPanel File Manager
1. Go to **"File Manager"** in cPanel
2. Navigate to `/home/ilimatit/greenaro.ilimat-it.com/`
3. Create two folders:
   - `server` (for backend)
   - `public_html` (for frontend - may already exist)

#### Upload Backend (server folder):
1. Go to `/home/ilimatit/greenaro.ilimat-it.com/server/`
2. Upload these files/folders from your local `Arrow/server/`:
   - `server.js`
   - `package.json`
   - `config/` folder
   - `controllers/` folder
   - `routes/` folder
   - `middleware/` folder
   - `utils/` folder
   - `.htaccess` (the one we just created)
   - Create `uploads/` folder (empty)

3. Create `.env` file in server folder:
   - Click **"+ File"** → name it `.env`
   - Right-click → Edit
   - Copy content from `.env.production` we created
   - **UPDATE** with your actual database credentials
   - Save

#### Upload Frontend (public_html):
1. Go to `/home/ilimatit/greenaro.ilimat-it.com/public_html/`
2. Upload all files from `Arrow/client/dist/` folder:
   - `index.html`
   - `assets/` folder
   - Any other files in the dist folder

### 7. Install Node.js Dependencies
1. In cPanel, go to **"Setup Node.js App"**
2. Find your application and click **"Edit"**
3. In the **"Detected configuration files"** section, click **"Run NPM Install"**
4. Wait for installation to complete

Alternatively, use **Terminal** in cPanel:
```bash
cd /home/ilimatit/greenaro.ilimat-it.com/server
npm install --production
```

### 8. Configure Environment Variables
1. In **"Setup Node.js App"**, click your app
2. Scroll to **"Environment variables"**
3. Add these variables:
   - `NODE_ENV` = `production`
   - `PORT` = `3000`
   - `FRONTEND_URL` = `https://greenaro.ilimat-it.com`
   - `DB_HOST` = `localhost`
   - `DB_USER` = `your_db_user`
   - `DB_PASSWORD` = `your_db_password`
   - `DB_NAME` = `your_db_name`
   - `JWT_SECRET` = `your_secure_random_string`

### 9. Update Frontend API URL
Before building, update the API base URL in your frontend:

1. Create/edit `Arrow/client/src/config.js`:
```javascript
export const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://greenaro.ilimat-it.com/api'
  : 'http://localhost:5000';
```

2. Update API calls in your components to use this config
3. Rebuild: `npm run build`
4. Re-upload the `dist/` folder contents

### 10. Setup .htaccess for React Router (in public_html)
Create `.htaccess` in `/home/ilimatit/greenaro.ilimat-it.com/public_html/`:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  
  # API requests go to Node.js backend
  RewriteRule ^api/(.*)$ http://localhost:3000/api/$1 [P,L]
  
  # React Router - redirect all requests to index.html
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

### 11. Start/Restart the Application
1. Go to **"Setup Node.js App"**
2. Click **"Stop App"** (if running)
3. Click **"Start App"**
4. Check status - should show "Running"

### 12. Test Your Deployment
1. Visit: https://greenaro.ilimat-it.com
2. Test admin login: https://greenaro.ilimat-it.com/admin/login
3. Check browser console for any errors
4. Test API endpoints

### 13. Troubleshooting

#### Check Application Logs:
1. Go to **"Setup Node.js App"**
2. Click your app
3. Scroll to **"Application logs"**
4. Check for errors

#### Common Issues:

**Database connection failed:**
- Verify database credentials in `.env`
- Check if database exists
- Ensure user has proper privileges

**404 errors on API:**
- Check `.htaccess` in public_html
- Verify ProxyPass rules
- Check Node.js app is running

**Module not found errors:**
- Run `npm install` again in server folder
- Check all dependencies are in `package.json`

**Permission errors:**
- Set proper permissions: `chmod 755` for folders, `chmod 644` for files
- Check uploads folder is writable: `chmod 777 uploads/`

### 14. SSL Certificate (HTTPS)
1. In cPanel, go to **"SSL/TLS Status"**
2. Find `greenaro.ilimat-it.com`
3. Click **"Run AutoSSL"** to get free Let's Encrypt certificate
4. Wait for certificate to be issued

### 15. Post-Deployment Checklist
- [ ] Database imported successfully
- [ ] Admin user created (run SQL in phpMyAdmin if needed)
- [ ] Node.js app shows "Running" status
- [ ] Frontend loads at https://greenaro.ilimat-it.com
- [ ] API endpoints respond correctly
- [ ] Admin login works
- [ ] File uploads work (check permissions)
- [ ] SSL certificate installed
- [ ] Email functionality configured

## Quick Command Reference (if using SSH/Terminal)

```bash
# Navigate to server
cd /home/ilimatit/greenaro.ilimat-it.com/server

# Install dependencies
npm install --production

# Check Node.js version
node --version

# Test server locally
node server.js

# View logs
tail -f logs/error.log
tail -f logs/combined.log

# Restart application (if using PM2)
pm2 restart server
pm2 logs
```

## Important Security Notes
1. Never commit `.env` file to Git
2. Use strong database passwords
3. Change JWT_SECRET to a random secure string
4. Enable HTTPS/SSL
5. Keep Node.js and dependencies updated
6. Set proper file permissions

## Support
If you encounter issues:
1. Check cPanel error logs
2. Check Node.js application logs
3. Check browser console for frontend errors
4. Verify database connection in phpMyAdmin

---

**Deployment Date:** November 7, 2025
**Domain:** https://greenaro.ilimat-it.com
**Backend Port:** 3000 (internal)
**Database:** MySQL via cPanel
