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
/*
let lat = 43.60426;
let lon = 1.44367;
let zoom = 13;

let mapMain = new Carte();
*/
// Canvas

//let canvas = document.getElementById('canvas');
//let canvasButton = document.getElementById('submit-canvas-button');
//let signature = document.getElementById('signature');
//let ctx = signature.getContext("2d");