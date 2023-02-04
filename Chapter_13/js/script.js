'use strict';

let button = document.querySelector('.remove-button');
let pane = document.querySelectorAll('.pane');

pane.forEach(e => {
  let moreButton = button.cloneNode(true);
  moreButton.style.top = 0 + 'px';
  moreButton.style.left = pane.clientWidth - button.offsetWidth + 'px';
  moreButton.addEventListener('click', (event) => {
    e.remove();
  });
  e.prepend(moreButton);
});