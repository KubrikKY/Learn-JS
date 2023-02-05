
let container = document.querySelector('#container');

container.addEventListener('click', (event) => {
  if (event.target.classList.contains('remove-button')) {
      event.target.closest('.pane').remove();
  }
});