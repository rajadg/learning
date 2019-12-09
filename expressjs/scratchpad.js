const express = require('express');
const app = express();
app.route('/books').get((req, res) => {
    res.send('Get the list of books');
}).post((req, res) => {
    res.send('Accept a new book');
}).delete((req, res) => {
    res.send('Remove a book');
});
app.listen(8080);