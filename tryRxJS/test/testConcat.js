const logTemplate = require("../utils/logtemplate");
const log4js = require("log4js");

let logger = null;
// Get the command line arguments and also the logger module
if (require.main == module) {
    logger = logTemplate.setupLogging("trace", true);
}

async function testConcat01() {
    const { of, concat } = require("rxjs");

    let list1 = of(2, 3, 4, 5, 6);
    let list2 = of(4, 9, 16, 25, 36)
    let myObservable = concat(list1, list2);
    logger.debug(`Created a new observable`);
    myObservable.subscribe(
        data => logger.debug(`data: ${data}`),
        err => logger.error(`Error: ${err}`),
        () => logger.debug("complete")
    );
    logger.debug(`Subscribed to observable`);
}

async function testConcat02() {
    const { EMPTY, of, concat } = require("rxjs");
    const list1 = of(1, 2, 3);
    const list2 = of(4, 5, 6, 6.5);
    const list3 = of(7, 8, 9);
    let myObservable = concat(list1, EMPTY, list2, list3);
    logger.debug(`Created a new observable`);
    myObservable.subscribe(
        data => logger.debug(`data: ${data}`),
        err => logger.error(`Error: ${err}`),
        () => logger.debug("complete")
    );
    logger.debug(`Subscribed to observable`);
}

async function testConcatAll03() {
    const { of } = require("rxjs");
    const { concatAll } = require("rxjs/operators");
    const list1 = of(1, 2, 3);
    const list2 = of(4, 5, 6, 6.5);
    const list3 = of(7, 8, 9);
    let myObservable = of(list1, list2, list3).pipe(concatAll());
    logger.debug(`Created a new observable`);
    myObservable.subscribe(
        data => logger.debug(`data: ${data}`),
        err => logger.error(`Error: ${err}`),
        () => logger.debug("complete")
    );
    logger.debug(`Subscribed to observable`);
}


async function testConcatAll04() {
    const { of } = require("rxjs");
    const { concatAll, map } = require("rxjs/operators");
    const list1 = of(1, 2, 3);
    let myObservable = list1.pipe(map(item => of(item)), concatAll());
    logger.debug(`Created a new observable`);
    myObservable.subscribe(
        data => logger.debug(`data: ${data}`),
        err => logger.error(`Error: ${err}`),
        () => logger.debug("complete")
    );
    logger.debug(`Subscribed to observable`);
}


async function testConcatMap05() {
    const { of } = require("rxjs");
    const { concatMap } = require("rxjs/operators");
    const list1 = of(1, 2, 3);
    let myObservable = list1.pipe(concatMap(item => of(item*item)));
    logger.debug(`Created a new observable`);
    myObservable.subscribe(
        data => logger.debug(`data: ${data}`),
        err => logger.error(`Error: ${err}`),
        () => logger.debug("complete")
    );
    logger.debug(`Subscribed to observable`);
}


async function testConcatMapTo06() {
    const { of } = require("rxjs");
    const { concatMapTo } = require("rxjs/operators");
    const list1 = of(1, 2, 3);
    let myObservable = list1.pipe(concatMapTo(of(4,5,6), (v1, v2) => `${v1}:${v2}`));
    logger.debug(`Created a new observable`);
    myObservable.subscribe(
        data => logger.debug(`data: ${data}`),
        err => logger.error(`Error: ${err}`),
        () => logger.debug("complete")
    );
    logger.debug(`Subscribed to observable`);
}


async function main() {
    await testConcatMapTo06();
}

if (require.main == module) {
    main();
}
