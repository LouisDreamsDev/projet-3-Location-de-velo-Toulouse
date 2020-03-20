let lat = 43.60426;
let lon = 1.44367;
let zoom = 10;

class Carte {
  constructor () {
      this.macarte = L.map('map',{scrollWheelZoom: false}).setView([lat, lon], zoom);
      this.tilelayer = L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png').addTo(this.macarte);
      this.marker = L.marker([lat, lon]).addTo(this.macarte);
  }
}
let mapToulouse = new Carte();

function callAPI(url) {
  let request = new XMLHttpRequest();
  request.onreadystatechange = function() {
    if (request.readyState == request.DONE && request.status == 200) {
      let result = JSON.parse(request.responseText);
      console.log("OK pour l'API", result.length);
      return result;
    }
  }
  request.open("GET", url);
  request.send();
}
let stations = callAPI("https://api.jcdecaux.com/vls/v1/stations?contract=toulouse&apiKey=110bb2109635584660d15785866f72ba75aa09d8");

function displayMarker() {
  //let lat2 = stations.position.latitude;
  //let lon2 = stations.position.longitude;
  for(let i = 0; index < stations.length; i++) {
  let marker = L.marker([stations.position.lat, stations.position.lon]).addTo(this.macarte);
  }
  console.log(marker);
}
marker();



