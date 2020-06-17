class SliderModel {
    constructor() {
        this.images = document.getElementsByClassName("slider-image");
        this.sliderIndex = 0;
        this.playButton = document.getElementById('play-button');
        this.stopButton = document.getElementById('stop-button');
        this.leftButton = document.getElementById('left-arrow');
        this.rightButton = document.getElementById('right-arrow');
        this.listenUserKey();
        this.listenClickOnButton();
        this.autoPlay();
    } // fin du constructor
    listenUserKey() {
        document.body.addEventListener('keydown', (e) => { // ecoute les touches droites et gauches du clavier
        if (e.keyCode == 37) {
            this.leftSlide();
        }
        else if (e.keyCode == 39) {
            this.rightSlide();
        }
        })
    }
    listenClickOnButton() { // ecoute les clics boutons
        this.leftButton.addEventListener('click', () => {
            this.leftSlide();
        })
        this.rightButton.addEventListener('click', () => {
            this.rightSlide();
        })
        this.stopButton.addEventListener('click', () => {
            this.stopSlide();
        })
        this.playButton.addEventListener('click', () => {
            this.replaySlide();
        })
    }
    autoPlay() { // lance le defilement automatiques des images toutes les 5 secondes
        this.chrono = setInterval (() => this.diaporama(), 5000);
    }
    diaporama() {
        for(let i = 0; i < this.images.length; i++) {
            this.images[i].style.display = "none";
        }
        this.sliderIndex++; // sliderIndex compte les img
        if (this.sliderIndex > this.images.length) { // si on atteint la derniere img, revient a la 1ere
            this.sliderIndex = 1;
        }
        this.images[this.sliderIndex-1].style.display = "block";
    }
    stopSlide() { // arrete le chrono et switch les boutons stop et play
        clearInterval(this.chrono);
        this.stopButton.style.display="none";
        this.playButton.style.display="block";
    }
    replaySlide() { // re switch les boutons et relance le defilemetn auto
        this.stopButton.style.display="block";
        this.playButton.style.display="none";
        this.autoPlay();
    }
    leftSlide() { // fonction inverse de diaporama()
        this.stopSlide();
        for (let i = 0; i < this.images.length; i++) {
            this.images[i].style.display = "none";
        }
        if (this.sliderIndex == 0) {
            this.sliderIndex = this.images.length-1;
        }
        else {
            this.sliderIndex--;
        }
        this.images[this.sliderIndex].style.display = "block";
    }
    rightSlide() {
        this.stopSlide();
        this.diaporama();
    }
}
