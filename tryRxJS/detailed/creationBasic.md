# Creation Operators

A creation operator is used to create an observable from a value. The value can be a string, number, array, object, etc. We will consider the following operators:
* from
* of
* empty
* defer
* range
* generate
* timer

---

# 1. `from` operator
Turn an array, promise, or iterable into an observable. We can create an observable from any of the following items:
* array
* empty array
* string
* promise


### 1.1 Observable `from` array
If we pass an array, then the observable will emit each value in the array one by one and then notify completion.
```javascript
const { from } = require("rxjs");
const myObservable = from([1, 2, 3]);
logger.debug(`Created a new observable`);
myObservable.subscribe(
    data => logger.debug(`data: ${data}`),
    err => logger.error(`Error: ${err}`),
    () => logger.debug("complete")
);
logger.debug(`Subscribed to observable`);
```

#### Output
```
Created a new observable
data: 1
data: 2
data: 3
complete
Subscribed to observable
```

### 1.2 Observable `from` empty array
If we pass empty array, only completion will be notified.
```javascript
const { from } = require("rxjs");
const myObservable = from([]);
logger.debug(`Created a new observable`);
myObservable.subscribe(
    data => logger.debug(`data: ${data}`),
    err => logger.error(`Error: ${err}`),
    () => logger.debug("complete")
);
logger.debug(`Subscribed to observable`);
```

#### Output
```
Created a new observable
complete
Subscribed to observable
```

### 1.3 Observable `from` string
If we pass a string, it will be considered as iterable (like array). So the observable will emit each character one by one and then notify completion.
```javascript
const { from } = require("rxjs");
const myObservable = from('ABCDE');
logger.debug(`Created a new observable`);
myObservable.subscribe(
    data => logger.debug(`data: ${data}`),
    err => logger.error(`Error: ${err}`),
    () => logger.debug("complete")
);
logger.debug(`Subscribed to observable`);
```

#### Output
```
Created a new observable
data: A
data: B
data: C
data: D
data: E
complete
Subscribed to observable
```

### 1.4 Observable `from` Promise
 If we pass a promise, the resolved data will be emitted as value and then notify completion.

 ```javascript
const { from } = require("rxjs");
const myObservable = from(new Promise(resolve => resolve('Hello World!')));
logger.debug(`Created a new observable`);
myObservable.subscribe(
    data => logger.debug(`data: ${data}`),
    err => logger.error(`Error: ${err}`),
    () => logger.debug("complete")
);
logger.debug(`Subscribed to observable`);
```

#### Output
```
Created a new observable
Subscribed to observable
data: Hello World!
complete
```

---

# 2. `of` operator
Turn a sequence of values into an observable. The of operator takes multiple arguments. Each argument is emitted one by one and then notifies of completion.

##### Syntax
> of(arg1, arg2, arg3, ...)

#### Example
```javascript
const { of } = require("rxjs");
const myObservable = of(1, 2, 3, 4);
logger.debug(`Created a new observable`);
myObservable.subscribe(
    data => logger.debug(`data: ${data}`),
    err => logger.error(`Error: ${err}`),
    () => logger.debug("complete")
);
logger.debug(`Subscribed to observable`);
```

##### Output
```Created a new observable
data: 1
data: 2
data: 3
data: 4
complete
Subscribed to observable
```

---

# 3. `empty` operator
Creates an Observable that emits no items to the Observer and immediately emits a complete notification.

#### Example
```javascript
const { empty } = require("rxjs");
const myObservable = empty();
logger.debug(`Created a new observable`);
myObservable.subscribe(
    data => logger.debug(`data: ${data}`),
    err => logger.error(`Error: ${err}`),
    () => logger.debug("complete")
);
logger.debug(`Subscribed to observable`);
```

##### Output
```
Created a new observable
complete
Subscribed to observable
```

### Using `EMPTY` constant
Instead of `empty` operator we can also use the `EMPTY` constant.
#### Example 2
```javascript
const { EMPTY } = require("rxjs");
logger.debug(`Importing and Subscribing to EMPTY observable`);
EMPTY.subscribe(
    data => logger.debug(`data: ${data}`),
    err => logger.error(`Error: ${err}`),
    () => logger.debug("complete")
);
logger.debug(`Subscribed to observable`);
```

#### Output
```
Importing and Subscribing to EMPTY observable
complete
Subscribed to observable
```

---

# 4. `defer` operator
Creates an Observable that, on subscribe, calls an Observable factory to make an Observable for each new Observer.
We can use the defer operator to ensure that the subscribe method does not emit events event before the subscribe method is called.

#### Example
```javascript
const { of, defer } = require("rxjs");
let start = 0;
const myObservable = defer (() => of(start + 1, start + 2, start + 3));
logger.debug(`Created a observable using defer, of operators`);
start = 3;
myObservable.subscribe(
    data => logger.debug(`data: ${data}`),
    err => logger.error(`Error: ${err}`),
    () => logger.debug("complete")
);
logger.debug(`Subscribed to observable`);
```

#### Output
```
Created a observable using defer, of operators
data: 4
data: 5
data: 6
complete
Subscribed to observable
```

The same example without a defer operator will give a different output:
#### Example
```javascript
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
```

#### Output
```
Created a observable using of operator
data: 1
data: 2
data: 3
complete
Subscribed to observable
```

---

# 5. `range` operator
Creates an Observable that emits a sequence of numbers within a specified range.

If we want to emit from 1 to 100, then creating a an array with 100 values and emiting using a `from` operator is cumbersome. Instead we can simply use `range(1, 100)`.

### Example
```javascript
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
```

#### Output
```
Created a observable using range operator
data: 0
data: 1
data: 2
data: 3
complete
Subscribed to observable
```

---

# 6. `generate` operator
Generates an observable sequence by running a state-driven loop producing the sequence's elements, using the specified scheduler to send out observer messages

We can use the generate operator like a simple for-loop emiting numbers asynchronously like this:
### Example
```javascript
const { generate } = require("rxjs");
const myObservable = generate(0, x => x < 5, x => x + 1);
logger.debug(`Created a observable using range operator`);
myObservable.subscribe(
    data => logger.debug(`data: ${data}`),
    err => logger.error(`Error: ${err}`),
    () => logger.debug("complete")
);
logger.debug(`Subscribed to observable`);
```

#### Output
```
Created a observable using range operator
data: 0
data: 1
data: 2
data: 3
data: 4
complete
Subscribed to observable
```

We can also add a custom function to generate a different value at each iteration like this:

### Example
```javascript
const { generate } = require("rxjs");
const myObservable = generate(
    0,
    x => x < 5,
    x => x + 1,
    x => ('*').repeat(x));
logger.debug(`Created a observable using range operator`);
myObservable.subscribe(
    data => logger.debug(`data: ${data}`),
    err => logger.error(`Error: ${err}`),
    () => logger.debug("complete")
);
logger.debug(`Subscribed to observable`);
```

#### Output
```
Created a observable using range operator
data: 
data: *
data: **
data: ***
data: ****
complete
Subscribed to observable
```

---