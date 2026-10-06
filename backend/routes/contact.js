const express = require('express');
const router = express.Router();
const { Resend } = require('resend');
const Contact = require('../models/Contact');

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const NOTIFY_FROM = process.env.RESEND_FROM || 'TheBreakPoint <onboarding@resend.dev>';
const NOTIFY_TO = (process.env.CONTACT_NOTIFY_TO || 'yash.tushar13@gmail.com,dishants0605@gmail.com')
    .split(',')
    .map((addr) => addr.trim())
    .filter(Boolean);

if (!resend) {
    console.warn('⚠️  RESEND_API_KEY not set — contact form email notifications are disabled');
}

const escapeHtml = (value) =>
    String(value ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');

// Email the team about a new submission. Never throws — the submission is
// already saved, so a mail failure should only be logged.
const sendContactNotification = async (saved) => {
    if (!resend) return;

    const rows = [
        ['Name', saved.name],
        ['Email', saved.email],
        ['Phone', saved.contact],
        ['Subject', saved.subject],
        ['Message', saved.message || '(none)'],
        ['Received', new Date(saved.createdAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })],
    ];

    const html = `
        <h2 style="font-family:sans-serif;margin:0 0 16px">New contact form submission</h2>
        <table cellpadding="8" style="font-family:sans-serif;font-size:14px;border-collapse:collapse">
            ${rows
                .map(
                    ([label, value]) => `
                <tr>
                    <td style="font-weight:600;vertical-align:top;border-bottom:1px solid #eee">${label}</td>
                    <td style="white-space:pre-wrap;border-bottom:1px solid #eee">${escapeHtml(value)}</td>
                </tr>`
                )
                .join('')}
        </table>`;
    const text = rows.map(([label, value]) => `${label}: ${value}`).join('\n');

    try {
        const { data, error } = await resend.emails.send({
            from: NOTIFY_FROM,
            to: NOTIFY_TO,
            replyTo: saved.email,
            subject: `New contact: ${saved.subject} — ${saved.name}`,
            html,
            text,
        });
        if (error) {
            console.error('❌ Resend rejected contact notification:', error);
        } else {
            console.log('📧 Contact notification sent:', data?.id);
        }
    } catch (err) {
        console.error('❌ Failed to send contact notification:', err);
    }
};

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

        await sendContactNotification(savedContact);

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
