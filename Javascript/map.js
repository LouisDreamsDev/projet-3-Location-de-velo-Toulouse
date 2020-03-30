let lat = 43.60426;
let lon = 1.44367;
let zoom = 12;
let url = "https://api.jcdecaux.com/vls/v1/stations?contract=toulouse&apiKey=110bb2109635584660d15785866f72ba75aa09d8";
let marker;
let detailsWindow = document.getElementById('details-window');
let statutStation = document.getElementById('info-statut-station');
let stationName = document.getElementById('info-station-name');
let stationAdress = document.getElementById('info-station-name');
let stationPotential = document.getElementById('info-station-potential');
let stationDispo = document.getElementById('info-station-dispo');

class Carte {
  constructor () {
      this.macarte = L.map('map',{scrollWheelZoom: false}).setView([lat, lon], zoom);
      this.tilelayer = L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png').addTo(this.macarte);
      //this.ajaxGet();
  }
}
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
mapMain.ajaxGet(url, function(data) {
  for(i = 0; i < data.length; i++) {
    //console.log(data[i].number);
    let marker = L.marker([data[i].position.lat, data[i].position.lng]).addTo(mapMain.macarte);
  }
});
}
*/
let mapMain = new Carte();

// creation de la fonction ajax qui recupere les datas sur le serveur jcdecaux
function ajaxGet(url, callback) {    
  let xhr = new XMLHttpRequest();    
  xhr.onreadystatechange = function() {        
    if (xhr.readyState == 4 && xhr.status == 200) {             
        callback(xhr.response);            
    } 
    else if (this.readyState ==! 4 && this.status ==! 200) {
        console.log("Chargement.. ou erreur..");
    }
  }
  xhr.open("GET", url);
  xhr.responseType = "json";
  xhr.send();
};


ajaxGet(url, function(data) {
  for(i = 0; i < data.length; i++) {
    console.log(data[i].status);
    if(data[i].status === "OPEN") {
      //marker = openIcon;
      marker = L.marker([data[i].position.lat, data[i].position.lng]).addTo(mapMain.macarte);
    }
    else if(data[i].status === "CLOSED") { // code inutile pour l'instant. l'objectif est d'afficher un marqueur rouge si la sation est fermee.
      //marker = closeIcon;
    }
    marker.addEventListener('click', function() {
      detailsWindow.style.display="block";
      statutStation = <p></p>
      stationName = 
      stationAdress =
      stationPotential = 
      stationDispo = 
    })
  }
});
/*
let detailsWindow = document.getElementById('details-window');
let statutStation = document.getElementById('info-statut-station');
let stationName = document.getElementById('info-station-name');
let stationAdress = document.getElementById('info-station-adress');
let stationPotential = document.getElementById('info-station-potential');
let stationDispo = document.getElementById('info-station-dispo');
*/
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
      "bikes": 15,
      "stands": 25
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

