const express = require("express");
// Define a route
var bookLibrary = express.Router();
// Create a route handler
bookLibrary
    .get("/:id", (req, res) => {
        res.send(`Get the book for id: ${req.params.id}`);
    })
    .post("/", (req, res) => {
        res.send("Accept a new book");
    })
    .delete("/:id", (req, res) => {
        res.send(`Remove a book with id: ${req.params.id}`);
    });
module.exports = {
    bookLibrary: bookLibrary
};
