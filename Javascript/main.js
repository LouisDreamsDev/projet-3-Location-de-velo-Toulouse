// Slider
let images = document.getElementsByClassName("slider-image");
let sliderIndex = 0;
let i;
let playButton = document.getElementById('play-button');
let stopButton = document.getElementById('stop-button');
let leftButton = document.getElementById('left-arrow');
let rightButton = document.getElementById('right-arrow');

let mainSlider = new Slider(images, sliderIndex);
