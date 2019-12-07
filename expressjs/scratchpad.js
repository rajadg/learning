const express = require('express');
const app = express();
function auth(req, res, next) {
    req.params.user = req.headers['user'] || req.params.user || 'guest';
    next(); // Call next() to ensure next handler in the chain is invoked
}
function content(req, res) {
    res.send(`Hello ${req.params.user}`);
}
const rt = app.route('/book');
rt.get((q, s)=> s.send('get a book'));
rt.post((q, s)=> s.send('add a book'));
rt.delete((q, s)=> s.send('remove a book'));
app.get('/', [auth, content]); // add a handler chain as an array
app.listen(8080);