class Slider {
  constructor(images, sliderIndex) {
    this.keydown();
    this.images = images;
    this.sliderIndex = sliderIndex;
    this.playButton = playButton;
    this.stopButton = stopButton;
    this.leftButton = leftButton;
    this.rightButton = rightButton;
    this.autoPlay();
  }
  keydown() {
    document.body.addEventListener('keydown', (e) => {
      if (e.keyCode == 37) {
        this.leftSlide();
      }
      else if (e.keyCode == 39) {
        this.rightSlide();
      }
    })
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
  stopSlide() {
    clearInterval(this.chrono);
    this.stopButton.style.display="none";
    this.playButton.style.display="block";
  }
  replaySlide() {
    stopButton.style.display="block";
    playButton.style.display="none";
    this.autoPlay();
  }
  leftSlide() {
    this.stopSlide();
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
  rightSlide() {
    this.stopSlide();
    this.diaporama();
  }
  autoPlay() {
    this.chrono = setInterval (() => this.diaporama(), 1000);
  }
  clickLeftSlide() {
    this.leftButton.addEventListener('click', () => {
      this.leftSlide();
    })
  }
  clickRightSlide() {
    this.rightButton.addEventListener('click', () => {
      this.rightSlide();
    })
  }
}
