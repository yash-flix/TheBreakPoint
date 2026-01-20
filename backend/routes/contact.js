const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// @route   POST api/contact
// @desc    Submit contact form
// @access  Public
router.post('/', async (req, res) => {
    const { name, email, contact, subject } = req.body;

    // Simple validation
    if (!name || !email || !contact || !subject) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }

    try {
        const newContact = new Contact({
            name,
            email,
            contact,
            subject
        });

        const savedContact = await newContact.save();
        res.json(savedContact);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
