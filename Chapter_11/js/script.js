'use strict';
// /**
//      * Позиционирует элемент elem относительно элемента anchor в соответствии со значением position.
//      *
//      * @param {Node} anchor     элемент, около которого позиционируется другой элемент
//      * @param {string} position одно из: top/right/bottom
//      * @param {Node} elem       элемент, который позиционируется
//      *
//      * Оба элемента elem и anchor должны присутствовать в документе
//      */
// function positionAt(anchor, position, elem) {
//   let anchorCoords = anchor.getBoundingClientRect();

//   switch (position) {
//     case 'top': 
//       elem.style.top = anchorCoords.top - elem.offsetHeight + 'px';
//       elem.style.left = anchorCoords.left + 'px';
//     break;
//     case 'right': 
//       elem.style.left = anchorCoords.right + 'px';
//       elem.style.top = anchorCoords.top + 'px';
//     break;
//     case 'bottom': 
//       elem.style.left = anchorCoords.left + 'px';
//       elem.style.top = anchorCoords.bottom + 'px';
//     break;
//   }
// }

function getCoords(elem) {
  let box = elem.getBoundingClientRect();

  return {
    top: box.top + window.pageYOffset,
    right: box.right + window.pageXOffset,
    bottom: box.bottom + window.pageYOffset,
    left: box.left + window.pageXOffset
  };
}

function positionAt(anchor, position, elem) {
  let anchorCoords = getCoords(anchor);

  switch (position) {
    case 'top': 
      elem.style.top = anchorCoords.top - elem.offsetHeight + 'px';
      elem.style.left = anchorCoords.left + 'px';
    break;
    case 'right': 
      elem.style.left = anchorCoords.right + 'px';
      elem.style.top = anchorCoords.top + 'px';
    break;
    case 'bottom': 
      elem.style.left = anchorCoords.left + 'px';
      elem.style.top = anchorCoords.bottom + 'px';
    break;
    case 'top-in': 
    elem.style.top = anchorCoords.top + 'px';
    elem.style.left = anchorCoords.left + 'px';
    break;
    case 'right-in': 
      elem.style.left = anchorCoords.right - elem.offsetWidth + 'px';
      elem.style.top = anchorCoords.top + 'px';
    break;
    case 'bottom-in': 
      elem.style.left = anchorCoords.left + 'px';
      elem.style.top = anchorCoords.bottom - elem.offsetHeight + 'px';
    break;
  }
}

/**
 * Показывает заметку с заданным содержимым на заданной позиции
 * относительно элемента anchor.
 */
function showNote(anchor, position, html) {
  let note = document.createElement('div');
  note.className = "note";
  note.innerHTML = html;
  document.body.append(note);

  positionAt(anchor, position, note);
}

// test it
let blockquote = document.querySelector('blockquote');

showNote(blockquote, "top", "note above");
showNote(blockquote, "right", "note at the right");
showNote(blockquote, "bottom", "note below");

showNote(blockquote, "top-in", "note above IN");
showNote(blockquote, "right-in", "note at the right IN");
showNote(blockquote, "bottom-in", "note below IN");