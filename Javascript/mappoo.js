class MapModel {
    constructor () {
        this.lat = 43.60426;
        this.lon = 1.44367;
        this.zoom = 13;
        this.macarte = L.map('map',{scrollWheelZoom: false}).setView([this.lat, this.lon], this.zoom);
        this.tilelayer = L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png').addTo(this.macarte);
        this.ajaxGet();
        this.markerClusters = L.markerClusterGroup();
        this.ajaxUrl = "https://api.jcdecaux.com/vls/v3/stations?contract=toulouse&apiKey=110bb2109635584660d15785866f72ba75aa09d8";
        this.detailsWindow = document.getElementById('details-window');
        this.statutStation = document.getElementById('info-statut-station');
        this.stationName = document.getElementById('info-station-name');
        this.stationAddress = document.getElementById('info-station-address');
        this.stationPotentialBikes = document.getElementById('info-station-bikes-potential');
        this.stationAvailableBikes = document.getElementById('info-station-bikes');
        this.marker;
        this.stations;
        /*
        this.greenIcon = L.Icon({
            shadowUrl: 'img/icons/marker-shadowIcon.png',
            iconSize:     [25, 41],
            shadowSize:   [41, 41],
            iconAnchor:   [12, 41],
            shadowAnchor: [4, 41],
            popupAnchor:  [1, -34]
        });
        this.orangeIcon = L.Icon({
            shadowUrl: 'img/icons/marker-shadowIcon.png',
            iconSize:     [25, 41],
            shadowSize:   [41, 41],
            iconAnchor:   [12, 41],
            shadowAnchor: [4, 41],
            popupAnchor:  [1, -34]
        });
        this.redIcon = L.Icon({
            shadowUrl: 'img/icons/marker-shadowIcon.png',
            iconSize:     [25, 41],
            shadowSize:   [41, 41],
            iconAnchor:   [12, 41],
            shadowAnchor: [4, 41],
            popupAnchor:  [1, -34]
        });
        this.blackIcon = L.Icon({
            shadowUrl: 'img/icons/marker-shadowIcon.png',
            iconSize:     [25, 41],
            shadowSize:   [41, 41],
            iconAnchor:   [12, 41],
            shadowAnchor: [4, 41],
            popupAnchor:  [1, -34]
        });
        */
        //this.ajaxGet();
        this.mapInteract();
    }
    /*
    ajaxGet(url, callback) {    
        let xhr = new XMLHttpRequest();    
        xhr.onreadystatechange = function() {        
          if (xhr.readyState == 4 && xhr.status == 200) {             
              callback(xhr.response);          
          }
          else if (this.readyState ==! 4 && this.status ==! 200) {
              console.log("erreur..");
          }
        }
        xhr.open("GET", "https://api.jcdecaux.com/vls/v3/stations?contract=toulouse&apiKey=110bb2109635584660d15785866f72ba75aa09d8");
        xhr.responseType = "json";
        xhr.send();
      };

*/
ajaxGet(url, callback) {
    var req = new XMLHttpRequest();
    req.open("GET", url);
    req.addEventListener("load", function () {

        if (req.status >= 200 && req.status < 400) {

            // Appelle la fonction callback en lui passant la réponse de la requête
            callback(req.responseText);
        } else {

            console.error(req.status + " " + req.statusText + " " + url);
        }
    });
    req.addEventListener("error", function () {

        console.error("Erreur réseau avec l'URL");
    });
    req.send();
}

    mapInteract() {
        this.ajaxGet("https://api.jcdecaux.com/vls/v3/stations?contract=toulouse&apiKey=110bb2109635584660d15785866f72ba75aa09d8", function(stations) {
            console.log(stations);
            stations.forEach(station => {
                // si ouvert et velos >= 4 = icone verte
                if(station.status === "OPEN" && station.available_bikes >= 4) {
                this.marker = L.marker([station.position.lat, station.position.lng], {icon: this.greenIcon});
                }
                // si ouvert et velo entre 1 et 3 = icone orange
                else if (station.status === "OPEN" && station.available_bikes < 4 && station.available_bikes >= 1) {
                this.marker = L.marker([station.position.lat, station.position.lng], {icon: this.orangeIcon});
                }
                // si ouvert mais 0 velo = icone rouge
                else if (station.status === "OPEN" && station.available_bikes == 0) {
                this.marker = L.marker([station.position.lat, station.position.lng], {icon: this.redIcon});
                }
                // si ferme = icone noire
                else if (station.status === "CLOSED") {
                this.marker = L.marker([station.position.lat, station.position.lng], {icon: this.blackIcon});
                }
                // ecoute au clic des markers et affiche les infos de la station selectionnee
                
                this.marker.addEventListener('click', () => {
                this.detailsWindow.style.display="block";

                if (this.station.status === "OPEN") {
                    this.station.status = "Station ouverte";
                }
                else if (this.station.status === "CLOSED") {
                    this.station.status = "Station fermee";
                };
                this.stationName = this.station.name.toLowerCase();
                this.stationAddress = this.station.address.toLowerCase();
                this.statutStation.innerHTML = this.station.status;
                this.stationName.innerHTML = this.stationName;
                this.stationAddress.innerHTML = this.stationAddress;
                this.stationPotentialBikes.innerHTML = this.station.available_bike_stands;
                this.stationAvailableBikes.innerHTML = this.station.available_bikes;
                });
            this.markerClusters.addLayer(this.marker);
            this.mapMain.macarte.addLayer(this.markerClusters);
            });
        }
    }
}

let myMap = new MapModel();