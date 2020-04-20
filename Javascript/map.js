let lat = 43.60426;
let lon = 1.44367;
let zoom = 13;
let url = "https://api.jcdecaux.com/vls/v1/stations?contract=toulouse&apiKey=110bb2109635584660d15785866f72ba75aa09d8";
let marker;


class Carte {
  constructor () {
      this.macarte = L.map('map',{scrollWheelZoom: false}).setView([lat, lon], zoom);
      this.tilelayer = L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png').addTo(this.macarte);
  }
}

let mapMain = new Carte();

// fonction ajax (connection au serveur)

function ajaxGet(url, callback) {    
  let xhr = new XMLHttpRequest();    
  xhr.onreadystatechange = function() {        
    if (xhr.readyState == 4 && xhr.status == 200) {             
        callback(xhr.response);            
    }
    else if (this.readyState ==! 4 && this.status ==! 200) {
        console.log("erreur..");
    }
  }
  xhr.open("GET", url);
  xhr.responseType = "json";
  xhr.send();
};

// Stations sur la carte + marker clusters + infos

let detailsWindow = document.getElementById('details-window');
let statutStation = document.getElementById('info-statut-station');
let stationName = document.getElementById('info-station-name');
let stationAddress = document.getElementById('info-station-address');
let stationPotentialBikes = document.getElementById('info-station-bikes-potential');
let stationAvailableBikes = document.getElementById('info-station-bikes');
let markerClusters = L.markerClusterGroup();
let SetIcon = L.Icon.extend({
  options: {
    shadowUrl: 'img/icons/marker-shadowIcon.png',
    iconSize:     [25, 41],
    shadowSize:   [41, 41],
    iconAnchor:   [12, 41],
    shadowAnchor: [4, 41],
    popupAnchor:  [1, -34]
  }
});
let greenIcon = new SetIcon({iconUrl: 'img/icons/greenIcon.png'});
let orangeIcon = new SetIcon({iconUrl: 'img/icons/orangeIcon.png'});
let redIcon = new SetIcon({iconUrl: 'img/icons/redIcon.png'});
let blackIcon = new SetIcon({iconUrl: 'img/icons/blackIcon.png'});

function mapInteract() {
    ajaxGet(url, function(stations) {
      stations.forEach(station => {
        // si ouvert et velos >= 4 = icone verte
        if(station.status === "OPEN" && station.available_bikes >= 4) {
          marker = L.marker([station.position.lat, station.position.lng], {icon: greenIcon});
        }
        // si ouvert et velo entre 1 et 3 = icone orange
        else if (station.status === "OPEN" && station.available_bikes < 4 && station.available_bikes >= 1) {
          marker = L.marker([station.position.lat, station.position.lng], {icon: orangeIcon});
        }
        // si ouvert mais 0 velo = icone rouge
        else if (station.status === "OPEN" && station.available_bikes == 0) {
          marker = L.marker([station.position.lat, station.position.lng], {icon: redIcon});
        }
        // si ferme = icone noire
        else if (station.status === "CLOSED") {
          marker = L.marker([station.position.lat, station.position.lng], {icon: blackIcon});
        }
        // ecoute au clic des markers et affiche les infos de la station selectionnee
        marker.addEventListener('click', () => {
          detailsWindow.style.display="block";
          statutStation.innerHTML = station.status;
          stationName.innerHTML = station.name;
          stationAddress.innerHTML = station.address;
          stationPotentialBikes.innerHTML = station.available_bike_stands;
          stationAvailableBikes.innerHTML = station.available_bikes;
        });
        markerClusters.addLayer(marker);
        mapMain.macarte.addLayer(markerClusters);
      });
    })
  }
  mapInteract();

  /*
{
  "number": 123,
  "contractName" : "Lyon",
  "name": "nom station",
  "address": "adresse indicative",
  "position": {
    "latitude": 45.774204,
    "longitude": 4.867512
  },
  "banking": true,
  "bonus": false,
  "status": "OPEN",
  "lastUpdate": "2019-04-08T12:23:34Z",
  "connected": true,
  "overflow": true,
  "shape": null,
  "totalStands": {
    "availabilities": {
      "bikes": 15, <<<<<< JE VEUX CA 
      "stands": 25 <<<<<< JE VEUX CA
    },
    "capacity": 40
  },
  "mainStands": {
    "availabilities": {
      "bikes": 15,
      "stands": 15
    },
    "capacity": 30
  },
  "overflowStands": {
    "availabilities": {
      "bikes": 0,
      "stands": 10
    },
    "capacity": 10
  }
}
*/

  