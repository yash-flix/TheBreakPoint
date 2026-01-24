const bcrypt = require('bcryptjs');
const crypto = require('crypto');

// Generate a secure JWT secret (64 characters)
const jwtSecret = crypto.randomBytes(64).toString('hex');

// Hash the admin password
const password = 'breakpoint2024'; // Change this to your desired password
const saltRounds = 12;

bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
        console.error('Error hashing password:', err);
        return;
    }

    console.log('\n=== ADMIN PANEL SECURITY CONFIGURATION ===\n');
    console.log('Add these to your backend/.env file:\n');
    console.log(`JWT_SECRET=${jwtSecret}`);
    console.log(`ADMIN_PASSWORD_HASH=${hash}`);
    console.log('\n⚠️  IMPORTANT: Keep these values secret and never commit them to version control!');
    console.log('⚠️  The password used for hashing was: breakpoint2024');
    console.log('\n==========================================\n');
});
