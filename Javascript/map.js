let lat = 43.60426;
let lon = 1.44367;
let zoom = 15;

class Carte {
  constructor () {
      this.macarte = L.map('map',{scrollWheelZoom: false}).setView([lat, lon], zoom);
      this.tilelayer = L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png').addTo(this.macarte);
      this.marker = L.marker([this.lat, this.lon]).addTo(macarte)
    .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
    .openPopup();
  }
}

let mapToulouse = new Carte();

