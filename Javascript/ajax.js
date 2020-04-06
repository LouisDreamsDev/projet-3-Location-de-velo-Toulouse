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