const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

// Serve static images
debugger;
app.use('/images', express.static(path.join(__dirname, '../assets/images')));

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

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
