let image = document.getElementById('image');

image.addEventListener('click', function (e) {

  if (document.fullscreenElement) {
    document.exitFullscreen()
  } else {
    image.requestFullscreen();
  }

})