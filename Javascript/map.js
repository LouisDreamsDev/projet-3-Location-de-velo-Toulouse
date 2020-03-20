let lat = 43.60426;
let lon = 1.44367;
let zoom = 10;
let data = new XMLHttpRequest();

class Carte {
  constructor () {
      this.macarte = L.map('map',{scrollWheelZoom: false}).setView([lat, lon], zoom);
      this.tilelayer = L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png').addTo(this.macarte);
      this.marker = L.marker([lat, lon]).addTo(this.macarte);
  }
}
let mapToulouse = new Carte();

jQuery(document).ready( function() {
  console.log('hello, jquery fonctionne');
});



