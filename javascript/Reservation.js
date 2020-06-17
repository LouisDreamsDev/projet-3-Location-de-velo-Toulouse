class ResaModel {
    constructor() {
    this.name = document.getElementById('name-field');
    this.surname = document.getElementById('surname-field');
    this.localName = localStorage.getItem('name');
    this.localSurname = localStorage.getItem('surname');
    this.mapSection = document.getElementById('map-area');
    this.sliderSection = document.getElementById('slider-area');
    this.detailsWindow = document.getElementById('details-window');
    this.validCanvasButton = document.getElementById('valid-button');
    this.prefooter = document.getElementById('pre-footer');
    this.chatbox_station = document.getElementById('chatbox-station-name');
    this.chatbox_address = document.getElementById('chatbox-station-adress');
    this.chatbox_name = document.getElementById('chatbox-stored-user-name');
    this.chatbox_surname = document.getElementById('chatbox-stored-user-surname');
    this.cancelResaButton = document.getElementById('cancel-button');
    this.canvasError = document.getElementById('canvasErrorMsg');
    this.cancelResaBox = document.getElementById('cancel-resa-box');
    this.confirmCancelButton = document.getElementById('confirm-cancel');
    this.noCancelButton = document.getElementById('no-cancel');
    this.timer = document.getElementById('timer');
    this.minutes;
    this.seconds;
    this.initialTime = 1200;
    this.counter = null;
    this.localCounter = sessionStorage.getItem('counter');
    this.checkStorageAndClickEvent();
    } // fin du constructor
    goFurther() { // affiche les inputs
        veloResa.name.style.display='block';
        veloResa.surname.style.display='block';
        veloCanvas.canvasButton.style.display='block';
    }
    dontGoFurther() { // faiat disparaitre les inputs
        veloResa.name.style.display='none';
        veloResa.surname.style.display='none';
        veloCanvas.canvasButton.style.display='none';
        veloCanvas.canvasContainer.style.display='none';
    }
    checkStorageAndClickEvent() {
        if (this.localName !== null && this.localSurname !== null) { // si le local storage name et surname n'est pas vide, on affiche les valeurs
            this.name.value = this.localName;
            this.surname.value = this.localSurname;
        }
        if (sessionStorage.getItem('counter') !== null) { // poursuit le compteur si il est en fonction
            this.validResa();
        }
        veloCanvas.canvasButton.addEventListener('click', () => {
            this.checkForm();
        })
        this.validCanvasButton.addEventListener('click', () => this.checkCanvas());
        this.cancelResaButton.addEventListener('click', () => this.cancelResa());
    }
    checkForm() { // check si string
        if (this.name.value && this.surname.value != "") {
            this.saveUserId();
            veloCanvas.canvasContainer.style.display='block';
        }
    }
    saveUserId() {
        localStorage.setItem('name', this.name.value); // recupere le contenu de name
        localStorage.setItem('surname', this.surname.value); // recupere le contenu de surname
        veloCanvas.canvasContainer.style.display='block';
        veloCanvas.canvasError.style.display='none';

    }
    checkCanvas() {
        if(veloCanvas.canvas.toDataURL() == veloCanvas.blankCanvas) { // compare un canvas blanc superposée. si le canvas est vide, affiche un message error.
            veloCanvas.canvasError.style.display='block';
        }
        else {
            sessionStorage.setItem('station_address', veloMap.station.address.toLowerCase());
            sessionStorage.setItem('station_name', veloMap.station.name.toLowerCase());
            this.validResa();
        }
    }
    /***************** methodes du timer ***********************/
    convertSeconds(s) {
        veloResa.minutes = Math.floor(s / 60); // on invoque la methode floor de l'objet math pour recuperer seulement un nombre entier
        veloResa.seconds = s % 60; // on recupere le reste du nombre entier
        return veloResa.minutes + ':' + veloResa.seconds;
    }
    endTimerAndReset() {
        sessionStorage.clear();
        this.mapSection.style.display='block';
        this.prefooter.style.display='none';
        this.sliderSection.style.display='block';
        this.detailsWindow.style.display='none';
        veloCanvas.clearDraw();
        this.name.value = this.localName;
        this.surname.value = this.localSurname;
    }
    countx() {
        if (sessionStorage.getItem('counter') == 0) { // quand le counter = 0 , le set [setInterval] se termine
            clearInterval(veloResa.interval);
            setTimeout(() => {alert("Les 20 minutes sont écoulées. Vous pouvez à nouveau réserver un vélo."), 1000}); // trigger un message alert après une seconde pour informer l'utilisateur
            sessionStorage.clear();
            localStorage.clear();
            veloResa.endTimerAndReset();
        }
        else if (sessionStorage.getItem('counter') !== null) { // si la mémoire de sessionStorage n'est pas nul, partir de là.
            sessionStorage.setItem('counter', sessionStorage.getItem('counter') -1); // soustrait -1 directement dans le storage de la key 'counter'
            this.timer.innerHTML = veloResa.convertSeconds(sessionStorage.getItem('counter')); // affiche le compteur à l'utilisateur
        }
        else if (sessionStorage.getItem('counter') === null) { // si la mémoire est vide, counter vaut initialTime [1200]
            sessionStorage.setItem('counter',  veloResa.initialTime);
            this.timer.innerHTML = veloResa.convertSeconds(sessionStorage.getItem('counter'));
        }
    }
    startTimer() {
        this.interval = setInterval(this.countx, 1000); // on lance la fonction countx toute les secondes a l'infini
    }
    /******************************************************************************************************************************/
    validResa() { // affiche le prefooter et lance le timer + retour en haut de page
        this.saveUserId();
        this.canvasError.style.display='none';
        this.chatbox_station.innerHTML = sessionStorage.getItem('station_name');
        this.chatbox_address.innerHTML = sessionStorage.getItem('station_address');
        this.chatbox_name.innerHTML = localStorage.getItem('name');
        this.chatbox_surname.innerHTML = localStorage.getItem('surname');
        this.prefooter.style.display='block';
        this.mapSection.style.display='none';
        this.sliderSection.style.display='none';
        this.cancelResaBox.style.display="none";
        window.scrollBy(0, -1000); // retour en haut de la page
        this.startTimer();
    }
    cancelResa() { // interactions pour l'annulation
        this.cancelResaBox.style.display="block";
        this.confirmCancelButton.addEventListener('click', () => {
            clearInterval(veloResa.interval);
            this.endTimerAndReset();
        });
        this.noCancelButton.addEventListener('click', () => {
            this.cancelResaBox.style.display="none";
        });
    }
}
