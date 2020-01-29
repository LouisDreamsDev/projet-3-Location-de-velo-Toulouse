// declarations des variables pour le defilement des images du slider
let lesImages = document.getElementsByClassName("slider-image");
let sliderIndex = 0;
let deltaT = 0;
let i = 0;
//declarations des variables pour l'utilisation des boutons play / pause
let playButton = document.getElementById("play-button");
let stopButton = document.getElementById("stop-button");

autoPlay();

function autoPlay() {
  deltaT = setInterval(diaporama, 1000);
}
function diaporama() {
  document.getElementById("slider-title").innerHTML = sliderIndex;
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


function leftArrow() {
  optionManuel();
  document.getElementById("slider-title").innerHTML = sliderIndex;
  if (sliderIndex < 0) {
    sliderIndex = 6;
  }
  lesImages[sliderIndex--].style.display = "block";
}
function rightArrow() {
 optionManuel();
 document.getElementById("slider-title").innerHTML = sliderIndex;
 if (sliderIndex > lesImages.length) {
   sliderIndex = 1;
 }
 if (sliderIndex ==! 1) {
 lesImages[sliderIndex].style.display = "none";
}
 lesImages[sliderIndex-1].style.display = "none";
 lesImages[sliderIndex++].style.display = "block";
}
