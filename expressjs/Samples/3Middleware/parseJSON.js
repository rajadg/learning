// Import the express module
var express = require('express');
// Create an object of express
var app = express();

// Enable JSON parsing
app.use(express.json());

// A Http POST that searches books by author
app.post('/books', (req, res) => {
    console.log(`Searching for books by: ${req.body.author}`);
    res.send(`Books by author: ${req.body.author}`);
});
// Listen at port 8080
app.listen(8080);
