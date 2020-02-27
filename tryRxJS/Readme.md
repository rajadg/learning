
# 1. RxJS - Reactive Extensions Library for JavaScript

RxJS *(Reactive Extensions for JavaScript)* is a library for reactive programming using Observables, to make it easier to compose asynchronous or callback-based code. 

<!-- TOC -->

- [1. RxJS - Reactive Extensions Library for JavaScript](#1-rxjs---reactive-extensions-library-for-javascript)
- [2. Concepts](#2-concepts)
  - [2.1. Observables](#21-observables)
  - [2.2. Operators](#22-operators)
    - [2.2.1. Pipeable Operators](#221-pipeable-operators)
    - [2.2.2. Creation Operators](#222-creation-operators)
  - [2.3. Subscriptions](#23-subscriptions)
  - [2.4. Subjects](#24-subjects)
  - [2.5. Scheduler](#25-scheduler)
- [4. Advanced](#4-advanced)
  - [4.1. Ajax](#41-ajax)
  - [4.2 RxJS Operators in more detail](#42-rxjs-operators-in-more-detail)

---

# 2. Concepts
The **Observable** is the foundation for the RxJS library. The essential concepts in RxJS are:
 * Observables
 * Operators
   * Pipeable Operators
   * Creation Operators
 * Subscriptions
 * Subjects
 * Scheduler

## 2.1. Observables
 - Observables are lazy Push collections of multiple values. Observables are declarative—that is, you define a function for publishing values, but it is not executed until a consumer subscribes to it. The subscribed consumer then receives notifications until the function completes, or until they unsubscribe.
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
observable.subscribe(
  data => console.log(`data: ${data}`),
  err => console.error(`Error: ${err}`),
  () => console.log("complete")
);
```

## 2.2. Operators
Operators are functions. There are two kinds of operators:

### 2.2.1. Pipeable Operators
A Pipeable Operator is a function that takes an Observable as its input and returns another Observable(called output observable). It is a pure operation: the previous Observable stays unmodified. Subscribing to the output Observable will also subscribe to the input Observable.
For example:
```javascript
const { of } = require("rxjs");
const { first } = require("rxjs/operators");
const input = of(1, 2 ,3);
const output = first()(input);
output.subscribe(
  data => console.log(`data: ${data}`),
  err => console.error(`Error: ${err}`),
  () => console.log("complete")
);
```
There are two ways to apply an operator:
* The first approach is good if apply single operator. If we apply multiple operators, this will get complex.
    ```javascript
    const input = of(1, 2 ,3, 4, 5);
    const example1 = map(x => x * x)(input);
    const example2 = take(3)(map(x => x * x)(input));
    ```
* The second approach uses the pipe method. This approach makes piping multiple operators easier.
    ```javascript
    const input = of(1, 2 ,3, 4, 5);
    const example1 = input.pipe(map(x => x*x));
    const example2 = input.pipe(map(x => x*x), take(4));
    ```
The list of pipeable operators can be found in https://www.learnrxjs.io/learn-rxjs/operators
Examples: `first`, `last`, `take`, `map`, `concat`, `merge`, `find`, `filter`, `skip`, `single`, `toArray`, etc

### 2.2.2. Creation Operators
Creation Operators are the other kind of operator, which can be called as standalone functions to create a new Observable. The creation operators typically take an input (not an observable) and then return an Observable. For example: `of(1, 2, 3)` creates an observable that will emit 1, 2, and 3, one right after another.
```javascript
const { of } = require("rxjs");
const observable = of(1, 2 ,3, 4, 5);
observable.subscribe(
  data => console.log(`data: ${data}`),
  err => console.error(`Error: ${err}`),
  () => console.log("complete")
);
```

## 2.3. Subscriptions
A Subscription essentially just has an unsubscribe() function to release resources or cancel Observable executions.
```javascript
const { interval } = require("rxjs");
const observable = interval(400);
const subscription = observable.subscribe(
  data => console.log(`data: ${data}`),
  err => console.error(`Error: ${err}`),
  () => console.log("complete")
);
setTimeout(() => {
  subscription.unsubscribe();
}, 2100);
```
We can also add / combine multiple subscriptions into a single subscription so that we can cancel all subscriptions in a single `unsubscribe` call.

## 2.4. Subjects
A Subject is like an Observable, but can multicast to many Observers. Subjects are like EventEmitters: they maintain a registry of many listeners.
An observer cannot distinguish between a subject or observable. The `Subject.subscribe()` simply registers the given Observer in a list of Observers, similarly to how `addListener` usually works in other libraries and languages.

```javascript
const { Subject, from } = require("rxjs");
const subject = new Subject();
subject.subscribe((v) => console.log(`observerA: ${v}`));
subject.subscribe((v) => console.log(`observerB: ${v}`));
const observable = from([1, 2, 3]);
observable.subscribe(subject);
```
We can use subjects when we have one observable, but more than one listener that want to listen to this observable. There are also  variants of Subject like `BehaviorSubject`, `ReplaySubject`, `AsyncSubject`.

## 2.5. Scheduler
A Scheduler lets you define in what execution context will an Observable deliver notifications to its Observer. For example, the asyncScheduler is a creation operator which will ensure the notifications to observer is sent at a later time.
```javascript
const { of, asyncScheduler } = require("rxjs");
const { observeOn } = require("rxjs/operators");
const observable = of(1, 2, 3, 4, 5).pipe(observeOn(asyncScheduler));
console.log(`Before calling subscribe...`);
observable.subscribe(
  data => console.log(`data: ${data}`),
  err => console.error(`Error: ${err}`),
  () => console.log("complete")
);
console.log(`After calling subscribe.`);
```
In the above example, the `asyncScheduler` operates with a `setTimeout` or `setInterval`, even if the given delay was zero. In JavaScript, `setTimeout(fn, 0)` is known to run the function `fn` earliest on the next event loop iteration.

There are also other schedulers like: ``queueScheduler``, `asapScheduler`, `asyncScheduler`, `animationFrameScheduler`.

Many static creation operators (like `of`, `from`, `timer`, etc) take a scheduler as an argument. So if we do not pass a scheduler the values are emitted immediately (when `subscribe` method is called), but if a scheduler is provided, then the values are emitted based on the given scheduler.

# 4. Advanced
There are many operators in RxJS. Some of the usefule operators are explained in this section.

## 4.1. Ajax
RxJS Ajax operators are not directly used in Angular applications. But if we need to create a nodejs based POC to check some RxJS operator code that makes http requests, then we can try this with Ajax library to make http requests.
```javascript
const { XMLHttpRequest } = require("xmlhttprequest");
const { ajax } = require("rxjs/ajax");
const observable = ajax({
  createXHR: () => new XMLHttpRequest(),
  url: "http://localhost:8080/books/2044",
  crossDomain: true
});
observable.subscribe(data => console.log(data.response));
```
In the above  example, we need to pass additional parameters `createXHR: () => new XMLHttpRequest()` and `crossDomain: true` in the `AjaxRequest` object to ensure the call is not blocked by CORS restrictions.

The method `ajax()` takes an `AjaxRequest` object as input (which can have url, method, headers, body, etc) and will return an observable. We can subscribe to this observable to receive the response:
```javascript
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
```

## 4.2 RxJS Operators in more detail

* How to create a simple observable => [Observable](./detailed/observable.md)
* List of commonly used creation operators => [Basic Creation Operators](./detailed/creationBasic.md)