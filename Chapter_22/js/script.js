let table = document.getElementById('grid');
table.addEventListener('click', e=>{
  if (e.target.dataset.type) {
      let sort = [...table.tBodies[0].rows].sort(sortBy(e.target));
      table.tBodies[0].append(...sort);
  }
});

function sortBy (elem) {
  if (elem.dataset.type == 'number') {
    return (a, b) => +a.cells[elem.cellIndex].textContent > +b.cells[elem.cellIndex].textContent ? 1: -1;
  }
  if (elem.dataset.type == 'string') {
    return (a, b) => a.cells[elem.cellIndex].textContent > b.cells[elem.cellIndex].textContent ? 1: -1;
  }
}

let select = document.getElementById('genres');

let option = new Option('Классика', 'classic');
select.append(option);
select.value = 'classic';