const express = require('express');
const cors = require('cors'); // Import the cors module
const app = express();
const port = 3000;

// Middleware to parse JSON
app.use(express.json());
app.use(express.static('public')); // For serving static files (HTML, CSS, JS)
app.use(cors());  // This will allow requests from any origin

// In-memory store for posts
let posts = [];

// Route to get all posts
app.get('/posts', (req, res) => {
    res.json(posts);  // Return the actual posts array
});

// Route to submit a new post
app.post('/submit', (req, res) => {
    const { text } = req.body;
    if (text) {
        posts.push({ text });
        res.status(200).send('Post added');
    } else {
        res.status(400).send('Text is required');
    }
});

app.listen(3000, () => {
    console.log('Server running on http://127.0.0.1:3000');
});
