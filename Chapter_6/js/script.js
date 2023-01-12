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

// ------Планирование: setTimeout и setInterval-------

// Напишите функцию printNumbers(from, to), которая выводит число каждую секунду, начиная от from и заканчивая to.

// Сделайте два варианта решения.

// Используя setInterval.
// Используя рекурсивный setTimeout.

// ---------------1------------------

function printNumbers(from, to) {
    let current = from;
    
    let timer = setInterval(()=>{
        console.log(current);
        if (current == to) {
            clearInterval(timer);
        }
        current++;
    }, 1000);
}

printNumbers(1, 8);

// ---------------2------------------


function printNumbers(from, to) {
    let current = from;
    let timer = setTimeout(function plus () {
        console.log(current);
        current++;
        if (current <= to) {
            setTimeout(plus, 1000);
        }
    }, 1000);
}

printNumbers(1, 8);



// ------Декораторы и переадресация вызова, call/apply-------


// Создайте декоратор spy(func), который должен возвращать обёртку, которая сохраняет все вызовы функции в своём свойстве calls.

// Каждый вызов должен сохраняться как массив аргументов.

function work(a, b) {
    console.log( a + b ); // произвольная функция или метод
  }
  
  work = spy(work);
  
  work(1, 2); // 3
  work(4, 5); // 9
  
  console.log(work.calls);
  for (let args of work.calls) {
    console.log( 'call:' + args.join() ); // "call:1,2", "call:4,5"
  }

function spy(func) {
    function wrapper () {
        wrapper.calls.push(Array.from(arguments));
        return func.apply(this, arguments);
    };
    wrapper.calls = [];

    return wrapper;
}

// Создайте декоратор delay(f, ms), который задерживает каждый вызов f на ms миллисекунд.

function delay(f, ms) {
    return function wrapper () {
        setTimeout(() => f.apply(this, arguments), ms);
    }
}

function f(x) {
    console.log(x);
  }
  
  // создаём обёртки
  let f1000 = delay(f, 1000);
  let f1500 = delay(f, 1500);
  
  f1000("test"); // показывает "test" после 1000 мс
  f1500("test");

//   Результатом декоратора debounce(f, ms) должна быть обёртка, которая передаёт вызов f не более одного раза в ms миллисекунд. 
//   Другими словами, когда мы вызываем debounce, это гарантирует, что все остальные вызовы будут игнорироваться в течение ms.

function debounce(f, ms) {
    let calldown = false;
    return function () {
        if (calldown) return;
        f.apply(this, arguments);
        calldown = true;
        setTimeout(() => calldown = false, ms);
    }
}

// Создайте «тормозящий» декоратор throttle(f, ms), который возвращает обёртку, передавая вызов в f не более одного раза в ms миллисекунд. 
// Те вызовы, которые попадают в период «торможения», игнорируются.

function throttle(f, ms) {
    let calldown = false,
        argumentsSaved,
        thisSaved;
    return function () {
        if (calldown) {
            argumentsSaved = arguments;
            thisSaved = this;
            return;
        };
        f.apply(this, arguments);
        calldown = true;
        setTimeout(() => {
            calldown = false;
            if (argumentsSaved && thisSaved) f.apply(thisSaved, argumentsSaved);
            argumentsSaved = thisSaved = null;
        }, ms);
    }
}

function f(a) {
    console.log(a)
  }
  
  // f1000 передаёт вызовы f максимум раз в 1000 мс
  let f1000 = throttle(f, 1000);
  
  f1000(1); // показывает 1
  f1000(2); // (ограничение, 1000 мс ещё нет)
  f1000(3); // (ограничение, 1000 мс ещё нет)


// ------Привязка контекста к функции-------

let bound = func.bind(context, [arg1], [arg2], ...);

let user = {
    name: 'Kirill'
};
let userIvan = {
    firstName: 'Ivan',
    sendMessage (time, from, text) {
        return {
            time,
            from,
            to: this.firstName,
            text,
        };
    }
};

function partial (f, ...args) {
    return function(...argsMethod) {
        return f.call(this, ...args, ...argsMethod);
    }
}

userIvan.newMassage = partial(userIvan.sendMessage, `${new Date().getHours()} : ${new Date().getMinutes()}`);

console.log(userIvan.newMassage(user.name, 'Hello'));
















