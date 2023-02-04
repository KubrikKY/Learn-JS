'use strict';

let field = document.getElementById('field'),
ball = document.getElementById('ball');

ball.style.position = 'absolute';

field.addEventListener('click', (event) => {
  let cor = field.getBoundingClientRect();
  let top = (event.clientY - cor.top - field.clientTop) - ball.offsetHeight / 2;
  let left = (event.clientX - cor.left - field.clientLeft) - ball.offsetWidth / 2;
  console.log(top, left);

  if (top <= 0) {
    top = 0;
  } 

  if (left <= 0) {
    left = 0;
  }

  if (top + ball.clientHeight > field.clientHeight) {
    top = field.clientHeight;
  } 
  
  if (left >= field.clientWidth) {
    left = field.clientWidth;
  }

    ball.style.left = left + 'px';
    ball.style.top = top + 'px';
});
