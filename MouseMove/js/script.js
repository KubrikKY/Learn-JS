let mouse = document.getElementById('mouse');

mouse.tabIndex = -1;


mouse.addEventListener('focus', mouseFocus);
mouse.addEventListener('blur', mouseOutFocus);


function mouseFocus (e) {
  e.target.style.position = 'absolute';
  document.addEventListener ('keydown', mouseMove);
}

function mouseOutFocus (e) {
  document.removeEventListener('keydown', mouseMove);
}

function mouseMove (event) {
    let thisCoord = mouse.getBoundingClientRect();
    switch (event.code) {
      case 'ArrowDown':
        mouse.style.top = thisCoord.top + thisCoord.height + 'px';
        break;
      case 'ArrowUp':
        mouse.style.top = thisCoord.top - thisCoord.height + 'px';
        break;
      case 'ArrowRight':
        mouse.style.left = thisCoord.left + thisCoord.width + 'px';
        break;
      case 'ArrowLeft':
        mouse.style.left = thisCoord.left - thisCoord.width + 'px';
        break;
    }
}