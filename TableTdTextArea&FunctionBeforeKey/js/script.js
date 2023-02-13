let table = document.getElementById('bagua-table');
let textArea = document.createElement('textarea');
textArea.classList.add('wind');
let buttonOk = document.createElement('div');
let buttonCansel = document.createElement('div');

buttonOk.textContent = 'OK';
buttonCansel.textContent = 'CANSEL';

let buttons = [buttonOk, buttonCansel];
buttons.forEach(e => {
  e.classList.add('button');
});

let lastTd;

document.querySelectorAll('td').forEach(e => e.tabIndex = -1);

table.addEventListener('focusin', inFocus);


function inFocus (e) {
  let td = e.target.closest('td');
  if (td) {
    table.removeEventListener('focusin', inFocus);
    lastTd = td;
    console.log('focus');
    let coordBtn = e.target.getBoundingClientRect();
    textArea.value = e.target.innerHTML;
    textArea.style.height = e.target.offsetHeight + 'px';
    textArea.style.width = e.target.offsetWidth + 'px';
    buttons.forEach((e, i)=> {
      e.style.top = coordBtn.bottom + 5 + 'px';
      e.style.left = coordBtn.left + 5 + 'px';
      if (i == 1) {
        e.style.left = coordBtn.left + 30 + 'px';
      }
    });
    e.target.after(textArea, ...buttons);
    textArea.focus();
    e.target.remove();

    buttonOk.addEventListener('click', e => {
      lastTd.innerHTML = textArea.value;
      textArea.before(lastTd);
      textArea.remove();
      lastTd = null;
      e.target.remove();
      buttonCansel.remove();
      table.addEventListener('focusin', inFocus);

    });

    buttonCansel.addEventListener('click', e => {
      textArea.before(lastTd);
      textArea.remove();
      lastTd = null;
      e.target.remove();
      buttonOk.remove();
      table.addEventListener('focusin', inFocus);
    });
  }
}

function runOnKeys(func, ...code) {
  let set = new Set();

  document.addEventListener('keydown', press);
  document.addEventListener('keyup', up);

  function up (event) {
    set.delete(event.code);
  }

  function press (event) {
    set.add(event.code);
    if (set.has(...code)) {
      func();
      document.removeEventListener('keydown', press);
      document.removeEventListener('keyup', up);
    }
  }
}
