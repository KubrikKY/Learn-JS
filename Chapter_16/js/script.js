let tooltip = document.createElement('div');
tooltip.className = 'tooltip';
let currentElement = null;
document.getElementById('house').addEventListener('mouseover', (event) => {
  if (currentElement) return;
  if (!event.target.dataset.tooltip) return;
  let coord = event.target.getBoundingClientRec();
  tooltip.innerHtml = event.target.dataset.tooltip;
  tooltip.top = coord.top + coord.height + 'px';
  tooltip.left = coord.left - coord.width / 2  + 'px';
  document.body.append(tooltip);
});
  
document.getElementById('house').addEventListener('mouseout', (event) => {
  let relatedTarget = event.relatedTarget;
  if (!currentElement) return;

  while (relatedTarget) {
    if (relatedTarget == currentElement) return;

    relatedTarget = relatedTarget.parentNode;
  }

  currentElement.style.background = '';
  currentElement = null;
});
