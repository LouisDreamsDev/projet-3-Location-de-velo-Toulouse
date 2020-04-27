// Enregistrement et persistance au refresh du nom et prenom
function saveUserId() {
  let name = document.getElementById('name-field').value;
  let surname = document.getElementById('surname-field').value;
  localStorage.setItem('name', name);
  localStorage.setItem('surname', surname);
  console.log(localStorage.getItem('name'));
  console.log(localStorage.getItem('surname'));
  //displayUserId();
}
/*
function displayUserId() {
  name.innerHTML = localStorage.getItem('userName');
  surname.innerHTML =localStorage.getItem('userSurname');
}
*/
canvasButton.addEventListener('click', () => {
  saveUserId();
  canvasContainer.style.display='block';
})


// Validation : trigger prefooter, timer. le tout enregistrer en ?storage.
let mapSection = document.getElementById('map-area');
let sliderSection = document.getElementById('slider-area');
let validButton = document.getElementById('valid-button');
let prefooter = document.getElementById('pre-footer');
let chatbox_station = document.getElementById('chatbox-station-name');
let chatbox_address = document.getElementById('chatbox-station-adress');
let chatbox_name = document.getElementById('chatbox-stored-user-name');
let chatbox_surname = document.getElementById('chatbox-stored-user-surname');
let cancelResaButton = document.getElementById('cancel-button');
 
validButton.addEventListener('click', () => {
  //?
  theEnd();
});

function theEnd() {
  prefooter.style.display='block';
  mapSection.style.display='none';
  sliderSection.style.display='none';
  window.scrollBy(0, -1000);
  chatbox_station.innerHTML = localStorage.getItem('station_name');
  chatbox_address.innerHTML = localStorage.getItem('station_address');
  chatbox_name.innerHTML = localStorage.getItem('name');
  chatbox_surname.innerHTML = localStorage.getItem('surname');
  timerGlobal();

}

cancelResaButton.addEventListener('click', () => {
  cancelResa();
});
  
function cancelResa() {
  if (confirm("Etes-vous sur d'annuler votre reservation? Cette action est irreversible. Toute les donnees seront effacees !")) {
    alert("Votre reservation a ete annulee avec succes");
    mapSection.style.display='block';
    prefooter.style.display='none';
    sliderSection.style.display='block';
    localStorage.clear();
    sessionStorage.clear();
  }
  else {
    alert("votre reservation n'a pas ete annulee. Il vous reste " + tictoc() + " minutes");
  }
}

// 20 minutes de chrono une fois la reservation effectuee

let timer = document.getElementById('timer');
let counter = 0;
let timeleft = 1200;
let result = 0;

function timerGlobal() {

  function convertSeconds(s) {
    let minutes = Math.floor(s / 60); // on invoque la methode floor de l'objet math pour recuperer seulement un nombre entier
    let seconds = s % 60; // on recupere le reste du nombre entier 
    return minutes + ':' + seconds;
  }
  
  interval = setInterval(countx, 1000); // on lance la fonction countx toute les secondes a l'infini
  

  function countx() {
    counter--;
    result = convertSeconds(timeleft + counter);
    timer.innerHTML = result;
    localStorage.setItem('timer', result);

    if (counter == timeleft) { // quand le temps imparti = compteur, la boucle des secondes [setInterval] se termine
      clearInterval(interval);
      timer.innerHTML = "00:00";
      setTimeout(() => {alert("Les 20 minutes sont ecoulees. Vous pouvez a nouveau reserver un velo."), 2000});
      endTimer();
    }; 
  }
  function endTimer() {
    localStorage.clear();
    sessionStorage.clear();
    mapSection.style.display='block';
    prefooter.style.display='none';
    sliderSection.style.display='block';
  }
}

/*
class tictoc {
  constructor() {
    this.timer = timer;
    this.counter = counter;
    this.timeleft = timeleft;
    this.interval = interval;
  }
}
*/
