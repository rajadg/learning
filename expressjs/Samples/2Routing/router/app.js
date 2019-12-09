const express = require("express");
const bookLibrary = require("./bookLibrary").bookLibrary;
const app = express();
app.use("/books", bookLibrary);
app.listen(8080);
