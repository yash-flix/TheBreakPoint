const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// DB Config
const db = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/breakpoint';

// Connect to MongoDB with options for Atlas
mongoose
    .connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('✅ MongoDB Connected Successfully');
        console.log(`📊 Database: ${mongoose.connection.name}`);
    })
    .catch((err) => {
        console.error('❌ MongoDB Connection Error:', err.message);
        process.exit(1);
    });

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'ok', 
        message: 'Backend server is running',
        timestamp: new Date().toISOString()
    });
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contact', require('./routes/contact'));

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    console.log(`🚀 Server started on port ${PORT}`);
    console.log(`📍 Health check: http://localhost:${PORT}/api/health`);
    console.log(`📍 Contact API: http://localhost:${PORT}/api/contact`);
});
