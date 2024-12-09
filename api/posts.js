// api/posts.js
let posts = [];

module.exports = async (req, res) => {
  if (req.method === 'GET') {
    res.status(200).json(posts);  // Return posts
  } else if (req.method === 'POST') {
    const { text } = req.body;
    if (text) {
      posts.push({ text });
      res.status(200).send('Post added');
    } else {
      res.status(400).send('Text is required');
    }
  } else {
    res.status(405).send('Method Not Allowed');
  }
};
