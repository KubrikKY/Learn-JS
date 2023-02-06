let hidden = false;
document.querySelector('#tree').addEventListener('click', (event) => {
  if (event.target.tagName == 'LI' && event.target.firstElementChild) {
      if (hidden) {
        hidden = false;
        event.target.firstElementChild.hidden = '';
        return;
      }
      hidden = true;
      event.target.firstElementChild.hidden = 'true';
  }
});