// On initialise la latitude et la longitude de Paris (centre de la carte)
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
// Fonction d'initialisation qui s'exécute lorsque le DOM est chargé
initMap();
};
