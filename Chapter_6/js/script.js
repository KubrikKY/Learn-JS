'use strict';

// ------Рекурсия и стек-------

// Напишите функцию sumTo(n), которая вычисляет сумму чисел 1 + 2 + ... + n.

// Сделайте 2 варианта решения:

// С использованием цикла.
// Через рекурсию, т.к. sumTo(n) = n + sumTo(n-1) for n > 1.


// --------------1--------------

function sumTo(n) {
    let sum = 0;
    for (let i = 0; i <= n; i++) {
        sum += i;
    }

    return sum;
}

console.log (sumTo(3));


// -------------2--------------
function sumTo(n) {
    if (n <= 1) return n;
    return n + sumTo(n - 1);
}

console.log (sumTo(4));



// Задача – написать функцию factorial(n), которая возвращает n!, используя рекурсию.


// ----------1-----------
function factorial(n) {
    let fac = 1;
    for (let i = 1; i <= n; i++) {
        fac *= i;
    }
    return fac;
}
console.log(factorial(4));

// ----------2-----------
function factorial(n) {
    if (n <= 1) return n;
    return n * factorial(n - 1);
}

console.log(factorial(4));


// Допустим, у нас есть односвязный список (как описано в главе Рекурсия и стек):
let list = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3,
      next: {
        value: 4,
        next: null
      }
    }
  }
};
// Напишите функцию printList(list), которая выводит элементы списка по одному.

function printList(list) {

    console.log(list.value);
    if (list.next) {
        return printList(list.next);
    };

}

// printList(list);

// Выведите односвязный список из предыдущего задания Вывод односвязного списка в обратном порядке.

function reversePrintList(list) {

    if (list.next) {
        reversePrintList(list.next);
    }
    console.log(list.value);
}

reversePrintList(list);




// ------Замыкание-------


// Напишите функцию sum, которая работает таким образом: sum(a)(b) = a+b.


function sum (a) {
    return function (b) {
        return a + b;
    };
}

console.log(sum(5)(10));


// У нас есть встроенный метод arr.filter(f) для массивов. Он фильтрует все элементы с помощью функции f. Если она возвращает true, то элемент добавится в возвращаемый массив.

// Сделайте набор «готовых к употреблению» фильтров:

// inBetween(a, b) – между a и b (включительно).
// inArray([...]) – находится в данном массиве.
// Они должны использоваться таким образом:

// arr.filter(inBetween(3,6)) – выбирает только значения между 3 и 6 (включительно).
// arr.filter(inArray([1,2,3])) – выбирает только элементы, совпадающие с одним из элементов массива

function inBetween (a, b) {
    return function (item) {
        return (item >= a && item <= b)? true: false;
    };
}

function inArray (arr) {
    return function (item) {
        return arr.includes(item);
    };
}

let arr = [1, 2, 3, 4, 5, 6, 7];

console.log( arr.filter(inBetween(3, 6)) ); // 3,4,5,6

console.log( arr.filter(inArray([1, 2, 10])) ); // 1,2

// У нас есть массив объектов, который нужно отсортировать:

let users = [
  { name: "John", age: 20, surname: "Johnson" },
  { name: "Pete", age: 18, surname: "Peterson" },
  { name: "Ann", age: 19, surname: "Hathaway" }
];
// Обычный способ был бы таким:

// // по имени (Ann, John, Pete)
// users.sort((a, b) => a.name > b.name ? 1 : -1);

// // по возрасту (Pete, Ann, John)
// users.sort((a, b) => a.age > b.age ? 1 : -1);
// Можем ли мы сделать его короче, например вот таким?



users.sort(byField('name'));
console.log(users);
users.sort(byField('age'));
console.log(users);

// То есть чтобы вместо функции мы просто писали byField(fieldName).

// Напишите функцию byField, которая может быть использована для этого.

function byField(fieldName) {
    return function(a, b) {
        return a[fieldName] > b[fieldName] ? 1 : -1;
    };
}