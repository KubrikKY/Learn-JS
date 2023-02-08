let tooltip = document.createElement('div');
tooltip.classList.add('tooltip');

document.addEventListener('mouseover', (event) => {
  if (event.target.dataset.tooltip) {
    let coord = event.target.getBoundingClientRect();
    tooltip.innerHTML = event.target.dataset.tooltip;
    tooltip.hidden = '';
    tooltip.style.top = coord.top - tooltip.offsetHeight - 5 + 'px';
    tooltip.style.left = (coord.left + coord.width / 2) - tooltip.offsetWidth / 2 + 'px';
    
    if (parseInt(tooltip.style.left) < 0) {
      tooltip.style.left = 0 + 'px';
    }
    if (parseInt(tooltip.style.top) < 0) {
      tooltip.style.top = coord.bottom + 5 + 'px';
    }
    document.body.append(tooltip);
  }
});

document.addEventListener('mouseout', (event) => {
  if (event.target.dataset.tooltip) {
    tooltip.hidden = true;
  }
});