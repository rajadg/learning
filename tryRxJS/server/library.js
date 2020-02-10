const express = require("express");
// Define a route
var bookLibrary = express.Router();

function book(params) {
  const data = { id: 0, name: "test", author: "self" };
  return { ...data, ...params };
}

// Create a route handler
bookLibrary
  .get("/:id", (req, res) => {
    ret = book({ id: req.params.id });
    setTimeout(() => res.send(JSON.stringify(ret, null, 2)), 500);
  })
  .post("/", (req, res) => {
    ret = {result: "accept new book"};
    res.contentType = 'application/json';
    setTimeout(() => res.send(JSON.stringify(ret, null, 2)), 850);
  })
  .delete("/:id", (req, res) => {
    setTimeout(() => res.send(`Delete book ${req.params.id}`), 700);
  });
module.exports = {
  bookLibrary: bookLibrary
};
