document.querySelector('.tree').addEventListener('click', e => {
  if (e.target.closest('li').firstChild) {
    e.preventDefault();
    if (e.target.firstElementChild) {
      if (e.target.firstElementChild.hidden) {
        e.target.firstElementChild.hidden = '';
        return;
      }
      e.target.firstElementChild.hidden = true;
    }
  }
});