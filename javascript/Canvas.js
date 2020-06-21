class CanvasModel {
    constructor() {
        this.canvasButton = document.getElementById('submit-canvas-button');
        this.canvasContainer = document.getElementById('canvasContainer');
        this.canvas = document.getElementById('canvas');
        this.ctx = canvas.getContext('2d');
        this.clearButton = document.getElementById('clear-button');
        this.painting = false; // booleen qui definit si user dessine ou pas
        this.blankCanvas = canvas.toDataURL();
        this.canvasError = document.getElementById('canvasErrorMsg');
        this.triggerCanvas(); //
    } // fin du constructor
    startDraw(e) {
        veloCanvas.painting = true;
        veloCanvas.drawing(e);
        console.log('a');
    }
    stopDraw() {
        veloCanvas.painting = false;
        veloCanvas.ctx.beginPath(); // echappe la souris si user stop clic
        console.log('b');
    }
    drawing(e) {
        console.log('c');
        if(!veloCanvas.painting) return; // si painting != true, on arrete drawing()
        veloCanvas.ctx.lineWidth = 4; // largeur du trait
        veloCanvas.ctx.lineCap = 'round'; // forme du trait
        veloCanvas.ctx.lineTo(e.offsetX, e.offsetY); // defini une ligne avec les coordonnees de la souris
        veloCanvas.ctx.stroke(); // dessine les contours [fill() rempli]
        veloCanvas.ctx.beginPath(); // coordonnees de depart du dessin
        veloCanvas.ctx.moveTo(e.offsetX, e.offsetY); // deplace le trait en fonction des mouvements de la souris
    }
    clearDraw() { // nettoie le canvas au clic du bouton effacer
        veloCanvas.clearButton = veloCanvas.ctx.clearRect(0, 0, veloCanvas.canvas.width, veloCanvas.canvas.height);
    }
    triggerCanvas() { // initie le canvas
        window.addEventListener('load', () => {
            this.canvas.width = 300;
            this.canvas.height = 150;
            this.listenSignature();
        })
    }
    listenSignature() { // on ecoute les interractions souris avec le canvas
        this.canvas.addEventListener('mousedown', this.startDraw); // ecrit si user clic [et maintient]
        this.canvas.addEventListener('mouseup', this.stopDraw); // arrete si user stop clic
        this.canvas.addEventListener('mouseleave', this.stopDraw);
        this.canvas.addEventListener('mousemove',  this.drawing);
        this.clearButton.addEventListener('click', this.clearDraw);
        // pour les utilisateurs sur écrans tactiles :
        this.canvas.addEventListener('touchstart', this.startDraw); // ecrit si user touche [et maintient]
        this.canvas.addEventListener('touchmove', this.drawing);
        this.canvas.addEventListener('touchend', this.stopDraw);



    }

}
