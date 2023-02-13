let div = document.querySelector('.view');
div.tabIndex = 1;

let textArea = document.createElement('textarea');
textArea.classList.add('edit');

div.addEventListener('focus', inFocus);

textArea.addEventListener('blur', outFocus);
textArea.addEventListener('keydown', keyDownEnter);

function keyDownEnter (e) {
  if (e.code == 'Enter') {
    outFocus(...arguments);
  }
}

function inFocus (e) {
  e.target.after(textArea);
  e.target.remove();
}

function outFocus (e) {
  div.textContent = textArea.value;
  e.target.after(div);
  e.target.remove();
}