const logTemplate = require("../utils/logtemplate");
const log4js = require("log4js");

let logger = null;
// Get the command line arguments and also the logger module
if (require.main == module) {
  logger = logTemplate.setupLogging("trace");
}

async function ops() {
  const { of, interval } = require("rxjs");
  const observable = of(1, 2, 3, 4, 5);
  observable.subscribe(
    data => logger.debug(`data: ${data}`),
    err => logger.error(`Error: ${err}`),
    () => logger.debug("complete")
  );
}

async function subs() {
  const { interval } = require("rxjs");
  const observable = interval(400);
  const subscription = observable.subscribe(
    data => logger.debug(`data: ${data}`),
    err => logger.error(`Error: ${err}`),
    () => logger.debug("complete")
  );
  setTimeout(() => {
    subscription.unsubscribe();
  }, 2100);
}

async function subjects() {
  const { Subject, from } = require("rxjs");
  const subject = new Subject();
  subject.subscribe((v) => logger.debug(`observerA: ${v}`));
  subject.subscribe((v) => logger.debug(`observerB: ${v}`));
  const observable = from([1, 2, 3]);
  observable.subscribe(subject);
}

async function sched() {
  const { of, asyncScheduler } = require("rxjs");
  const { observeOn } = require("rxjs/operators");
  const observable = of(1, 2, 3, 4, 5).pipe(observeOn(asyncScheduler));
  logger.debug(`Before calling subscribe...`);
  observable.subscribe(
    data => logger.debug(`data: ${data}`),
    err => logger.error(`Error: ${err}`),
    () => logger.debug("complete")
  );
  logger.debug(`After calling subscribe.`);
}

async function main() {
  await sched();
}

if (require.main == module) {
  main();
}
