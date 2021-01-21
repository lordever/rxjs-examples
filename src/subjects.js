const { Subject, from } = require("rxjs");

/*
* В приведенном ниже примере у нас есть два наблюдателя, прикрепленных к Subject, 
* и мы вводим некоторые значения:
*/
const subject_1 = new Subject();

// subject_1.subscribe({
//     next: (v) => console.log(`observerA: ${v}`)
// });
// subject_1.subscribe({
//     next: (v) => console.log(`observerB: ${v}`)
// });

subject_1.next(1);
subject_1.next(2);

// Logs:
// observerA: 1
// observerB: 1
// observerA: 2
// observerB: 2

/**
 * Поскольку Subject является Observer, это также означает,
 * что вы можете предоставить Subject в качестве аргумента
 * для subscribeлюбого Observable, как показано в примере ниже:
 */

const subject_2 = new Subject();

// subject_2.subscribe({
//     next: (v) => console.log(`observerA: ${v}`)
// });
// subject_2.subscribe({
//     next: (v) => console.log(`observerB: ${v}`)
// });

const observable = from([1, 2, 3]);

observable.subscribe(subject_2); // You can subscribe providing a Subject

// Logs:
// observerA: 1
// observerB: 1
// observerA: 2
// observerB: 2
// observerA: 3
// observerB: 3

// -----------------------------------------

//Behaviour subject
/**
 * В примере BehaviorSubject инициализируется значением,
 * которое первый Observer получает при подписке. Второй Observer
 * получает значение, даже если он подписался после того, как значение было отправлено.
 */
const { BehaviorSubject } = require("rxjs");

const subject = new BehaviorSubject(0);

// subject.subscribe({
//     next: (v) => console.log(`observerA: ${v}`)
// });

subject.next(1);
subject.next(2);

// subject.subscribe({
//     next: (v) => console.log(`observerB: ${v}`)
// });

subject.next(3);

// Logs
// observerA: 0
// observerA: 1
// observerA: 2
// observerB: 2
// observerA: 3
// observerB: 3

// -----------------------------------------

//Replay subject

const { ReplaySubject } = require("rxjs");

const replaySubject = new ReplaySubject(3);

// replaySubject.subscribe({
//     next: (v) => console.log(`observerA: ${v}`)
// });

replaySubject.next(1);
replaySubject.next(2);
replaySubject.next(3);
replaySubject.next(4);

// replaySubject.subscribe({
//     next: (v) => console.log(`observerB: ${v}`)
// });

replaySubject.next(5);

// Logs:
// observerA: 1
// observerA: 2
// observerA: 3
// observerA: 4
// observerB: 2
// observerB: 3
// observerB: 4
// observerA: 5
// observerB: 5

// -----------------------------------------
/**
 * AsyncSubject - это вариант, в котором только последнее значение 
 * выполнения Observable отправляется его наблюдателям и только 
 * после завершения выполнения.
 */
const { AsyncSubject } = require("rxjs");

const asyncSubject = new AsyncSubject();

asyncSubject.subscribe({
    next: (v) => console.log(`observerA: ${v}`)
});

asyncSubject.next(1);
asyncSubject.next(2);
asyncSubject.next(3);
asyncSubject.next(4);

asyncSubject.subscribe({
    next: (v) => console.log(`observerB: ${v}`)
});

asyncSubject.next(5);
asyncSubject.complete();

// Logs:
// observerA: 5
// observerB: 5



