'use strict'
var gShape;
var gCanvas;
var gCtx;
var gBcg;
var gStroke;
var gWidth;
var gdraw = false


function init() {
    const elBox = document.querySelector('.canvas-container');
    gCanvas = document.querySelector('canvas')
    gCtx = gCanvas.getContext('2d')


}
function toggleTrue() {
    gdraw = true
}
function toggleFalse() {
    gdraw = false
}

function setTxt(txt) {
    createLine(txt)

}
function setWidth(width) {
    gWidth = width
}


function setBcg(value) {
    gBcg = value
}
function setClr(value) {
    gStroke = value
}



function drawLine(x, y, xEnd = RI(0, 600), yEnd = RI(0, 600)) {
    gCtx.beginPath()
    gCtx.moveTo(xEnd, yEnd)
    gCtx.lineTo(x, y)
    gCtx.closePath()
    gCtx.strokeStyle = gStroke
    gCtx.stroke()

}

function drawTriangle(x, y) {
    gCtx.beginPath()
    gCtx.moveTo(x, y)
    gCtx.lineTo(RI(0, 600), RI(0, 600))
    gCtx.lineTo(RI(0, 600), RI(0, 600))
    gCtx.closePath() //insted of lineTo(x,y) 
    gCtx.strokeStyle = gStroke
    gCtx.stroke()
    gCtx.fillStyle = gBcg
    gCtx.fill()
}

function drawRect(x, y, size) {
    if (size < 10) size = 15
    gCtx.beginPath()
    gCtx.rect(x, y, size, size) // x,y,widht,height
    gCtx.strokeStyle = gStroke
    gCtx.stroke()
    gCtx.fillStyle = gBcg
    gCtx.fillRect(x, y, size, size)
}

function drawArc(x, y, size) {
    if (size < 10) size = 15
    gCtx.beginPath()
    gCtx.strokeStyle = gStroke
    gCtx.lineWidth = gWidth
    gCtx.arc(x, y, size, 0, 2 * Math.PI); // x,y,r,sAngle,eAngle
    gCtx.stroke();
    gCtx.fillStyle = gBcg
    gCtx.fill()

}

function draw(ev) {
    console.log(gdraw);
    if (gdraw === true) {
        const offsetX = ev.offsetX
        const offsetY = ev.offsetY
        const SIZE = ev.movementX
        console.log('offsetX', offsetX, 'offsetY', offsetY)
        switch (gShape) {
            case 'triangle':
                drawTriangle(offsetX, offsetY)
                break;
            case 'square':
                drawRect(offsetX, offsetY, SIZE)
                break;
            case 'circle':
                drawArc(offsetX, offsetY, SIZE)
                break;
            case 'line':
                drawLine(offsetX, offsetY)
                break;
        }

    }
    else return
}
function clearCanvas() {
    console.log(gCanvas.width, gCanvas.height);
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height)

}

function RI(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

sampleBox()
function sampleBox() {

    const elBox = document.querySelector('.canvas-container');
    const hmrBox = new Hammer(elBox);

    hmrBox.on('panleft panright', (ev) => {
        console.log(ev)

    })

}
