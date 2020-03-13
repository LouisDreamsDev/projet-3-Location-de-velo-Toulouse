let lat = 43.60426;
let lon = 1.44367;
//let minZoom = 10;
//let maxZoom = 25;
//let macarte = null;

class Carte {
  constructor () {
    //let lat = 43.60426;
    //let lon = 1.44367;
    //let minZoom = 10;
    //let maxZoom = 25;
    //let macarte = null;
    this.lat = lat;
    this.lon = lon;
    let macarte = null;
    //this.minZoom = minZoom;
    //this.maxZoom = maxZoom;
  }
    initmap() {
      this.macarte = L.map('map',{scrollWheelZoom: false}).setView([this.lat, this.lon, 11]);
      L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png',{
        /*this.*/minZoom: 10,
        /*this.*/maxZoom: 25
      }).addTo(this.macarte);
    }
}

const mapToulouse = new Carte(43.60426, 1.44367, null);

window.onload = function(){
mapToulouse.initmap();
};

//let marker = L.marker([mapToulouse.lat, mapToulouse .lon]).addTo(mapToulouse.macarte);
