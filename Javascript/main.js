// Slider
let images = document.getElementsByClassName("slider-image");
let sliderIndex = 0;
let i;
let playButton = document.getElementById('play-button');
let stopButton = document.getElementById('stop-button');
let leftButton = document.getElementById('left-arrow');
let rightButton = document.getElementById('right-arrow');

let mainSlider = new Slider(images, sliderIndex);

// Map

//let lat = 43.60426;
//let lon = 1.44367;
//let zoom = 12;
//let url = "https://api.jcdecaux.com/vls/v1/stations?contract=toulouse&apiKey=110bb2109635584660d15785866f72ba75aa09d8";
//let popup = document.getElementById('details-station');

//let mapMain = new Carte();
