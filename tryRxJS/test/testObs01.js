const logTemplate = require("../utils/logtemplate");
const log4js = require("log4js");

let logger = null;
// Get the command line arguments and also the logger module
if (require.main == module) {
    logger = logTemplate.setupLogging("trace");
}

async function obs01() {
    const { Observable } = require("rxjs");
    const observable = new Observable(subscriber => {
        subscriber.next(1);
        subscriber.next(2);
        subscriber.next(3);
        setTimeout(() => {
            subscriber.next(4);
            subscriber.complete();
        }, 1000);
    });
    logger.debug(`Created a new observable`);
    observable.subscribe(
        data => logger.debug(`data: ${data}`),
        err => logger.error(`Error: ${err}`),
        () => logger.debug("complete")
    );
    logger.debug(`Subscribed to observable`);
}

async function main() {
    await obs01();
}

if (require.main == module) {
    main();
}
