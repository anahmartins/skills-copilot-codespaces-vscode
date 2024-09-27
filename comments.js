// Create web server
// Create a route to handle comments
// Create a form to submit comments
// Save comments to a file

const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;
const commentsPath = path.join(__dirname, 'comments.json');

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/comments', (req, res) => {
    const comments = JSON.parse(fs.readFileSync(commentsPath));
    res.json(comments);
});

app.post('/comments', (req, res) => {
    const comments = JSON.parse(fs.readFileSync(commentsPath));
    comments.push(req.body);
    fs.writeFileSync(commentsPath, JSON.stringify(comments));
    res.json(comments);
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});