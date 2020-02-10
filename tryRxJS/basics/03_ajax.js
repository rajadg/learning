const { XMLHttpRequest } = require("xmlhttprequest");

const logTemplate = require("../utils/logtemplate");
const log4js = require("log4js");

let [args, logger] = [null, null];
// Get the command line arguments and also the logger module
if (require.main == module) {
  [args, logger] = logTemplate.setupLogging(null, "trace");
}
const rxMD = require("../utils/rxMD");

class Study {}

function createXHR() {
  return new XMLHttpRequest();
}

Study.prototype.studyBasic = function studyBasic() {
  const { XMLHttpRequest } = require("xmlhttprequest");
  const { ajax } = require("rxjs/ajax");
  const { map } = require("rxjs/operators");
  return ajax({
    createXHR: () => new XMLHttpRequest(),
    url: "http://localhost:8080/books/2044",
    crossDomain: true
  }).pipe(map(data => JSON.stringify(data.response, null, 2)));
};

function test() {
  const { XMLHttpRequest } = require("xmlhttprequest");
  const { ajax } = require("rxjs/ajax");
  const observable = ajax({
    createXHR: () => new XMLHttpRequest(),
    url: "http://localhost:8080/books",
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: {"id": 2003},
    crossDomain: true
  });
  observable.subscribe(
    data => console.log(`response: ${data.response}`),
    err => console.log(`err: ${err}`),
    () => console.log(`complete`)
  );
}

async function main() {
  // await rxMD.markdown(Study);
  await test();
}

if (require.main == module) {
  main();
}
