let lat = 43.60426;
let lon = 1.44367;
let zoom = 12;
let url = "https://api.jcdecaux.com/vls/v1/stations?contract=toulouse&apiKey=110bb2109635584660d15785866f72ba75aa09d8";
let marker;
let detailsWindow = document.getElementById('details-window');
let statutStation = document.getElementById('info-statut-station');
let stationName = document.getElementById('info-station-name');
let stationAddress = document.getElementById('info-station-address');
let stationPotentialBikes = document.getElementById('info-station-bikes-potential');
let stationDispo = document.getElementById('info-station-bikes-dispo');

class Carte {
  constructor () {
      this.macarte = L.map('map',{scrollWheelZoom: false}).setView([lat, lon], zoom);
      this.tilelayer = L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png').addTo(this.macarte);
  }
}

let mapMain = new Carte();

// creation de la fonction ajax qui recupere les stationss sur le serveur jcdecaux
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

//function qui recuper la fonction ajaxget 

function mapInteract() {
  ajaxGet(url, function(stations) {
    stations.forEach(station => {
      marker = L.marker([station.position.lat, station.position.lng]).addTo(mapMain.macarte);
      /*
      if(station.status === "OPEN" && station.totalStands.availabilities.bikes >= 4) {
        marker = greenIcon;
      }
      else if (station.status === "OPEN" && station.totalStands.availabilities.bikes < 4 && station.totalStands.availabilities.bikes >= 1) {
        marker = orangeIcon;
      }
      else {
        marker = redIcon;
      }
      */
      marker.addEventListener('click', () => {
        detailsWindow.style.display="block";
        statutStation.innerHTML = station.status;
        stationName.innerHTML = station.name;
        stationAddress.innerHTML = station.address;
        stationPotentialBikes.innerHTML = station.totalStands.availabilities.bikes; 
        stationDispo.innerHTML = station.capacity;
      });
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

// poo methode ajax?
/*
ajaxGet(this.url, callback) {
  this.xhr.onreadystatechange = function() {        
    if (this.xhr.readyState == 4 && this.xhr.status == 200) {             
      //console.log(this.xhr.response);
      this.callback(this.xhr.response);            
      } 
      else if (this.xhr.readyState ==! 4 && this.xhr.status ==! 200) {
        console.log("Chargement.. ou erreur..");
      }
    }
    this.xhr.open("GET", this.url);
    this.xhr.responseType = "json";
    this.xhr.send();
}
mapMain.ajaxGet(url, function(stations) {
  for(i = 0; i < stations.length; i++) {
    //console.log(stations[i].number);
    let marker = L.marker([stations[i].position.lat, stations[i].position.lng]).addTo(mapMain.macarte);
  }
});
}
*/

