const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// @route   POST api/contact
// @desc    Submit contact form
// @access  Public
router.post('/', async (req, res) => {
    const { name, email, contact, subject, message } = req.body;

    // Debug: Log received data
    console.log('📥 Received contact form data:');
    console.log('   Name:', name);
    console.log('   Email:', email);
    console.log('   Contact:', contact);
    console.log('   Subject:', subject);
    console.log('   Message:', message || '(empty/not provided)');
    console.log('   Message type:', typeof message);
    console.log('   Full body:', JSON.stringify(req.body, null, 2));

    // Simple validation
    if (!name || !email || !contact || !subject) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ msg: 'Please enter a valid email address' });
    }

    try {
        // Ensure message field is always included, even if empty
        const contactData = {
            name,
            email,
            contact,
            subject,
        };
        
        // Always include message field (empty string if not provided)
        if (message !== undefined && message !== null) {
            contactData.message = message;
        } else {
            contactData.message = '';
        }
        
        const newContact = new Contact(contactData);

        const savedContact = await newContact.save();
        console.log('✅ New contact saved to MongoDB Atlas:');
        console.log('   Name:', savedContact.name);
        console.log('   Email:', savedContact.email);
        console.log('   Contact:', savedContact.contact);
        console.log('   Subject:', savedContact.subject);
        console.log('   Message:', savedContact.message || '(none)');
        console.log('   Created At:', savedContact.createdAt);
        console.log('   ID:', savedContact._id);
        
        res.status(201).json({ 
            success: true,
            msg: 'Contact form submitted successfully',
            data: savedContact 
        });
    } catch (err) {
        console.error('❌ Error saving contact to MongoDB:', err);
        res.status(500).json({ 
            success: false,
            msg: 'Server Error', 
            error: err.message 
        });
    }
});

// @route   GET api/contact
// @desc    Get all contact submissions (for verification)
// @access  Public
router.get('/', async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });
        console.log(`📋 Retrieved ${contacts.length} contact submissions from MongoDB Atlas`);
        res.json({ 
            success: true,
            count: contacts.length,
            data: contacts 
        });
    } catch (err) {
        console.error('❌ Error fetching contacts:', err);
        res.status(500).json({ 
            success: false,
            msg: 'Server Error', 
            error: err.message 
        });
    }
});

// @route   GET api/contact/:id
// @desc    Get a single contact submission by ID
// @access  Public
router.get('/:id', async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);
        if (!contact) {
            return res.status(404).json({ 
                success: false,
                msg: 'Contact not found' 
            });
        }
        res.json({ 
            success: true,
            data: contact 
        });
    } catch (err) {
        console.error('❌ Error fetching contact:', err);
        res.status(500).json({ 
            success: false,
            msg: 'Server Error', 
            error: err.message 
        });
    }
});

module.exports = router;
