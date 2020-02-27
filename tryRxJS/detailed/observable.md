# Observable

Observables are lazy Push collections of multiple values. Observables are declarative—that is, you define a function for publishing values, but it is not executed until a consumer subscribes to it. The subscribed consumer then receives notifications until the function completes, or until they unsubscribe.

## Creating an Observable
The `Observable` is declared in the `rxjs` library. This is a creation operator. We can create a new observable by providing a emitter function as follows:
```javascript
// Import the Observable from rxjs
const { Observable } = require("rxjs");
// Create a new instance by providing a subscriber
const myObservable = new Observable(emitter);
```

## Emitting Values from an Observable
A emitter is essentially a callback function that can fire multiple values. This function takes one argument: `subscriber` who receives the events. The emitter function fires values using method `subscriber.next`. To inidicate completion, the emitter will invoke the method `subscriber.complete`. A sample emitter definition which emits two values (1, 2):
```javascript
function emitter(subscriber) {
    subscriber.next(1);
    subscriber.next(2);
    subscriber.complete();
}
```

## Consuming an Observable
We can consume the values emitted by an Observable by calling the `Observable.subscribe` method. This method takes 3 arguments:
* A method to receive data
* A method to recieve errors (if any)
* A method to be notified of completion

Example Code:
```javascript
myObservable.subscribe(
    data => logger.debug(`data: ${data}`),
    err => logger.error(`Error: ${err}`),
    () => logger.debug("complete")
);
```


## A Full Example
Typically we define the emitter method inline in the same statement that creates the Observable instances like this:

```javascript
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
```

In the above example, the values: 1, 2, 3 are emitted immediately when `subscribe` is invoked. Then the value 4 is emitted after 1 second wait. Due to 1 second wait this will happen only after `subscribe` method returns. As soon as value 4 is emitted, the observable will notify completion.

**Output**
```
Created a new observable
data: 1
data: 2
data: 3
Subscribed to observable
data: 4
complete
```