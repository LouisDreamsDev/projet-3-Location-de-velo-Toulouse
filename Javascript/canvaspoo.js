class CanvasModel {
    constructor() {
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
        this.painting = true;
        this.drawing(e);
    }
    stopDraw() {
        this.painting = false;
        this.ctx.beginPath();
    }
    drawing() {
        if(!this.painting) return;
        this.ctx.lineWidth = 2;
        this.ctx.lineCap = 'butt';
        this.ctx.lineTo(this.e.layerX, this.e.layerY);
        this.ctx.stroke();
        this.ctx.beginPath();
        this.ctx.moveTo(this.e.layerX, this.e.layerY);
    }
    clearDraw() {
        this.clearButton = this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    triggerCanvas() {
        
        window.addEventListener('load', () => {
            console.log("canvas");
            
        })
        */
    }
    /*
    moveMouseDown() {
        this.canvas.addEventListener('mousedown', this.startDraw);
    }
    moveMouseUp() {
        this.canvas.addEventListener('mouseup', this.startDraw);
    }
    leaveMouse() {
        this.canvas.addEventListener('mouseleave', this.stopDraw);
    }
    mouseMove() {
        this.canvas.addEventListener('mousemove', this.drawing);
    }
    clearCanvas() {
        this.canvas.addEventListener('click', this.clearDraw);
    }
    */
}
