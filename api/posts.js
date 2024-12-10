const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb+srv://sbeanT8:bOrB8TkgrMrKGmRj@socialmedia.2tndl.mongodb.net/?retryWrites=true&w=majority&appName=socialMedia', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

const postSchema = new mongoose.Schema({
  text: { type: String, required: true },
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
