const express = require('express');

const app = express();



app.get('/hello', function(req, res) {
    res.send('hello world');
});

app.get('/', function(req, res) {
    res.redirect('/samples/index.html');
});


app.use('/samples', express.static('./samples'));
app.use(express.json());

app.listen(8080);

