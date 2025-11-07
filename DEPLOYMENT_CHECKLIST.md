# cPanel Deployment Quick Checklist

## 🚀 Quick Start Guide for greenaro.ilimat-it.com

### Login Credentials
- **cPanel URL:** https://cpanel.ilimat-it.com/
- **Username:** ilimatit
- **Password:** ilim@t2025#
- **Subdomain:** greenaro.ilimat-it.com

---

## ✅ Deployment Steps

### 1. [ ] Create Subdomain
- Go to cPanel → **Subdomains**
- Subdomain: `greenaro`
- Domain: `ilimat-it.com`
- Document Root: `/home/ilimatit/greenaro.ilimat-it.com`

### 2. [ ] Create MySQL Database
- Go to **MySQL Databases**
- Database name: `ilimatit_greenaro`
- Username: `ilimatit_greenaro_user`
- Password: (generate strong password)
- **Note:** Save credentials for .env file!

### 3. [ ] Import Database
- Go to **phpMyAdmin**
- Select database
- Import: `database/enhanced_schema.sql`

### 4. [ ] Setup Node.js App
- Go to **Setup Node.js App**
- Node.js version: 16.x or higher
- Application mode: Production
- Application root: `/home/ilimatit/greenaro.ilimat-it.com/server`
- Application URL: `greenaro.ilimat-it.com`
- Startup file: `server.js`

### 5. [ ] Upload Backend Files
Upload to `/home/ilimatit/greenaro.ilimat-it.com/server/`:
- [ ] server.js
- [ ] package.json
- [ ] config/ folder
- [ ] controllers/ folder
- [ ] routes/ folder
- [ ] middleware/ folder
- [ ] utils/ folder
- [ ] .htaccess
- [ ] Create uploads/ folder (empty)

### 6. [ ] Create .env File
In `/home/ilimatit/greenaro.ilimat-it.com/server/`:
```env
NODE_ENV=production
PORT=3000
FRONTEND_URL=https://greenaro.ilimat-it.com
DB_HOST=localhost
DB_USER=ilimatit_greenaro_user
DB_PASSWORD=YOUR_DB_PASSWORD_HERE
DB_NAME=ilimatit_greenaro
DB_PORT=3306
JWT_SECRET=CHANGE_THIS_TO_RANDOM_STRING
JWT_EXPIRES_IN=24h
```

### 7. [ ] Install Dependencies
- In **Setup Node.js App** → Click "Run NPM Install"
- OR use Terminal: `cd server && npm install --production`

### 8. [ ] Upload Frontend Files
Upload to `/home/ilimatit/greenaro.ilimat-it.com/public_html/`:
- [ ] All files from `client/dist/` folder
- [ ] .htaccess file

### 9. [ ] Start Application
- Go to **Setup Node.js App**
- Click **"Start App"**
- Verify status shows "Running"

### 10. [ ] Enable SSL
- Go to **SSL/TLS Status**
- Find `greenaro.ilimat-it.com`
- Click **"Run AutoSSL"**

### 11. [ ] Test Deployment
- [ ] Visit: https://greenaro.ilimat-it.com
- [ ] Test API: https://greenaro.ilimat-it.com/api/health
- [ ] Test admin login: https://greenaro.ilimat-it.com/admin/login
- [ ] Login with: username: `admin`, password: `password`

---

## 📦 Files to Upload

### Backend (server folder) - 7 items
```
server/
├── server.js
├── package.json
├── .htaccess
├── config/
├── controllers/
├── routes/
├── middleware/
├── utils/
└── uploads/ (create empty)
```

### Frontend (public_html) - from dist folder
```
public_html/
├── index.html
├── .htaccess
└── assets/
```

---

## 🔧 Post-Deployment

### Create Admin User (if needed)
In phpMyAdmin, run:
```sql
INSERT INTO admin_users (username, email, password_hash, full_name, role, is_active)
VALUES ('admin', 'admin@greenarosacco.com', 
'$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
'System Administrator', 'super_admin', 1);
```

### Set Permissions
```bash
chmod 755 /home/ilimatit/greenaro.ilimat-it.com/server
chmod 777 /home/ilimatit/greenaro.ilimat-it.com/server/uploads
chmod 644 /home/ilimatit/greenaro.ilimat-it.com/server/.env
```

---

## ⚠️ Troubleshooting

### Application won't start?
- Check Node.js app logs in cPanel
- Verify .env has correct database credentials
- Run `npm install` again

### Database connection error?
- Verify database exists
- Check username/password in .env
- Ensure user has ALL PRIVILEGES

### 404 on API calls?
- Check .htaccess in public_html
- Verify ProxyPass rules
- Ensure Node.js app is running

### Frontend loads but API fails?
- Check CORS settings
- Verify API_BASE_URL in config.js
- Check browser console for errors

---

## 📝 Important Notes

1. **Security:**
   - Change JWT_SECRET in .env
   - Use strong database passwords
   - Never commit .env to Git

2. **Performance:**
   - Enable compression in .htaccess
   - Use production build for frontend
   - Set proper cache headers

3. **Monitoring:**
   - Check application logs regularly
   - Monitor database connections
   - Track error logs

---

## 📞 Support

If issues persist:
1. Check `/home/ilimatit/greenaro.ilimat-it.com/server/logs/`
2. Check Node.js App logs in cPanel
3. Check phpMyAdmin for database issues
4. Review browser console for frontend errors

---

**Deployment Prepared:** November 7, 2025  
**Target Domain:** https://greenaro.ilimat-it.com  
**Documentation:** See CPANEL_DEPLOYMENT_GUIDE.md for detailed instructions
