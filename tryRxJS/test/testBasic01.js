const logTemplate = require("../utils/logtemplate");
const log4js = require("log4js");

let logger = null;
// Get the command line arguments and also the logger module
if (require.main == module) {
    logger = logTemplate.setupLogging("trace", true);
}

async function testFrom01() {
    const { from } = require("rxjs");
    const myObservable = from([1, 2, 3]);
    logger.debug(`Created a new observable`);
    myObservable.subscribe(
        data => logger.debug(`data: ${data}`),
        err => logger.error(`Error: ${err}`),
        () => logger.debug("complete")
    );
    logger.debug(`Subscribed to observable`);
}

async function testFrom02() {
    const { from } = require("rxjs");
    const myObservable = from("ABCDE");
    logger.debug(`Created a new observable`);
    myObservable.subscribe(
        data => logger.debug(`data: ${data}`),
        err => logger.error(`Error: ${err}`),
        () => logger.debug("complete")
    );
    logger.debug(`Subscribed to observable`);
}

async function testFrom03() {
    const { from } = require("rxjs");
    const myObservable = from([]);
    logger.debug(`Created a new observable`);
    myObservable.subscribe(
        data => logger.debug(`data: ${data}`),
        err => logger.error(`Error: ${err}`),
        () => logger.debug("complete")
    );
    logger.debug(`Subscribed to observable`);
}

async function testFrom04() {
    const { from } = require("rxjs");
    const myObservable = from(new Promise(resolve => resolve("Hello World!")));
    logger.debug(`Created a new observable`);
    myObservable.subscribe(
        data => logger.debug(`data: ${data}`),
        err => logger.error(`Error: ${err}`),
        () => logger.debug("complete")
    );
    logger.debug(`Subscribed to observable`);
}

async function testOf01() {
    const { of } = require("rxjs");
    const myObservable = of(1, 2, 3, 4);
    logger.debug(`Created a new observable`);
    myObservable.subscribe(
        data => logger.debug(`data: ${data}`),
        err => logger.error(`Error: ${err}`),
        () => logger.debug("complete")
    );
    logger.debug(`Subscribed to observable`);
}

async function testEmpty01() {
    const { empty } = require("rxjs");
    const myObservable = empty();
    logger.debug(`Created a new observable`);
    myObservable.subscribe(
        data => logger.debug(`data: ${data}`),
        err => logger.error(`Error: ${err}`),
        () => logger.debug("complete")
    );
    logger.debug(`Subscribed to observable`);
}

async function testEmpty02() {
    const { EMPTY } = require("rxjs");
    logger.debug(`Importing and Subscribing to EMPTY observable`);
    EMPTY.subscribe(
        data => logger.debug(`data: ${data}`),
        err => logger.error(`Error: ${err}`),
        () => logger.debug("complete")
    );
    logger.debug(`Subscribed to observable`);
}

async function testDefer01() {
    const { of, defer } = require("rxjs");
    let start = 0;
    const myObservable = defer(() => of(start + 1, start + 2, start + 3));
    logger.debug(`Created a observable using defer, of operators`);
    start = 3;
    myObservable.subscribe(
        data => logger.debug(`data: ${data}`),
        err => logger.error(`Error: ${err}`),
        () => logger.debug("complete")
    );
    logger.debug(`Subscribed to observable`);
}

async function testDefer02() {
    const { of } = require("rxjs");
    let start = 0;
    const myObservable = of(start + 1, start + 2, start + 3);
    logger.debug(`Created a observable using of operator`);
    start = 3;
    myObservable.subscribe(
        data => logger.debug(`data: ${data}`),
        err => logger.error(`Error: ${err}`),
        () => logger.debug("complete")
    );
    logger.debug(`Subscribed to observable`);
}


async function testRange01() {
    const { range } = require("rxjs");
    let start = 0;
    const myObservable = range(start, start + 4);
    logger.debug(`Created a observable using range operator`);
    start = 3;
    myObservable.subscribe(
        data => logger.debug(`data: ${data}`),
        err => logger.error(`Error: ${err}`),
        () => logger.debug("complete")
    );
    logger.debug(`Subscribed to observable`);
}

async function testGenerate01() {
    const { generate } = require("rxjs");
    const myObservable = generate(0, x => x < 5, x => x + 1);
    logger.debug(`Created a observable using generate operator`);
    myObservable.subscribe(
        data => logger.debug(`data: ${data}`),
        err => logger.error(`Error: ${err}`),
        () => logger.debug("complete")
    );
    logger.debug(`Subscribed to observable`);
}

async function testGenerate02() {
    const { generate } = require("rxjs");
    const myObservable = generate(
        0,
        x => x < 5,
        x => x + 1,
        x => ('*').repeat(x));
    logger.debug(`Created a observable using generate operator`);
    myObservable.subscribe(
        data => logger.debug(`data: ${data}`),
        err => logger.error(`Error: ${err}`),
        () => logger.debug("complete")
    );
    logger.debug(`Subscribed to observable`);
}

async function testTimer01() {
    const { timer } = require("rxjs");
    const myObservable = timer(500);
    logger.debug(`Created a observable using timer operator`);
    myObservable.subscribe(
        data => logger.debug(`data: ${data}`),
        err => logger.error(`Error: ${err}`),
        () => logger.debug("complete")
    );
    logger.debug(`Subscribed to observable`);
}


async function testTimer02() {
    const { timer } = require("rxjs");
    const myObservable = timer(500, 500);
    logger.debug(`Created a observable using timer operator with interval`);
    myObservable.subscribe(
        data => logger.debug(`data: ${data}`),
        err => logger.error(`Error: ${err}`),
        () => logger.debug("complete")
    );
    logger.debug(`Subscribed to observable`);
}

async function testTimer03() {
    const { timer } = require("rxjs");
    const myObservable = timer(500, 500);
    logger.debug(`Created a observable using timer operator with interval`);
    const subscription = myObservable.subscribe(
        data => logger.debug(`data: ${data}`),
        err => logger.error(`Error: ${err}`),
        () => logger.debug("complete")
    );
    setTimeout(() => {
        subscription.unsubscribe();
    }, 2000);
    logger.debug(`Subscribed to observable`);
}


async function testTimer04() {
    const { timer } = require("rxjs");
    const { take } = require("rxjs/operators");
    const myObservable = timer(500, 500).pipe(take(5));
    logger.debug(`Created a observable using timer operator with interval`);
     myObservable.subscribe(
        data => logger.debug(`data: ${data}`),
        err => logger.error(`Error: ${err}`),
        () => logger.debug("complete")
    );
    logger.debug(`Subscribed to observable`);
}

async function main() {
    await testTimer04();
}

if (require.main == module) {
    main();
}
