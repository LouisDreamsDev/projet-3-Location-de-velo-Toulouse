//let lat = 43.60426;
//let lon = 1.44367;
//let macarte = null;
//let zoom = [10, 25];

class Carte {
  constructor (lat, lon, minZoom, maxZoom) {
    this.lat = lat;
    this.lon = lon;
    this.macarte = null;
    this.minZoom = minZoom;
    this.maxZoom = maxZoom;
  }
    initmap() {
      this.macarte = L.map('map',{scrollWheelZoom: false})
      .setView([this.lat, this.lon, 11]);
      L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png',{
        minZoom = 10,
        maxZoom = 25
      }).addTo(this.macarte);
    }
}

const mapToulouse = new Carte(43.60426, 1.44367, null);

window.onload = function(){
mapToulouse.initmap();
};
