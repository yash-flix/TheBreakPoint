const fs = require('fs');
const path = require('path');

// Create logs directory if it doesn't exist
const logsDir = path.join(__dirname, '../logs');
if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir);
}

const logFilePath = path.join(logsDir, 'admin-audit.log');

/**
 * Log admin actions to file
 * @param {string} action - Action performed (LOGIN_SUCCESS, LOGIN_FAILED, DATA_ACCESS, etc.)
 * @param {object} details - Additional details about the action
 */
const logAdminAction = (action, details = {}) => {
    const timestamp = new Date().toISOString();
    const logEntry = {
        timestamp,
        action,
        ...details
    };

    const logLine = JSON.stringify(logEntry) + '\n';

    // Append to log file
    fs.appendFile(logFilePath, logLine, (err) => {
        if (err) {
            console.error('❌ Error writing to audit log:', err);
        }
    });

    // Also log to console in development
    if (process.env.NODE_ENV !== 'production') {
        console.log('📝 Audit Log:', logEntry);
    }
};

module.exports = { logAdminAction };
