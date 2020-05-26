class ResaModel {
    constructor() {
    this.name = document.getElementById('name-field');
    this.surname = document.getElementById('surname-field');
    this.localName = localStorage.getItem('name');
    this.localSurname = localStorage.getItem('surname');
    this.mapSection = document.getElementById('map-area');
    this.sliderSection = document.getElementById('slider-area');
    this.validCanvasButton = document.getElementById('valid-button');
    this.prefooter = document.getElementById('pre-footer');
    this.chatbox_station = document.getElementById('chatbox-station-name');
    this.chatbox_address = document.getElementById('chatbox-station-adress');
    this.chatbox_name = document.getElementById('chatbox-stored-user-name');
    this.chatbox_surname = document.getElementById('chatbox-stored-user-surname');
    this.cancelResaButton = document.getElementById('cancel-button');
    // declaration des variables du timer
    this.minutes;
    this.seconds;
    this.timer = document.getElementById('timer');
    this.initialTime = 1200;
    this.counter = 0;
    this.localCounter = sessionStorage.getItem('counter');
    this.checkStorageAndClickEvent();
    } // fin du constructor
    goFurther() {
        veloResa.name.style.display='block';
        veloResa.surname.style.display='block';
        veloCanvas.canvasButton.style.display='block';
    }
    dontGoFurther() {
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
        if (sessionStorage.getItem('counter') !== null) {
            this.validResa();
        }
        veloCanvas.canvasButton.addEventListener('click', () => {
            veloCanvas.canvasContainer.style.display='block';
            this.saveUserId();
        })
        this.validCanvasButton.addEventListener('click', () => this.checkCanvas()); 
        //this.validCanvasButton.addEventListener('click', this.checkCanvas());
        this.cancelResaButton.addEventListener('click', () => this.cancelResa());
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
        else this.validResa();
    }
    /***************** methodes du timer ***********************/
    convertSeconds(s) {
        this.minutes = Math.floor(s / 60); // on invoque la methode floor de l'objet math pour recuperer seulement un nombre entier
        this.seconds = s % 60; // on recupere le reste du nombre entier 
        return this.minutes + ':' + this.seconds;
    }
    endTimer() {
        sessionStorage.clear();
        this.mapSection.style.display='block';
        this.prefooter.style.display='none';
        this.sliderSection.style.display='block';
    }
    countx() {
        if (sessionStorage.getItem('counter') == 0) { // quand le counter = 0 , le set [setInterval] se termine
            clearInterval(this.interval);
            setTimeout(() => {alert("Les 20 minutes sont écoulées. Vous pouvez à nouveau réserver un vélo."), 1000}); // trigger un message alert après une seconde pour informer l'utilisateur
            sessionStorage.clear();
            this.endTimer();
        }
        else if (sessionStorage.getItem('counter') !== null) { // si la mémoire de sessionStorage n'est pas nul, partir de là.
            sessionStorage.setItem('counter', sessionStorage.getItem('counter') -1); // soustrait -1 directement dans le storage de la key 'counter'
            this.timer.innerHTML = this.convertSeconds(sessionStorage.getItem('counter')); // affiche le compteur à l'utilisateur
        }
        else { // si la mémoire est vide, counter vaut initialTime
            sessionStorage.setItem('counter',  this.initialTime);
            this.timer.innerHTML = this.convertSeconds(sessionStorage.getItem('counter'));
        }
    }
    startTimer() {
        this.interval = setInterval(this.countx, 1000); // on lance la fonction countx toute les secondes a l'infini
    }
    /******************************************************************************************************************************/
    validResa() {
        this.canvasError.style.display='none';
        sessionStorage.setItem('station_address', station_address_lowcase);
        sessionStorage.setItem('station_name', station_name_lowcase);
        this.chatbox_station.innerHTML = sessionStorage.getItem('station_name');
        this.chatbox_address.innerHTML = sessionStorage.getItem('station_address');
        this.chatbox_name.innerHTML = localStorage.getItem('name');
        this.chatbox_surname.innerHTML = localStorage.getItem('surname');
        this.prefooter.style.display='block';
        this.mapSection.style.display='none';
        this.sliderSection.style.display='none';
        window.scrollBy(0, -1000);
        this.startTimer();
    }
    cancelResa() {
        if (confirm("Êtes-vous sûr d'annuler votre réservation? Cette action est irréversible. Toutes les données seront effacées !")) {
            alert("Votre réservation a ete annulée avec succès");
            this.mapSection.style.display='block';
            this.prefooter.style.display='none';
            this.sliderSection.style.display='block';
            localStorage.clear();
            sessionStorage.clear();
        }
        else {
            alert("votre réservation n'a pas été annulée. Les données sont conservées.");
        }
    }
}

