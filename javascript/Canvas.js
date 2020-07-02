class CanvasModel {

    constructor(id) {

        this.canvas = $("#" + id);
        this.canvasJS = document.getElementById(id);
        this.id = id;
        this.clickX = [];
        this.clickY = [];
        this.clickDrag = [];
        this.paint = false;
        this.context = document.getElementById(id).getContext("2d");

        this.canvas.mousedown((e) => {

            const mouseX = e.clientX - this.canvasJS.getBoundingClientRect().left;
            const mouseY = e.clientY - this.canvasJS.getBoundingClientRect().top;
            this.paint = true;

            this.addClick(mouseX, mouseY);
            this.redraw();
        });


        this.canvas.mousemove((e) => {

            if (this.paint) {

                const mouseX = e.clientX - this.canvasJS.getBoundingClientRect().left;
                const mouseY = e.clientY - this.canvasJS.getBoundingClientRect().top;

                this.addClick(mouseX, mouseY, true);
                this.redraw();
            }
        });

        this.canvas.mouseup(() => {
            this.paint = false;
        });

        this.canvas.mouseout(() => {
            this.paint = false;
        });

        $("#clear" + id).on('click', () => {

            this.clickX = [];
            this.clickY = [];
            this.clickDrag = [];
            this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
        });

    }

    addClick(x, y, dragging) {

        this.clickX.push(x);
        this.clickY.push(y);
        this.clickDrag.push(dragging);
    }

    redraw() {

        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
        this.context.strokeStyle = "#df4b26";
        this.context.lineJoin = "round";
        this.context.lineWidth = 5;

        for (let i = 0; i < this.clickX.length; i++) {

            this.context.beginPath();
            if (this.clickDrag[i] && i) {

                this.context.moveTo(this.clickX[i - 1], this.clickY[i - 1]);
            } else {

                this.context.moveTo(this.clickX[i] - 1, this.clickY[i]);
            }
            this.context.lineTo(this.clickX[i], this.clickY[i]);
            this.context.closePath();
            this.context.stroke();
        }
    }

    isEmpty() {

        return document.getElementById(this.id).toDataURL() === document.getElementById('emptyCanvas').toDataURL();
    }
}


class CanvasModel {
    constructor() {
        this.canvasButton = document.getElementById('submit-canvas-button');
        this.canvasContainer = document.getElementById('canvasContainer');
        this.canvasElement = document.getElementById('canvas');
        this.canvasElement.width = 3000;
        this.canvasElement.height = 1500;
        this.canvas = this.canvasElement.getContext('2d');
        this.clearButton = document.getElementById('clear-button');
        this.painting = false; // booleen qui enregistre si user dessine ou pas
        //this.blankCanvas = this.canvasElement.toDataURL();
        this.canvasError = document.getElementById('canvasErrorMsg');
        this.mousePos;
        this.rect;
        this.listenSignature();
    } // fin du constructor
  
    listenSignature() { 
    //pour les utilisateurs sur écrans tactiles :
  
        this.canvasElement.addEventListener('touchstart', (e) => {
            this.drawTouch(e.changedTouches[0].clientX, e.changedTouches[0].screenY);
        });
  
        this.canvasElement.addEventListener('touchmove', (e) => {
            e.preventDefault();
            this.mousePos = this.getMousePos(e);
            console.log(this.mousePos.x);
            this.drawTouch(e.changedTouches[0].clientX, e.changedTouches[0].screenY);
            console.log(e.touches);
        });
    }
    getMousePos(e) {
        this.rect = veloCanvas.canvasElement.getBoundingClientRect();
        return {
          x: e.clientX - this.rect.left,
          y: e.clientY - this.rect.top
        };
    }
  
    drawTouch(x, y) {
        this.canvas.lineWidth = 9;
        this.canvas.lineCap = 'square';
        this.canvas.lineTo(x, y);
        this.canvas.stroke();
        this.canvas.beginPath();
        this.canvas.moveTo(x, y);
    }
  }


