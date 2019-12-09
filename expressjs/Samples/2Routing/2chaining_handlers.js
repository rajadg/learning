const express = require('express');
const app = express();
app.get('/', (req, res, next) => {
    if (req.headers['user']) {
        req.params.user = req.headers['user'];
    }
    next();
}, (req, res) => {
    res.send(`Hello ${req.params.user || 'guest'}`);
});
app.listen(8080);