let slider = document.querySelector("#slider");
let cordSlider = slider.getBoundingClientRect();


slider.addEventListener('mousedown', (event) => {
  let thumb = event.target;

  if (!thumb.classList.contains('thumb')) return;

  document.addEventListener('mousemove', (event) => {
    move(event);
  }); 

  function move (event) {
    let cordThumb = thumb.getBoundingClientRect();
    thumb.style.left = event.clientX - cordSlider.left + 'px';
    if (cordSlider.right < cordThumb.right) {
      thumb.style.left = cordSlider.width - cordThumb.width + 'px';
    }
    if (cordSlider.left > cordThumb.left) {
      thumb.style.left = 0 + 'px';
    }
  }

  document.addEventListener('mouseup', (event) => {
    document.removeEventListener('mousemove', (event) => {
      move(event);
    });

    console.log(event);
    document.onmouseup = null;
  });
  
});


