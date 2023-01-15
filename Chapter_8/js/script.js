'use strict';

// --------------Класс: базовый синтаксис-------------

class User {
    constructor(name) { this.name = name; }
    sayHi() { console.log(this.name); }
  }

// function User (name) {
//     this.name = name;
// }

// User.prototype.sayHi = function () {console.log(this.name)};

let user = new User('ivan');

user.sayHi();

class User {
  constructor (name) {
    this.name = name;
  }
  get name () {
    return this._name;
  }
  set name (value) {
    if (value.length < 4) {
      console.log("Имя короткое");
      return;
    }
    this._name = value;
  }
};

let user2 = new User('_');

console.log(user2.name);
// Класс Clock написан в функциональном стиле. Перепишите его, используя современный синтаксис классов.

class Clock {
  constructor ({ template }) {
    this.template = template;
  }

  render() {
    let date = new Date();

    let hours = date.getHours();
    if (hours < 10) hours = '0' + hours;

    let mins = date.getMinutes();
    if (mins < 10) mins = '0' + mins;

    let secs = date.getSeconds();
    if (secs < 10) secs = '0' + secs;

    let output = this.template
      .replace('h', hours)
      .replace('m', mins)
      .replace('s', secs);

    console.log(output);
  }

  stop () {
    clearInterval(this.timer);
  }

  start () {
    this.render();
    this.timer = setInterval(() => this.render(), 1000);
  }

}

let clock = new Clock({template: 'h:m:s'});
clock.start();


// У нас есть класс Clock. Сейчас он выводит время каждую секунду

// Создайте новый класс ExtendedClock, который будет наследоваться от Clock и добавьте параметр precision – количество миллисекунд между «тиками». Установите значение в 1000 (1 секунда) по умолчанию.

// Сохраните ваш код в файл extended-clock.js
// Не изменяйте класс clock.js. Расширьте его.

class Clock {
  constructor({ template }) {
    this.template = template;
  }

  render() {
    let date = new Date();

    let hours = date.getHours();
    if (hours < 10) hours = '0' + hours;

    let mins = date.getMinutes();
    if (mins < 10) mins = '0' + mins;

    let secs = date.getSeconds();
    if (secs < 10) secs = '0' + secs;

    let output = this.template
      .replace('h', hours)
      .replace('m', mins)
      .replace('s', secs);

    console.log(output);
  }

  stop() {
    clearInterval(this.timer);
  }

  start() {
    this.render();
    this.timer = setInterval(() => this.render(), 1000);
  }
}

class ExtendedClock extends Clock{
  constructor (options) {
    super(options);
    this.ms = options.ms ? options.ms : 1000;
  }
  start() {
    this.render();
    this.timer = setInterval(() => this.render(), this.ms);
  }
}

let clock3000 = new ExtendedClock({template: 'h:m:s', ms: 3000});
clock3000.start();



// ----------------Примеси-------------


let sayHiMixin = {
  sayHi() {
    console.log(`Привет, ${this.name}`);
  },
  sayBye() {
    console.log(`Пока, ${this.name}`);
  }
};

// использование:
class User {
  constructor(name) {
    this.name = name;
  }
}

// копируем методы
Object.assign(User.prototype, sayHiMixin);

// теперь User может сказать Привет
let userVasya = new User("Вася");
userVasya.sayHi();

let eventMixin = {
  on (eventName, eventGo) {
    if (!this._eventHandler) this._eventHandler = {};
    if (!this._eventHandler[eventName]) this._eventHandler[eventName] = [];
    this._eventHandler[eventName].push(eventGo); 
  },

  off (eventName, eventGo) {
    let handlers = this._eventHandler && this._eventHandler[eventName];
    if (!handlers) return;

    for (let i = 0; i < handlers.length; i++) {
      if (handlers[i] = eventGo) {
        handlers.splice(i--, 1);
      }
    }
  },

  trigger (eventName, ...args) {
    if (!this._eventHandler || !this._eventHandler[eventName]) return;
    this._eventHandler[eventName].forEach(eventGo => {
      eventGo.apply(this, args);
    });
  }
}

class Menu {
  constructor (name) {
    this.name = name;
  }
  choose (value) {
    this.trigger('select', value);
  }
}

Object.assign(Menu.prototype, eventMixin);
