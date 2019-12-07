const express = require("express");

const port = 7000;

function main() {
    var app = express();

    app.get("/", function(req, res) {
        res.send("hello world !!");
    });
    app.listen(port);
}

if (require.main == module) {
    const path = require("path");
    console.log(`script ${path.basename(process.argv[1])} loaded`);
    main();
}
