// declarations des variables pour le defilement des images du slider
let lesImages = document.getElementsByClassName("slider-image");
let sliderIndex = 0, deltaT = 0;

//declarations des variables pour l'utilisation des boutons play / pause
let playButton = document.getElementById("play-button");
let stopButton = document.getElementById("stop-button");

autoPlay();

function autoPlay() {
  deltaT = setInterval(diaporama, 1000);
}
function diaporama() {
  for (i = 0; i < lesImages.length; i++) {
    lesImages[i].style.display = "none";
  }
  sliderIndex++;
  if (sliderIndex > lesImages.length) {
    sliderIndex = 1;
  }
  lesImages[sliderIndex-1].style.display = "block";
}
function optionManuel() {
  clearInterval(deltaT);
  document.getElementById("stop-button").style.display="none";
  document.getElementById("play-button").style.display="block";
}
function backToAuto() {
  document.getElementById("stop-button").style.display="block";
  document.getElementById("play-button").style.display="none";
  autoPlay();
}
// fleche gauche
function leftArrow() {
  optionManuel();
  for (i = 0; i < lesImages.length; i++) {
    lesImages[i].style.display = "none";
  }
  if (sliderIndex == 0) {
    sliderIndex = lesImages.length; // bugg meme avec lesImages.length-1 ou length[-1]
  }
  else {
    sliderIndex--;
  }
  lesImages[sliderIndex-1].style.display = "block";
}
// fleche droite
function rightArrow() {
 optionManuel();
 diaporama();
}
