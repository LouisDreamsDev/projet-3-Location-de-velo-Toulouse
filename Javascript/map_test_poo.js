let lat = 43.60426;
let lon = 1.44367;
let zoom = 10;
let url = "https://api.jcdecaux.com/vls/v1/stations?contract=toulouse&apiKey=110bb2109635584660d15785866f72ba75aa09d8";
let xhr = new XMLHttpRequest();

class Carte {
  constructor () {
      this.macarte = L.map('map',{scrollWheelZoom: false}).setView([lat, lon], zoom);
      this.tilelayer = L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png').addTo(this.macarte);
  }
  /*
  ajaxGet(callback) {
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
*/
}
let mapMain = new Carte();

function ajaxGet(url, callback) {    
  let xhr = new XMLHttpRequest();    
  xhr.onreadystatechange = function() {        
    if (xhr.readyState == 4 && xhr.status == 200) {             
        //console.log(xhr.response);
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
    //console.log(data[i].number);
    let marker = L.marker([data[i].position.lat, data[i].position.lng]).addTo(mapMain.macarte);
  }
});


