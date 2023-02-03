'use strict';

document.body.style.background = "red";

setTimeout (() => document.body.style.background = "white", 1000);

// Напишите код, который выделит красным цветом все ячейки в таблице по диагонали.

let table = document.body.firstElementChild;

for (let i = 0; i < table.rows.length; i++) {
    table.rows[i].cells[i].style.backgroundColor = 'red';
}

// У нас есть дерево, структурированное как вложенные списки ul/li.

// Напишите код, который выведет каждый элемент списка <li>:

// Какой в нём текст (без поддерева) ?
// Какое число потомков – всех вложенных <li> (включая глубоко вложенные) ?
  




function clear(elem) {
    let e = document.querySelector(elem);

    e.innerHTML = '';
}

  clear('.list'); // очищает список

// for (let e of li) {
//     console.log(e);
// }

let menu = document.querySelector('[data-widget-name]');


let a = document.querySelectorAll('a');

for (let link of a) {
    let href = link.getAttribute('href');

    if (!href) continue;

    if (!href.includes('://')) continue;

    if (href.startsWith('http://internal.com')) continue;

    link.style.color = 'orange';
}

function creatUl () {
    let ul = document.createElement('ul');
    document.body.append(ul);
    while (true) {
        let text = prompt('?', 0);
        if (!text) {
            break;
        }
        let li = document.createElement('li');
        li.textContent = text;
        ul.append(li);
    }
}

// creatUl();

let obj = {
    "Рыбы": {
      "форель": {},
      "лосось": {}
    },
  
    "Деревья": {
      "Огромные": {
        "секвойя": {},
        "дуб": {}
      },
      "Цветковые": {
        "яблоня": {},
        "магнолия": {}
      }
    }
  };

  console.log(Object.values(obj.Рыбы.лосось));


function createTree(container, data) {
    if (!Object.values(data).length) {
        return;
    }
    let ul = document.createElement('ul');
    container.append(ul);
    for (let [key, value] of Object.entries(data)) {
        let li = document.createElement('li');
        li.textContent = key;
        ul.append(li);
        if (typeof value == 'object') {
            createTree(li, value);
        }
    }
}

let container = document.querySelector('#container');
createTree(container, obj); // создаёт дерево в контейнере


// Есть дерево, организованное в виде вложенных списков ul/li.

// Напишите код, который добавит каждому элементу списка <li> количество вложенных в него элементов. Узлы нижнего уровня, без детей – пропускайте.

let animal = document.querySelectorAll('.animal-list ul');

for (let ul of animal) {
  if (ul.children.length == 0) {
    continue;
  }
  ul.previousSibling.data += `[${ul.children.length}]`;
}

// Напишите функцию createCalendar(elem, year, month).

// Вызов функции должен создать календарь для заданного месяца month в году year и вставить его в elem.

// Календарь должен быть таблицей, где неделя – это <tr>, а день – это <td>. У таблицы должен быть заголовок с названиями дней недели, каждый день – <th>, первым днём недели должен быть понедельник.

function createCalendar(elem, year, month) {
    let table = document.createElement('table'),
    date = new Date(year, month - 1),
    lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    table.innerHTML = '<table><tr><th>пн</th><th>вт</th><th>ср</th><th>чт</th><th>пт</th><th>сб</th><th>вс</th></tr><tr>';
    
    let currentDay = date;
    for (let i = 0; i < getDay(currentDay); i++) {
      let td = document.createElement('td');
      td.innerHTML = ' ';
      table.firstElementChild.lastElementChild.append(td);
    };

    for (let i = 1; i <= lastDay.getDate(); i++){
      let td = document.createElement('td'),
      tr = document.createElement('tr');
      td.textContent = i;
      table.firstElementChild.lastElementChild.append(td);
      currentDay.setDate(i);
      if (getDay(currentDay) == 6) {
        table.firstElementChild.append(tr);
      }
    }
    elem.append(table);

    function getDay(date) { // получить номер дня недели, от 0 (пн) до 6 (вс)
      let day = date.getDay();
      if (day == 0) day = 7; // сделать воскресенье (0) последним днем
      return day - 1;
    }
}

let cal = document.querySelector('.cal');

createCalendar(cal, 2012, 8);

// Напишите код для вставки <li>2</li><li>3</li> между этими двумя <li>:

// <ul id="ul">
//   <li id="one">1</li> 
//   <li id="two">4</li>
// </ul>

let one = document.querySelector('#one').textContent;
let two = document.querySelector('#two');

while (one < two.textContent - 1) {
  let li = document.createElement('li');
  li.textContent = ++one;
  two.before(li);
}

let tableSort = document.querySelector('#sort tbody'),
tableTr = tableSort.querySelectorAll('tr');

let arr = [...tableTr].slice(1);

arr.sort((a, b) => a.firstElementChild.textContent > b.firstElementChild.textContent ? 1: -1);

tableSort.append(...arr);

console.log(window.innerWidth - document.documentElement.clientWidth);

let scrollHeight = Math.max(
  document.body.scrollHeight, document.documentElement.scrollHeight,
  document.body.offsetHeight, document.documentElement.offsetHeight,
  document.body.clientHeight, document.documentElement.clientHeight
);

console.log('Полная высота документа с прокручиваемой частью: ' + scrollHeight);

// let scrollTop;
// let i = 0;

// let timer  = setTimeout(function t () {
//   scrollTop = window.pageYOffset;
//   console.log('Текущая прокрутка сверху: ' + scrollTop);
//   if (i < 10) {
//     i++;
//     setTimeout (t, 1000);
//   }
// }, 1000);
// console.log('Текущая прокрутка слева: ' + scrollTop);

let position = two.getBoundingClientRect();
let n = 0;

let time  = setTimeout(function t () {
  position = two.getBoundingClientRect();
  console.log('Текущие координаты элемента: ' + position.left + '/' + position.bottom);
  if (n < 10) {
    n++;
    setTimeout (t, 1000);
  }
}, 1000);