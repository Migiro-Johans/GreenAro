-- Enhanced Database Schema for Green Aro SACCO (cPanel Version)
-- Date: November 7, 2025
-- Note: Database must be created via cPanel MySQL Databases interface first
-- This file only contains table creation commands

-- Use the database created via cPanel (e.g., ilimatit_greenaro)
-- The USE statement will be handled by phpMyAdmin when you select the database

-- ========================================
-- 1. APPLICATIONS TABLE (Loans & Savings)
-- ========================================
CREATE TABLE IF NOT EXISTS applications (
    id INT PRIMARY KEY AUTO_INCREMENT,
    type ENUM('loan', 'saving') NOT NULL,
    product_name VARCHAR(100),
    customer_name VARCHAR(255) NOT NULL,
    customer_email VARCHAR(255) NOT NULL,
    customer_phone VARCHAR(20) NOT NULL,
    amount DECIMAL(15, 2) NOT NULL,
    duration INT COMMENT 'Duration in months',
    purpose TEXT,
    employment_status VARCHAR(100),
    monthly_income DECIMAL(15, 2),
    address TEXT,
    city VARCHAR(100),
    status ENUM('pending', 'approved', 'rejected', 'processing') DEFAULT 'pending',
    admin_notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_status (status),
    INDEX idx_type (type),
    INDEX idx_created_at (created_at)
);

-- ========================================
-- 2. LEADERSHIP/TEAM TABLE
-- ========================================
CREATE TABLE IF NOT EXISTS leadership (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    position VARCHAR(100) NOT NULL,
    department VARCHAR(100),
    bio TEXT,
    image_url VARCHAR(500),
    email VARCHAR(255),
    phone VARCHAR(20),
    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_display_order (display_order),
    INDEX idx_is_active (is_active)
);

-- ========================================
-- 3. DOWNLOADS TABLE (Forms & Documents)
-- ========================================
CREATE TABLE IF NOT EXISTS downloads (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100),
    file_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    file_size INT COMMENT 'Size in bytes',
    file_type VARCHAR(50),
    download_count INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    uploaded_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_category (category),
    INDEX idx_is_active (is_active)
);

-- ========================================
-- 4. CONTACT SUBMISSIONS TABLE
-- ========================================
CREATE TABLE IF NOT EXISTS contact_submissions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    subject VARCHAR(255),
    message TEXT NOT NULL,
    status ENUM('new', 'in_progress', 'resolved', 'closed') DEFAULT 'new',
    is_read BOOLEAN DEFAULT FALSE,
    admin_notes TEXT,
    assigned_to INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_status (status),
    INDEX idx_is_read (is_read),
    INDEX idx_created_at (created_at)
);

-- ========================================
-- 5. CHAT SESSIONS TABLE
-- ========================================
CREATE TABLE IF NOT EXISTS chat_sessions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    session_id VARCHAR(255) UNIQUE NOT NULL,
    user_name VARCHAR(255),
    user_email VARCHAR(255),
    status ENUM('active', 'closed', 'archived') DEFAULT 'active',
    feedback_rating INT CHECK (feedback_rating >= 1 AND feedback_rating <= 5),
    feedback_comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    closed_at TIMESTAMP NULL,
    INDEX idx_session_id (session_id),
    INDEX idx_status (status),
    INDEX idx_created_at (created_at)
);

-- ========================================
-- 6. CHAT MESSAGES TABLE
-- ========================================
CREATE TABLE IF NOT EXISTS chat_messages (
    id INT PRIMARY KEY AUTO_INCREMENT,
    session_id VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    sender_type ENUM('user', 'bot', 'admin') NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (session_id) REFERENCES chat_sessions(session_id) ON DELETE CASCADE,
    INDEX idx_session_id (session_id),
    INDEX idx_sender_type (sender_type),
    INDEX idx_created_at (created_at)
);

-- ========================================
-- 7. NEWSLETTER SUBSCRIBERS TABLE
-- ========================================
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255),
    status ENUM('active', 'unsubscribed', 'bounced') DEFAULT 'active',
    subscription_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    unsubscribe_date TIMESTAMP NULL,
    unsubscribe_token VARCHAR(255) UNIQUE,
    source VARCHAR(100) COMMENT 'Where they subscribed from',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_status (status),
    INDEX idx_subscription_date (subscription_date)
);

-- ========================================
-- 8. ADMIN USERS TABLE
-- ========================================
CREATE TABLE IF NOT EXISTS admin_users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255),
    role ENUM('super_admin', 'admin', 'manager', 'staff') DEFAULT 'staff',
    is_active BOOLEAN DEFAULT TRUE,
    failed_login_attempts INT DEFAULT 0,
    last_failed_login TIMESTAMP NULL,
    last_login TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_username (username),
    INDEX idx_email (email),
    INDEX idx_role (role),
    INDEX idx_is_active (is_active)
);

-- ========================================
-- 9. ACTIVITY LOGS TABLE
-- ========================================
CREATE TABLE IF NOT EXISTS activity_logs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    action VARCHAR(100) NOT NULL,
    entity_type VARCHAR(50),
    entity_id INT,
    description TEXT,
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES admin_users(id) ON DELETE SET NULL,
    INDEX idx_user_id (user_id),
    INDEX idx_action (action),
    INDEX idx_entity_type (entity_type),
    INDEX idx_created_at (created_at)
);

-- ========================================
-- 10. FILE UPLOADS TABLE
-- ========================================
CREATE TABLE IF NOT EXISTS file_uploads (
    id INT PRIMARY KEY AUTO_INCREMENT,
    original_name VARCHAR(255) NOT NULL,
    stored_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    file_size INT,
    mime_type VARCHAR(100),
    entity_type VARCHAR(50) COMMENT 'What this file belongs to',
    entity_id INT COMMENT 'ID of the related entity',
    uploaded_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (uploaded_by) REFERENCES admin_users(id) ON DELETE SET NULL,
    INDEX idx_entity (entity_type, entity_id),
    INDEX idx_uploaded_by (uploaded_by)
);

-- ========================================
-- INSERT SAMPLE ADMIN USER
-- ========================================
-- Default password is 'password' (hashed with bcrypt)
INSERT INTO admin_users (username, email, password_hash, full_name, role, is_active) 
VALUES (
    'admin',
    'admin@greenarosacco.com',
    '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
    'System Administrator',
    'super_admin',
    1
) ON DUPLICATE KEY UPDATE username=username;

-- ========================================
-- VIEWS FOR EASY REPORTING
-- ========================================

-- View for pending applications summary
CREATE OR REPLACE VIEW pending_applications_summary AS
SELECT 
    type,
    COUNT(*) as count,
    SUM(amount) as total_amount,
    AVG(amount) as avg_amount
FROM applications
WHERE status = 'pending'
GROUP BY type;

-- View for active chat sessions
CREATE OR REPLACE VIEW active_chat_sessions AS
SELECT 
    cs.session_id,
    cs.user_name,
    cs.user_email,
    COUNT(cm.id) as message_count,
    MAX(cm.created_at) as last_message_at
FROM chat_sessions cs
LEFT JOIN chat_messages cm ON cs.session_id = cm.session_id
WHERE cs.status = 'active'
GROUP BY cs.session_id, cs.user_name, cs.user_email;

-- View for newsletter statistics
CREATE OR REPLACE VIEW newsletter_stats AS
SELECT 
    status,
    COUNT(*) as count,
    DATE(subscription_date) as date
FROM newsletter_subscribers
GROUP BY status, DATE(subscription_date);

-- ========================================
-- END OF SCHEMA
-- ========================================
