class CanvasModel {

    constructor() {

        this.canvasButton = document.getElementById('submit-canvas-button');
        this.canvasContainer = document.getElementById('canvasContainer');
        this.canvasElement = document.getElementById('canvas');
        this.canvasElement.width = 300;
        this.canvasElement.height = 150;
        this.canvas = this.canvasElement.getContext('2d');
        this.clearButton = document.getElementById('clear-button');
        this.painting = false; // booleen qui enregistre si user dessine ou pas
        this.blankCanvas = this.canvasElement.toDataURL();
        this.canvasError = document.getElementById('canvasErrorMsg');
        this.listenSignature();

    } // fin du constructor
    startDraw(e) {
        this.painting = true;
        veloCanvas.drawing(e);
    }

    stopDraw() {
        this.painting = false;
        veloCanvas.canvas.beginPath(); // echappe la souris si user stop clic
    }

    drawing(e) { // moteur de la class
        if(!this.painting) return; // si painting != true, on arrete drawing()
        veloCanvas.canvas.lineWidth = 4; // largeur du trait
        veloCanvas.canvas.lineCap = 'round'; // forme du trait
        veloCanvas.canvas.lineTo(e.offsetX, e.offsetY); // defini une ligne avec les coordonnees de la souris
        veloCanvas.canvas.stroke(); // dessine les contours [fill() rempli]
        veloCanvas.canvas.beginPath(); // coordonnees de depart du dessin
        veloCanvas.canvas.moveTo(e.offsetX, e.offsetY); // deplace le trait en fonction des mouvements de la souris
    }
    clearDraw() { // nettoie le canvas au clic du bouton effacer
        veloCanvas.clearButton = veloCanvas.canvas.clearRect(0, 0, veloCanvas.canvasElement.width, veloCanvas.canvasElement.height);
    }

    listenSignature() { 
        this.canvasElement.addEventListener('mousedown', this.startDraw);
        this.canvasElement.addEventListener('mouseup', this.stopDraw);
        this.canvasElement.addEventListener('mouseleave', this.stopDraw);
        this.canvasElement.addEventListener('mousemove',  this.drawing);
        this.clearButton.addEventListener('click', this.clearDraw);

    // pour les utilisateurs sur écrans tactiles :

        this.canvasElement.addEventListener('touchstart', (e) => {
            this.touching = true;
            const mouseX = e.changedTouches[0].clientX - veloCanvas.canvasElement.getBoundingClientRect().left;
            const mouseY = e.changedTouches[0].clientY - veloCanvas.canvasElement.getBoundingClientRect().top;
            this.canvas.beginPath();
            this.drawTouch(mouseX, mouseY);
        });
  
        this.canvasElement.addEventListener('touchmove', (e) => {
            this.painting = true;
            e.preventDefault();
            const mouseX = e.changedTouches[0].clientX - veloCanvas.canvasElement.getBoundingClientRect().left;
            const mouseY = e.changedTouches[0].clientY - veloCanvas.canvasElement.getBoundingClientRect().top;
            this.drawTouch(mouseX, mouseY);

        });
        this.canvasElement.addEventListener("touchleave", this.stopDraw);
        this.canvasElement.addEventListener("touchend", this.stopDraw);
        this.canvasElement.addEventListener("touchcancel", this.stopDraw);
    }

    drawTouch(x, y) {
        if (!this.touching) return;
        this.canvas.lineWidth = 4;
        this.canvas.lineCap = 'round';
        this.canvas.lineTo(x, y);
        this.canvas.stroke();
        this.canvas.beginPath();
        this.canvas.moveTo(x, y);
    }
  }