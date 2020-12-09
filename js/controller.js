'use strict'
var gCanvas;
var gCtx;
var gBcg;
var gStroke;
var gWidth;
var gdraw = true
var gCurrImg


function init() {
    createGallery()
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



function drawText(text, x, y) {
    gCtx.lineWidth = '1.5'
    gCtx.font = `${gFontSize}px  ${gFontFamily}`
    gCtx.textAlign = 'center'
    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
}

function draw(ev) {
    var meme = getMeme()
    if (gdraw === true) {
        const offsetX = ev.offsetX
        const offsetY = ev.offsetY
        const SIZE = ev.movementX
        console.log('offsetX', offsetX, 'offsetY', offsetY)
        drawText(meme.lines[0].txt, offsetX, offsetY)

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



function getMeme() {
    return gMeme
}

function displayCanvas(el) {
    getSrc(el)
    drawImg(gCurrImg)
    var elgallery = document.querySelector('.gallery')
    var elGrid = document.querySelector('.grid')
    elgallery.style.display = 'none'
    elGrid.style.display = 'none'
}
function getSrc(el) {
    gCurrImg = el
}

function setSearch(el) {
    var searchWord = el.value
    findMatch(searchWord)
}

// function resizeCanvas() {
//     var elContainer = document.querySelector('.canvas-container');
//     // Note: changing the canvas dimension this way clears the canvas
//     console.log(elContainer.offsetWidth)
//     gCanvas.width = elContainer.offsetWidth
//     gCanvas.height = elContainer.offsetHeight
// }


function getImgToDisplay() { }


function addLine() { }
function chooseLine() { }
function clearLine() { }
function alignLft() { }
function alignRgt() { }
function alignCtr() { }

function decFontSize() {
    if (gFontSize <= 5) return
    gFontSize -= 4
}
function incFontSize() {
    gFontSize += 4
    if (gFontSize > 90) return

}

function textStroke() { }