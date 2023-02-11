// let slider = document.querySelector("#slider");
// let cordSlider = slider.getBoundingClientRect();


// slider.addEventListener('mousedown', (event) => {
//   let thumb = event.target;

//   if (!thumb.classList.contains('thumb')) return;

//   document.addEventListener('mousemove', (event) => {
//     move(event);
//   }); 

//   document.addEventListener('mouseup', onMouseUp);


//   function move (event) {
//     let newLeft = event.clientX - slider.getBoundingClientRect().left;

//         if (newLeft < 0) {
//           newLeft = 0;
//         }
//         let rightEdge = slider.offsetWidth - thumb.offsetWidth;
//         if (newLeft > rightEdge) {
//           newLeft = rightEdge;
//         }

//         thumb.style.left = newLeft + 'px';
//   }
//   function onMouseUp() {
//     document.removeEventListener('mousemove', (event) => {
//       move(event);
//     }); 
//     document.removeEventListener('mouseup', onMouseUp);

//   }

  
// });


let promise = new Promise ((resolve, reject) => {
  let num = Math.floor(Math.random() * 10);
  if (num > 5) {
    resolve (num);
  }
  reject('Ошибка!')
}).then(result => console.log(result))
.catch((message) => console.log(message));

