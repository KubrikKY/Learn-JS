'use strict';

document.body.style.background = "red";

setTimeout (() => document.body.style.background = "white", 1000);

console.log(navigator.platform);

console.log(document.body.firstElementChild);

console.log(document.body.children[1]);

console.log(document.body.children[1].lastElementChild);


// Напишите код, который выделит красным цветом все ячейки в таблице по диагонали.

let table = document.body.firstElementChild;

for (let i = 0; i < table.rows.length; i++) {
    table.rows[i].cells[i].style.backgroundColor = 'red';
}

// У нас есть дерево, структурированное как вложенные списки ul/li.

// Напишите код, который выведет каждый элемент списка <li>:

// Какой в нём текст (без поддерева) ?
// Какое число потомков – всех вложенных <li> (включая глубоко вложенные) ?

let ul = document.querySelectorAll('ul');


ul.forEach(i => {
    i.insertAdjacentHTML('afterbegin', '<p>AFTERBEGIN</p>');
});

let div = document.createElement('div');
  div.innerHTML = "<strong>Всем привет!</strong> Вы прочитали важное сообщение.";

  ul.forEach(i => {
    i.append(div);
  setTimeout(() => div.remove(), 4000);
});
  




function clear(elem) {
    let e = document.querySelector(elem);

    e.innerHTML = '';
}

  clear('.list'); // очищает список

// for (let e of li) {
//     console.log(e);
// }

let menu = document.querySelector('[data-widget-name]');

console.log(menu.dataset.widgetName);

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



// function createTreeTwo(container, data) {
//     function f (data) {
//         let li = '',
//             ul;
//         for (let key in data) {
//             li += '<li>' + key + '</li>';
//         }

//         return ul || '';
//     }
//     container.innerHTML = f(data);
    
// }


// let container2 = document.querySelector('#container2');
// createTreeTwo(container2, obj); // создаёт дерево в контейнере