const { Observable, of } = require('rxjs');

//Операторы создания

// --------------------------------------------------

/**
 * Создает Observable, который начинает выдаёт результат после времени (первый аргумент),
 * затем выдает все возрастающие числа после каждого периода (второй аргумент).
 * https://rxjs-dev.firebaseapp.com/api/index/function/timer
 */
const { timer } = require("rxjs");

//Выдает возрастающие числа, по одному каждую секунду (1000 мс), начиная с 3 секунд
const numbers_1 = timer(3000, 1000);
// numbers_1.subscribe(x => console.log(x));

//Выдает одно число через пять секунд
const numbers_2 = timer(5000);
// numbers_2.subscribe(x => console.log(x));



// --------------------------------------------------

/**
 * Во время подписки решает, какой Observable будет подписан.
 * https://rxjs-dev.firebaseapp.com/api/index/function/iif
 */
const { iif } = require("rxjs");

//Изменить во время выполнения, на который Observable будет подписана
let subscribeToFirst;
const firstOrSecond = iif(() => subscribeToFirst, of('first'), of('second'),);

subscribeToFirst = true;
// firstOrSecond.subscribe(value => console.log(value));

// Logs:
// "first"

subscribeToFirst = false;
// firstOrSecond.subscribe(value => console.log(value));

// Logs:
// "second"

// --------------------------------------------------





/**
 * Операторы создания Observable, которые также имеют функцию соединения 
 * - выдачу значений из нескольких исходных Observable
 */


/**
 * Объединяет несколько Observable для создания Observable, 
 * значения которого вычисляются на основе последних значений каждого из его входных Observable.
 * https://rxjs-dev.firebaseapp.com/api/index/function/combineLatest
 */
const { combineLatest } = require("rxjs");

const firstTimer = timer(0, 1000); // emit 0, 1, 2... after every second, starting from now
const secondTimer = timer(500, 1000); // emit 0, 1, 2... after every second, starting 0,5s from now
const combinedTimers = combineLatest(firstTimer, secondTimer);
// combinedTimers.subscribe(value => console.log(value));


// --------------------------------------------------


//Операторы преобразования

/**
 * Проецирует каждое исходное значение в Observable, который 
 * объединяется с выходным Observable, выдавая значения только 
 * из самого последнего проецированного Observable.
 * https://rxjs-dev.firebaseapp.com/api/operators/switchMap
 */
const { switchMap } = require("rxjs/operators");

//Создать новый Observable в соответствии с исходными наблюдаемыми значениями
const switched = of(1, 2, 3)
    .pipe(
        switchMap((x) => of(x, x ** 2, x ** 3))
    );

// switched.subscribe(x => console.log(x));

// --------------------------------------------------

/**
 * Проецирует каждое исходное значение в Observable, 
 * который объединяется с выходным Observable.
 * https://rxjs-dev.firebaseapp.com/api/operators/mergeMap
 */
const { interval } = require("rxjs");
const { mergeMap, map } = require("rxjs/operators");

//Сопоставьте и сведите каждую букву к observable, тикающему каждую 1 секунду
const letters = of('a', 'b', 'c');
const result = letters.pipe(
    mergeMap(x => interval(1000).pipe(map(i => x + i))),
);
// result.subscribe(x => console.log(x));

// --------------------------------------------------

/**
 * Проецирует каждое исходное значение в Observable, 
 * который объединяется с выходным Observable сериализованным 
 * способом, ожидая завершения каждого из них перед объединением следующего.
 * https://rxjs-dev.firebaseapp.com/api/operators/concatMap
 */
const { fromEvent } = require("rxjs");
const { take, concatMap } = require("rxjs/operators");

//Для каждого события клика ставьте отметку каждую секунду от 0 до 3, без параллелизма
const clicks = fromEvent(document, 'click');
const concatMapResult = clicks.pipe(
    concatMap(ev => interval(1000).pipe(take(4)))
);
// concatMapResult.subscribe(x => console.log(x));


// --------------------------------------------------


//Утилитарные операторы

/**
 * Задерживает отправку элементов из источника Observable 
 * на заданный тайм-аут или до заданной даты.
 * https://rxjs-dev.firebaseapp.com/api/operators/delay
 */

//Задерживайте каждый щелчок на одну секунду
// const clickForDelay = fromEvent(document, 'click');
// const delayedClicks = clickForDelay.pipe(delay(1000)); // each click emitted after 1 second
// delayedClicks.subscribe(x => console.log(x));


//Как работает оператор delay внутри
function delay(delayInMillis) {
    return (observable) => new Observable(observer => {
        const allTimerIDs = new Set();
        const subscription = observable.subscribe({
            next(value) {
                const timerID = setTimeout(() => {
                    observer.next(value);
                    allTimerIDs.delete(timerID);
                }, delayInMillis);
                allTimerIDs.add(timerID);
            },
            error(err) {
                observer.error(err);
            },
            complete() {
                observer.complete();
            }
        });

        return () => {
            subscription.unsubscribe();
            allTimerIDs.forEach(timerID => {
                clearTimeout(timerID);
            });
        }
    });
}

//Возвращает рандомное число от 0 до 1
const observableWithDelay = new Observable(subscriber => {
    subscriber.next(Math.random(1));
});

// Нотификация после 5 секунд ожидания
// delay(5000)(observableWithDelay)
//     .subscribe((value) => { console.log(value) });;

