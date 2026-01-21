const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    // Optional detailed message from the Contact page form
    message: {
        type: String,
        required: false,
        default: ''
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    // Ensure empty strings are saved
    minimize: false
});

module.exports = mongoose.model('Contact', ContactSchema);
