// declarations des variables pour le defilement des images du slider
let images = document.getElementsByClassName("slider-image");
let sliderIndex = 0, chrono = 0;
//declarations des variables pour l'utilisation des boutons play / pause
let playButton = document.getElementById("play-button");
let stopButton = document.getElementById("stop-button");

autoPlay();

function autoPlay() {
  chrono = setInterval(diaporama, 1000);
}
function diaporama() {
  for (let i = 0; i < images.length; i++) {
    images[i].style.display = "none";
  }
  sliderIndex++;
  if (sliderIndex > images.length) {
    sliderIndex = 1;
  }
  images[sliderIndex-1].style.display = "block";
}
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
