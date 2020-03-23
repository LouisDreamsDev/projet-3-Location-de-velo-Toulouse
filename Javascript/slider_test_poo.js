//let playButton = document.getElementById('play-button');
//let stopButton = document.getElementById('stop-button');
//let images = document.getElementsByClassName("slider-image");
//let sliderIndex = 0;

class Slider {
  constructor(images, sliderIndex, autoplay) {
    this.images = images;
    this.sliderIndex = sliderIndex;
    this.playButton = playButton;
    this.stopButton = stopButton;
    this.chrono = setInterval (() => this.diaporama(), 1000);
    //this.chrono =setInterval(diaporama.bind(this), 1000);
    this.autoPlay = function() {
      this.chrono = setInterval (() => this.diaporama(), 1000);
  }
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
  optionManuel() {
    clearInterval(this.chrono);
    this.stopButton.style.display="none";
    this.playButton.style.display="block";
  }
  backToAuto() {
    stopButton.style.display="block";
    playButton.style.display="none";
    this.autoPlay();
  }
  leftArrow() {
    this.optionManuel();
    for (i = 0; i < this.images.length; i++) {
      this.images[i].style.display = "none";
    }
    if (this.sliderIndex == 0) {
      this.sliderIndex = this.images.length-1; 
    }
    else {
      this.sliderIndex--;
    }
    this.images[this.sliderIndex].style.display = "block";
  }
  rightArrow() {
    this.optionManuel();
    this.diaporama();
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
