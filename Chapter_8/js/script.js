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



