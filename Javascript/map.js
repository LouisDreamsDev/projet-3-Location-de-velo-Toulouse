/*
var lat = 43.60426;
var lon = 1.44367;
var macarte = null;
// Fonction d'initialisation de la carte
function initMap() {
    macarte = L.map('map',{scrollWheelZoom: false}).setView([lat, lon], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
        maxZoom: 20
    }).addTo(macarte);
}
window.onload = function(){
initMap();
// Fonction d'initialisation qui s'exécute lorsque le DOM est chargé
};
*/

function carte(lat, lon, macarte, initmap) {
  this.lat = lat;
  this.lon = lon;
  this.macarte = null;
  this.initmap = function() {
    macarte = L.map('map',{scrollWheelZoom: false}).setView([lat, lon], 12);
    L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
    minZoom: 10,
    maxZoom: 25
    }).addTo(macarte);
  }
}
let mapToulouse = carte(43.60426, 1.44367);

function marker() {}
// let marker = L.marker([43.60426, 1.44367]).addTo(macarte);

window.onload = function(){
this.initmap();
};
