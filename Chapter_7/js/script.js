'use strict';

// -------------Флаги и дескрипторы свойств-------------

let obj = {
    name: 'someName',
}

console.log(Object.getOwnPropertyDescriptor(obj, 'name'));

// -------------Свойства - геттеры и сеттеры-------------

function CreateUser (name, bithday) {
    this.name = name;
    this.bithday = bithday;
    Object.defineProperty(this, 'age', {
        get(){
            let today = new Date().getFullYear();
            return today - this.bithday.getFullYear();
        }
    });
}

let Kirill = new CreateUser('Kirill', new Date(1992, 3, 15));
console.log(Kirill.age);

// -------------Прототипное наследование-------------

let animal = {
    eats: true,
    walk() {
      console.log(this.name);
    }
  };
  
  let rabbit = {
    name: 'rabbit',
    jumps: true,
    __proto__: animal
  };
  
  // walk взят из прототипа
  rabbit.walk(); // Animal walk


// У нас есть объекты:

// let head = {
//   glasses: 1
// };

// let table = {
//   pen: 3
// };

// let bed = {
//   sheet: 1,
//   pillow: 2
// };

// let pockets = {
//   money: 2000
// };

// С помощью свойства __proto__ задайте прототипы так, чтобы поиск любого свойства выполнялся по следующему пути: pockets → bed → table → head. 
// Например, pockets.pen должно возвращать значение 3 (найденное в table), а bed.glasses – значение 1 (найденное в head).
// Ответьте на вопрос: как быстрее получить значение glasses – через pockets.glasses или через head.glasses? При необходимости составьте цепочки поиска и сравните их.


let head = {
    glasses: 1
  };
  
  let table = {
    pen: 3,
    __proto__: head,
  };
  
  let bed = {
    sheet: 1,
    pillow: 2,
    __proto__: table,
  };
  
  let pockets = {
    money: 2000,
    __proto__: bed,
  };

  console.log(pockets.glasses);


// -------------F.prototype-------------

// Представьте, что у нас имеется некий объект obj, созданный функцией-конструктором – мы не знаем какой именно, но хотелось бы создать ещё один объект такого же типа.

// Можем ли мы сделать так?

// let obj2 = new obj.constructor();
// Приведите пример функции-конструктора для объекта obj, с которой такой вызов корректно сработает. И пример функции-конструктора, с которой такой код поведёт себя неправильно.

function ObjCreate (name) {
    this.name = name;
}

ObjCreate.prototype = {
    // constructor: ObjCreate,
    age: 13,
};

let obj = new ObjCreate('Test');
let obj2 = new obj.constructor('New Test');

console.log(obj2.name);

// -------------Встроенные прототипы-------------

// Добавьте всем функциям в прототип метод defer(ms), который вызывает функции через ms миллисекунд.

Function.prototype.defer = function (ms) {setTimeout(this, ms)}; 

function f() {
    console.log("Hello!");
}
  
  f.defer(1000);

//   Добавьте всем функциям в прототип метод defer(ms), 
// который возвращает обёртку, откладывающую вызов функции на ms миллисекунд.

Function.prototype.defer = function (ms) {
    let f = this;
    return function (...args) {
        setTimeout(() => f.call(this , ...args), ms);
    }
}

function f(a, b) {
    console.log( a + b );
}
  
  f.defer(1000)(1, 2);

// -------------Методы прототипов, объекты без свойства __proto__-------------

// Имеется объект dictionary, созданный с помощью Object.create(null) для хранения любых пар ключ/значение.

// Добавьте ему метод dictionary.toString(), который должен возвращать список ключей, разделённых запятой. 
// Ваш toString не должен выводиться при итерации объекта с помощью цикла for..in.

let dictionary = Object.create(null);

// ваш код, который добавляет метод dictionary.toString
Object.defineProperty(dictionary, 'toString', {
    value: function () {
        return Object.keys(this).join(', ');
    },
});

// добавляем немного данных
dictionary.apple = "Apple";
dictionary.__proto__ = "test"; // здесь __proto__ -- это обычный ключ

// только apple и __proto__ выведены в цикле
// for(let key in dictionary) {
//     console.log(key); // "apple", затем "__proto__"
// }

// ваш метод toString в действии
console.log(String(dictionary)); // "apple,__proto__"


