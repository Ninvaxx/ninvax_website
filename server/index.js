const express = require('express');
const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static images
app.use('/images', express.static(path.join(__dirname, '../assets/images')));

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === 'true',
    auth: process.env.SMTP_USER ? {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    } : undefined
});

// Endpoint to list blog posts
app.get('/api/blog-posts', (req, res) => {
    const postsDir = path.join(__dirname, '../Blog Posts');
    fs.readdir(postsDir, (err, files) => {
        if (err) return res.status(500).json({ error: 'Unable to read blog posts' });
        // Only .txt files
        const postFiles = files.filter(f => f.endsWith('.txt'));
        res.json(postFiles);
    });
});

// Endpoint to get a blog post's content
app.get('/api/blog-posts/:filename', (req, res) => {
    const filePath = path.join(__dirname, '../Blog Posts', req.params.filename);
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) return res.status(404).json({ error: 'Post not found' });
        res.send(data);
    });
});

// Endpoint to list images
app.get('/api/images', (req, res) => {
    const imagesDir = path.join(__dirname, '../assets/images');
    fs.readdir(imagesDir, (err, files) => {
        if (err) return res.status(500).json({ error: 'Unable to read images' });
        // Only image files
        const imageFiles = files.filter(f => /\.(jpg|jpeg|png|gif)$/i.test(f));
        res.json(imageFiles);
    });
});

app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
        return res.status(400).json({ error: 'Missing fields' });
    }

    const mailOptions = {
        from: process.env.SMTP_FROM || email,
        to: 'ninvax@icloud.com',
        subject: `Contact form submission from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\n${message}`
    };

    transporter.sendMail(mailOptions, (err) => {
        if (err) {
            console.error('Email error:', err);
            return res.status(500).json({ error: 'Failed to send message' });
        }
        res.json({ success: true });
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
