const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const rateLimit = require('express-rate-limit');
const Contact = require('../models/Contact');
const { logAdminAction } = require('../utils/adminLogger');

// Rate limiter for login attempts - max 5 attempts per 15 minutes
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limit each IP to 5 requests per windowMs
    message: {
        success: false,
        msg: 'Too many login attempts. Please try again after 15 minutes.'
    },
    standardHeaders: true,
    legacyHeaders: false,
    // Skip successful requests from counting
    skipSuccessfulRequests: true
});

// Middleware to verify admin token
const verifyAdminToken = (req, res, next) => {
    const token = req.header('x-auth-token');

    if (!token) {
        logAdminAction('UNAUTHORIZED_ACCESS_ATTEMPT', {
            ip: req.ip,
            endpoint: req.originalUrl
        });
        return res.status(401).json({
            success: false,
            msg: 'Access denied. Authentication required.'
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.admin = decoded.admin;
        next();
    } catch (err) {
        logAdminAction('INVALID_TOKEN_ATTEMPT', {
            ip: req.ip,
            error: err.message
        });
        res.status(401).json({
            success: false,
            msg: 'Invalid or expired token.'
        });
    }
};

// @route   POST api/admin/login
// @desc    Admin login with password
// @access  Public (with rate limiting)
router.post('/login', loginLimiter, async (req, res) => {
    const { password } = req.body;

    // Input validation
    if (!password || typeof password !== 'string') {
        logAdminAction('LOGIN_FAILED_INVALID_INPUT', {
            ip: req.ip,
            reason: 'Missing or invalid password'
        });
        return res.status(400).json({
            success: false,
            msg: 'Invalid credentials.'
        });
    }

    // Sanitize input - prevent injection
    if (password.length > 100) {
        logAdminAction('LOGIN_FAILED_SUSPICIOUS_INPUT', {
            ip: req.ip,
            passwordLength: password.length
        });
        return res.status(400).json({
            success: false,
            msg: 'Invalid credentials.'
        });
    }

    try {
        // Get hashed password from environment
        const hashedPassword = process.env.ADMIN_PASSWORD_HASH;

        if (!hashedPassword) {
            console.error('❌ ADMIN_PASSWORD_HASH not configured!');
            logAdminAction('LOGIN_FAILED_CONFIG_ERROR', {
                ip: req.ip,
                reason: 'Missing password hash configuration'
            });
            return res.status(500).json({
                success: false,
                msg: 'Server configuration error. Please contact administrator.'
            });
        }

        // Compare password with hash
        const isMatch = await bcrypt.compare(password, hashedPassword);

        if (!isMatch) {
            logAdminAction('LOGIN_FAILED_WRONG_PASSWORD', {
                ip: req.ip,
                timestamp: new Date().toISOString()
            });
            return res.status(401).json({
                success: false,
                msg: 'Invalid credentials.'
            });
        }

        // Create JWT token with 2-hour expiration
        const payload = {
            admin: {
                authenticated: true,
                timestamp: Date.now(),
                ip: req.ip
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '2h' },
            (err, token) => {
                if (err) {
                    console.error('❌ JWT signing error:', err);
                    logAdminAction('LOGIN_FAILED_JWT_ERROR', {
                        ip: req.ip,
                        error: err.message
                    });
                    return res.status(500).json({
                        success: false,
                        msg: 'Authentication error. Please try again.'
                    });
                }

                logAdminAction('LOGIN_SUCCESS', {
                    ip: req.ip,
                    timestamp: new Date().toISOString()
                });

                res.json({
                    success: true,
                    token,
                    expiresIn: '2h',
                    msg: 'Authentication successful'
                });
            }
        );
    } catch (err) {
        console.error('❌ Login error:', err);
        logAdminAction('LOGIN_ERROR', {
            ip: req.ip,
            error: process.env.NODE_ENV === 'production' ? 'Internal error' : err.message
        });
        res.status(500).json({
            success: false,
            msg: 'An error occurred. Please try again later.'
        });
    }
});

// @route   GET api/admin/contacts
// @desc    Get all contact submissions (protected)
// @access  Private (Admin only)
router.get('/contacts', verifyAdminToken, async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });

        logAdminAction('DATA_ACCESS_CONTACTS', {
            ip: req.ip,
            count: contacts.length,
            timestamp: new Date().toISOString()
        });

        res.json({
            success: true,
            count: contacts.length,
            data: contacts
        });
    } catch (err) {
        console.error('❌ Error fetching contacts:', err);
        logAdminAction('DATA_ACCESS_ERROR', {
            ip: req.ip,
            error: process.env.NODE_ENV === 'production' ? 'Database error' : err.message
        });
        res.status(500).json({
            success: false,
            msg: 'Unable to retrieve data. Please try again.'
        });
    }
});

// @route   GET api/admin/verify
// @desc    Verify admin token
// @access  Private (Admin only)
router.get('/verify', verifyAdminToken, (req, res) => {
    res.json({
        success: true,
        msg: 'Token is valid',
        expiresIn: '2h'
    });
});

// @route   GET api/admin/logs
// @desc    Get recent audit logs (last 100 entries)
// @access  Private (Admin only)
router.get('/logs', verifyAdminToken, async (req, res) => {
    try {
        const fs = require('fs');
        const path = require('path');
        const logFilePath = path.join(__dirname, '../logs/admin-audit.log');

        if (!fs.existsSync(logFilePath)) {
            return res.json({
                success: true,
                logs: [],
                msg: 'No logs available yet'
            });
        }

        const logContent = fs.readFileSync(logFilePath, 'utf-8');
        const logLines = logContent.trim().split('\n').filter(line => line);
        const logs = logLines.slice(-100).map(line => JSON.parse(line)).reverse();

        logAdminAction('LOGS_ACCESSED', {
            ip: req.ip,
            count: logs.length
        });

        res.json({
            success: true,
            logs,
            count: logs.length
        });
    } catch (err) {
        console.error('❌ Error reading logs:', err);
        res.status(500).json({
            success: false,
            msg: 'Unable to retrieve logs.'
        });
    }
});

module.exports = router;
