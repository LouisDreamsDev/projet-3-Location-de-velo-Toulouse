

//declaration des variables du prefooter
let mapSection = document.getElementById('map-area');
let sliderSection = document.getElementById('slider-area');
let validCanvasButton = document.getElementById('valid-button');
let prefooter = document.getElementById('pre-footer');
let chatbox_station = document.getElementById('chatbox-station-name');
let chatbox_address = document.getElementById('chatbox-station-adress');
let chatbox_name = document.getElementById('chatbox-stored-user-name');
let chatbox_surname = document.getElementById('chatbox-stored-user-surname');
let cancelResaButton = document.getElementById('cancel-button');
// declaration des variables du timer
let timer = document.getElementById('timer');
let initialTime = 1200;
let counter = 0;
let localCounter = sessionStorage.getItem('counter');

if (localName !== null && localSurname !== null) { // si le local storage name et surname n'est pas vide, on affiche les valeurs
    name.value = localName;
    surname.value = localSurname;
}

if (sessionStorage.getItem('counter') !== null) {
    validResa();
}
//
function saveUserId() {
    localStorage.setItem('name', name.value); // recupere le contenu de name
    localStorage.setItem('surname', surname.value); // recupere le contenu de surname
    canvasContainer.style.display='block';
    canvasError.style.display='none';
}

canvasButton.addEventListener('click', saveUserId);
//myCanvas.canvasButton.addEventListener('click', saveUserId);

function timerGlobal() {

    function convertSeconds(s) {
        let minutes = Math.floor(s / 60); // on invoque la methode floor de l'objet math pour recuperer seulement un nombre entier
        let seconds = s % 60; // on recupere le reste du nombre entier 
        return minutes + ':' + seconds;
    }
    
    interval = setInterval(countx, 1000); // on lance la fonction countx toute les secondes a l'infini

    function countx() {
        if (sessionStorage.getItem('counter') == 0) { // quand le counter = 0 , le set [setInterval] se termine
            clearInterval(interval);
            setTimeout(() => {alert("Les 20 minutes sont écoulées. Vous pouvez à nouveau réserver un vélo."), 1000}); // trigger un message alert après une seconde pour informer l'utilisateur
            sessionStorage.clear();
            endTimer();
        }
        else if (sessionStorage.getItem('counter') !== null) { // si la mémoire de sessionStorage n'est pas nul, partir de là.
            sessionStorage.setItem('counter', sessionStorage.getItem('counter') -1); // soustrait -1 directement dans le storage de la key 'counter'
            timer.innerHTML = convertSeconds(sessionStorage.getItem('counter')); // affiche le compteur à l'utilisateur
        }
        else { // si la mémoire est vide, counter vaut initialTime
            sessionStorage.setItem('counter',  initialTime);
            timer.innerHTML = convertSeconds(sessionStorage.getItem('counter'));
        }
    }
    function endTimer() {
        sessionStorage.clear();
        mapSection.style.display='block';
        prefooter.style.display='none';
        sliderSection.style.display='block';
    }
}
function checkCanvas() {
    if(canvas.toDataURL() == blankCanvas) { // compare un canvas blanc superposée. si le canvas est vide, affiche un message error.
        canvasError.style.display='block';
    } else validResa();
}
function validResa() {
    canvasError.style.display='none';
    sessionStorage.setItem('station_address', station_address_lowcase);
    sessionStorage.setItem('station_name', station_name_lowcase);
    chatbox_station.innerHTML = sessionStorage.getItem('station_name');
    chatbox_address.innerHTML = sessionStorage.getItem('station_address');
    chatbox_name.innerHTML = localStorage.getItem('name');
    chatbox_surname.innerHTML = localStorage.getItem('surname');
    prefooter.style.display='block';
    mapSection.style.display='none';
    sliderSection.style.display='none';
    window.scrollBy(0, -1000);
    timerGlobal();
}

validCanvasButton.addEventListener('click', checkCanvas);

function cancelResa() {
    if (confirm("Êtes-vous sûr d'annuler votre réservation? Cette action est irréversible. Toutes les données seront effacées !")) {
        alert("Votre réservation a ete annulée avec succès");
        mapSection.style.display='block';
        prefooter.style.display='none';
        sliderSection.style.display='block';
        localStorage.clear();
        sessionStorage.clear();
    }
    else {
        alert("votre réservation n'a pas été annulée. Les données sont conservées.");
    }
}

cancelResaButton.addEventListener('click', cancelResa);
