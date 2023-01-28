'use strict';

document.body.style.background = "red";

setTimeout (() => document.body.style.background = "black", 1000);

console.log(navigator.platform);

console.log(document.body.firstElementChild);

console.log(document.body.children[1]);

console.log(document.body.children[1].lastElementChild);


// Напишите код, который выделит красным цветом все ячейки в таблице по диагонали.

let table = document.body.firstElementChild;

for (let i = 0; i < table.rows.length; i++) {
    table.rows[i].cells[i].style.backgroundColor = 'red';
}