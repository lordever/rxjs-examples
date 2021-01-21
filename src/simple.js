const { of, fromEvent } = require('rxjs');
const { map, take } = require('rxjs/operators');

//Создание потока, в котором происходит преобразование чисел
// of(1, 2, 3)
//     .pipe(map(x => x ** 2))
//     .subscribe((v) => {
//         console.log(v);
//     });

const btnExample = document.getElementById("btn_simple")

//На каждый клик создаётся поток. По нажатию на кнопку 5 раз, 
fromEvent(btnExample, "click")
    .pipe(take(5))
    .subscribe(() => {
        console.log("Click");
    });