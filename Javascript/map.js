class Carte {
  constructor (lat, lon, macarte) {
    this.lat = lat;
    this.lon = lon;
    this.macarte = macarte;
    this.minZoom = 10;
    this.maxZoom = 25;
  }
  initmap() {
    macarte = L.map('map',{scrollWheelZoom: false}).setView([this.lat, this.lon]);
    L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png',).addTo(macarte);
  }
}

const mapToulouse = new Carte(43.60426, 1.44367, null);

window.onload = function(){
mapToulouse.initmap();
};
