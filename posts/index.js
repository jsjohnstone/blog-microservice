const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors')

// Setup express app
const app = express();
app.use(bodyParser.json());
app.use(cors());

// Add in-memory data object
const posts = {};

// List of stored posts
app.get('/posts', (req, res) => {
    res.send(posts)
});

// Add a new post to the store
app.post('/posts', (req, res) => {
    // Generate a random ID for the post
    const id = randomBytes(4).toString('hex');
    // Get the title from the POST body
    const { title } = req.body;

    // Construct the object to add to the in-memory store
    posts[id] = {
        id, title
    };

    // Return a 201 (created object) and send the post object
    res.status(201).send(posts[id]);
});

// Run the service on port 4000
app.listen(4000, () => {
    console.log('Listening on 4000')
})