const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// @route   POST api/contact
// @desc    Submit contact form
// @access  Public
router.post('/', async (req, res) => {
    const { name, email, contact, subject, message } = req.body;

    // Simple validation
    if (!name || !email || !contact || !subject) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }

    try {
        const newContact = new Contact({
            name,
            email,
            contact,
            subject,
            // Message is optional so that the old modal form still works
            message,
        });

        const savedContact = await newContact.save();
        console.log('New contact saved to MongoDB:', savedContact);
        res.json(savedContact);
    } catch (err) {
        console.error('Error saving contact:', err);
        res.status(500).json({ msg: 'Server Error', error: err.message });
    }
});

module.exports = router;
