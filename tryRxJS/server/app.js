const express = require('express');
const bookLibrary = require('./library').bookLibrary;

// Create an object of express
const app = express();
app.use(express.json());

// HTTP GET handler for root url (/) will return "Hello world!" message
app.get('/', function(req, res){
    res.send("Hello world!");
});
app.use('/books',bookLibrary);

// Listen in the target port
app.listen(8080);