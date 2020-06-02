class CanvasModel {
    constructor(e) {
        this.canvasButton = document.getElementById('submit-canvas-button');
        this.canvasContainer = document.getElementById('canvasContainer');
        this.canvas = document.getElementById('canvas');
        this.ctx = canvas.getContext('2d');
        this.clearButton = document.getElementById('clear-button');
        this.painting = false;
        this.blankCanvas = canvas.toDataURL();
        this.canvasError = document.getElementById('canvasErrorMsg'); 
        this.triggerCanvas();
    } // fin du constructor
    startDraw(e) {
        veloCanvas.painting = true;
        veloCanvas.drawing(e);
    }
    stopDraw() {
        veloCanvas.painting = false;
        veloCanvas.ctx.beginPath();
    }
    drawing(e) {
        if(!veloCanvas.painting) return;
        veloCanvas.ctx.lineWidth = 2;
        veloCanvas.ctx.lineCap = 'butt';
        veloCanvas.ctx.lineTo(e.layerX, e.layerY);
        veloCanvas.ctx.stroke();
        veloCanvas.ctx.beginPath();
        veloCanvas.ctx.moveTo(e.layerX, e.layerY);
    }
    clearDraw() {
        veloCanvas.clearButton = veloCanvas.ctx.clearRect(0, 0, veloCanvas.canvas.width, veloCanvas.canvas.height);
    }
    triggerCanvas() {
        window.addEventListener('load', () => {
            this.canvas.width = 300;
            this.canvas.height = 150;
            this.listenSignature();
        })
    }
    listenSignature() {
        this.canvas.addEventListener('mousedown', this.startDraw);
        this.canvas.addEventListener('mouseup', this.stopDraw);
        this.canvas.addEventListener('mouseleave', this.stopDraw);
        this.canvas.addEventListener('mousemove',  this.drawing);
        this.clearButton.addEventListener('click', this.clearDraw); 
    }

}
