const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');

// Setup express app
const app = express();
app.use(bodyParser.json());
app.use(cors());

// Add in-memory data object
const commentsByPostId = {};

// Get list of stored comments for a post
app.get('/posts/:id/comments', (req, res) => {
    res.send(commentsByPostId[req.params.id] || [])   
});

// Add a new comment to a post
app.post('/posts/:id/comments', (req, res) => {
    // Generate a random ID for comments
    const commentId = randomBytes(4).toString('hex');
    // Extract the comment body from POST request
    const { content } = req.body;

    // Get existing comments or return an empty array
    const comments = commentsByPostId[req.params.id] || [];

    // Add the new comment to the array of comments for this post
    comments.push({ id: commentId, content});

    // ...and add the updated array back to the in-memory store
    commentsByPostId[req.params.id] = comments;

    // Respond success created (201) with updated comments list for this post
    res.status(201).send(comments);
});

// Start the app and listen on port 4001
app.listen(4001, () => {
    console.log('Listening on 4001')
});