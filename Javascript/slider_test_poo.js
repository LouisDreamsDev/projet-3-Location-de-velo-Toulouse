class Slider {
  constructor(images, sliderIndex, chrono) {
    this.images = images;
    this.sliderIndex = sliderIndex;
    this.chrono = chrono;
    this.playButton = playButton;
    this.stopButton = stopButton;
  }
  autoplay() {
  this.chrono = setInterval(diaporama, 1000);
  }
  diaporama() {
    for(i = 0; i < this.images.length; i++) {
      this.images[i].style.display = "none";
    }
    this.sliderIndex++;
    if (this.sliderIndex > this.images.length) {
      this.sliderIndex = 1;
    }
    this.images[this.sliderIndex-1].style.display = "block";
  }
}

/*
function optionManuel() {
  clearInterval(chrono);
  stopButton.style.display="none";
  playButton.style.display="block";
}
function backToAuto() {
  stopButton.style.display="block";
  playButton.style.display="none";
  autoPlay();
}
// fleche gauche
function leftArrow() {
  optionManuel();
  for (i = 0; i < images.length; i++) {
    images[i].style.display = "none";
  }
  if (sliderIndex == 0) {
    sliderIndex = images.length-1; 
  }
  else {
    sliderIndex--;
  }
  images[sliderIndex].style.display = "block";
}
function rightArrow() {
 optionManuel();
 diaporama();
}
*/
