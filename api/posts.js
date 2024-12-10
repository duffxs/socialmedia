// Load environment variables from .env file
require('dotenv').config();

const mongoose = require('mongoose');

// Connect to MongoDB using the environment variable
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

const postSchema = new mongoose.Schema({
  text: { 
    type: String, 
    required: true, 
    maxlength: 280, // Enforce 280 character limit
  },
  createdAt: { type: Date, default: Date.now },
});

const Post = mongoose.model('Post', postSchema);

module.exports = async (req, res) => {
  if (req.method === 'GET') {
    // Fetch all posts from the database
    try {
      const posts = await Post.find().sort({ createdAt: -1 });
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).send('Error fetching posts');
    }
  } else if (req.method === 'POST') {
    // Add a new post to the database
    const { text } = req.body;
    
    if (text) {
      // Check if the text exceeds the character limit
      if (text.length > 280) {
        return res.status(400).send('Text exceeds the 280 character limit');
      }

      try {
        await Post.create({ text });
        res.status(200).send('Post added');
      } catch (error) {
        res.status(500).send('Error saving post');
      }
    } else {
      res.status(400).send('Text is required');
    }
  } else {
    res.status(405).send('Method Not Allowed');
  }
};
