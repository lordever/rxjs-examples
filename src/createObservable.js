const { Observable, of } = require('rxjs');

//Создание observable
const foo = new Observable(subscriber => {
    console.log('Hello');
    subscriber.next(42);
    //Условие сработает с 50% вероятностью
    if (Math.random(1) > 0.5) {
        subscriber.error(100);
    }
    subscriber.next(200);
    setTimeout(() => {
        // ассинхронная операция
        subscriber.next(300);
        subscriber.complete();
        // Вызов не будет совершён после закрытия потока
        subscriber.next(400);
    }, 1000);
});

// console.log('before');
// foo.subscribe(x => {
//     //next
//     console.log(x);
// }, () => {
//     //error - поток завершён
//     console.error("Error!");
// }, () => {
//     //complete
//     console.log("Observable was completed")
// });
// console.log('after');


const observable = of([10, 20, 30]);
//Сохранение инстанста observable 
// const subscription = observable.subscribe(x => console.log(x));

// Later: отписка уничтожает observable
// subscription.unsubscribe();

const customObservable = new Observable(function subscribe(subscriber) {
    const intervalId = setInterval(() => {
        subscriber.next('hi');
    }, 1000);

    //Выполняется в момент отписки 
    return function unsubscribe() {
        console.log("Отписка")
        clearInterval(intervalId);
    };
});

// const customSubscription = customObservable.subscribe((value) => console.log(value));

//Отписка при нажатии на кнопку
const btnUnsubscribe = document.getElementById("btn_unsubscribe");
btnUnsubscribe.addEventListener("click", () => {
    customSubscription.unsubscribe();
});