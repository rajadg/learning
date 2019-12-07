const express = require('express');
const app = express();
app.get('/library/books/:category/:name', (req, res) => {
    // route: /library/books
    // acutal url: HTTP GET http://localhost:8080/library/books/math/algebra
    const msg = `Find book <b>${req.params.name}</b> `+ 
        `under category: <em>${req.params.category}</em>`
    res.send(msg);
});
app.listen(8080);