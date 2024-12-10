// api/posts.js
let posts = [];

module.exports = async (req, res) => {
  // Check if request method is GET
  if (req.method === 'GET') {
    res.status(200).json(posts);  // Return posts
  } 
  // Handle POST request
  else if (req.method === 'POST') {
    // Parse the JSON body manually
    try {
      const { text } = req.body;
      if (text) {
        posts.push({ text });
        res.status(200).send('Post added');
      } else {
        res.status(400).send('Text is required');
      }
    } catch (error) {
      res.status(400).send('Invalid JSON');
    }
  } 
  // Method Not Allowed
  else {
    res.status(405).send('Method Not Allowed');
  }
};
