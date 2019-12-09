// Import express package
const express = require('express');

// Create a new express instance
const app = express();

// Configure multiple handlerrs for '/books' route
app.route('/books')
.get((req, res) => {
    // The HTTP GET handler
    res.send('Get the list of books');
}).post((req, res) => {
    // The HTTP POST handler
    res.send('Accept a new book');
}).delete((req, res) => {
    // The HTTP DELETE handler
    res.send('Remove a book');
});

// Start the application at port 8080
app.listen(8080);