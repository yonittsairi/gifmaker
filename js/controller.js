'use strict'
var gCanvas;
var gCtx;
var gBcg = '#fff';
var gStrokeColor = 'black';
var gdraw = -1
var gTxt;
var gCurrImg;
var gtxtWidth;
var gActive = false
var gRect;
var gFontSize = 60;
var gFontFamily = 'Impact';
var gAlign = 'center';
var gClick = 0;
var gRectExist = false;
var gClickedLine;
var gDrawing = false;
const KEY = 'memes';




function init() {
    gdraw = -1
    createGallery()
    var elContainer = document.querySelector('.canvas-container');
    gCanvas = document.querySelector('canvas')
    var elGif = document.querySelector('.gifpage')
    elGif.style.visibility = "hidden"
    gCanvas.width = elContainer.offsetWidth
    gCanvas.height = elContainer.offsetHeight
    clearInput()
    gCtx = gCanvas.getContext('2d')
}

function toggleDraw(ev) {
    console.log('toggel');
    gDrawing = gDrawing ? false : true;
    drawAllTxt()
}

function displayMemeGallery() {
    var elgallery = document.querySelector('.gallery meme')
    var elGrid = document.querySelector('.grid meme')
    elgallery.style.display = 'block'
    elGrid.style.display = 'grid'
    var elGif = document.querySelector('.gifpage')
    elGif.style.visibility = "hidden"
    var elContainer = document.querySelector('.canvas-container');
    gCanvas = document.querySelector('canvas')
    var elGif = document.querySelector('.gifpage')
    elGif.style.visibility = "hidden"


}
function displayGallery() {
    var elgallery = document.querySelector('.gallery')
    var elGrid = document.querySelector('.grid')
    elgallery.style.display = 'block'
    elGrid.style.display = 'grid'
    var elGif = document.querySelector('.gifpage')
    elGif.style.visibility = "hidden"

}

function findIdxById(id) {
    var idx = 0
    var lines = gMeme.lines
    if (gClickedLine && lines.length !== 0) {
        var currId = id
        idx = lines.findIndex(line => line.id === currId)
    }
    return idx
}



function rePosition(ev) {
    if (!gClickedLine) return
    if (!gDrawing) return
    if (gDrawing && gClickedLine) {
        var idx = gMeme.selectedLineIdx
        var { offsetX, offsetY } = ev;
        gClickedLine.x = offsetX
        gClickedLine.y = offsetY
        var lines = gMeme.lines
        lines.splice(idx, 1)
        lines.push(gClickedLine)
        toggleDraw(ev)
        drawAllTxt()
    }
    else return
}

function getLine(ev) {
    console.log('gettingline');
    var { offsetX, offsetY } = ev;
    if (gdraw === -1) return
    var lines = gMeme.lines
    gClickedLine = 0
    gClickedLine = lines.find(line => {
        return offsetX >= line.x && offsetX <= line.x + line.rectWidth
            && offsetY <= line.y && offsetY >= (line.y - line.size)

    })
    var id = gClickedLine.id
    var idx = findIdxById(id)
    console.log(idx);
    gMeme.selectedLineIdx = idx
    console.log(gMeme, id);
    drawRectSelected(gClickedLine)

    if (gClickedLine) {
        var elInput = document.querySelector('.write')
        elInput.value = gClickedLine.txt
    }
}

function deleteLine() {
    if (gdraw === -1) return
    if (gdraw === 0) {
        clearCanvas()
        drawImg()
        gdraw = -1
    }
    var idx = findIdxById(gClickedLine)
    var lines = gMeme.lines
    lines.splice(idx, 1)
    gdraw--
    drawAllTxt()
}



//toFix 
function drawRectSelected(gClickedLine) {
    if (!gClickedLine) return
    var x = gClickedLine.rectX
    var y = gClickedLine.rectY
    gtxtWidth = gClickedLine.rectWidth
    gFontSize = gClickedLine.size
    if (gClickedLine) {
        drawAllTxt()
        drawRect(x, y)

    }
}

function updateInput() {
    var elInput = document.querySelector('.write')
    if (!gClickedLine) return
    else {
        elInput.value = gClickedLine.txt
        var idx = gMeme.selectedLineIdx
        gMeme.line[idx].width =
            drawText()
        changeLine(idx)
        drawAllTxt()

    }
}



//Draw Func

function drawText(text, x, y) {
    gCtx.lineWidth = '1.5'
    gCtx.font = `${gFontSize}px ${gFontFamily}`
    gCtx.textAlign = gAlign
    gCtx.fillStyle = gBcg
    gCtx.strokeStyle = gStrokeColor
    gCtx.shadowColor = gStrokeColor
    gCtx.shadowBlur = 15;
    gCtx.strokeText(text, x, y)
    gCtx.fillText(text, x, y)
    gtxtWidth = gCtx.measureText(text).width

}
function drawRect(x, y) {
    gCtx.beginPath()
    gCtx.strokeStyle = 'black'
    gCtx.shadowBlur = 0;
    if (gdraw > 0) gtxtWidth = gClickedLine.rectWidth
    gCtx.rect(x - 10, y - 10, gtxtWidth * 1.268, gFontSize * 1.286) // x,y,widht,height
    gCtx.stroke()
}


function draw() {
    clearInput()
    if (!gTxt) return
    if (gTxt.length > 20) return alert('print only 15 letters')
    gActive = true
    gdraw++
    if (gdraw === 0) {
        drawText(gTxt, (gCanvas.width / 2), 100)
        let rectX = (gCanvas.width / 2) - (gtxtWidth / 2)
        let rectY = 100 - gFontSize
        let width = gtxtWidth
        createLine((gCanvas.width / 2), 100, width, rectX, rectY)
        drawAllTxt()
        drawRect(rectX, rectY)
        gRectExist = true
    }
    else if (gdraw === 1) {
        drawText(gTxt, (gCanvas.width / 2), gCanvas.height - 100)
        let rectX = (gCanvas.width / 2) - (gtxtWidth / 2)
        let rectY = gCanvas.height - gFontSize - 100
        let width = gtxtWidth
        createLine((gCanvas.width / 2), gCanvas.height - 100, width, rectX, rectY)
        drawAllTxt()
        drawRect(rectX, rectY)
    }
    else {
        drawText(gTxt, (gCanvas.width / 2), (gCanvas.height / 2))
        let rectX = (gCanvas.width / 2) - (gtxtWidth / 2)
        let rectY = (gCanvas.height / 2) - gFontSize
        let width = gtxtWidth
        createLine((gCanvas.width / 2), (gCanvas.height / 2), width, rectX, rectY)
        drawAllTxt()
        drawRect(rectX, rectY)

    }

}

function clearCanvas() {
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height)

}
function clearInput() {
    var elInput = document.querySelector('.clear')
    elInput.value = ''
}

function displayCanvas(el, id) {
    var elGif = document.querySelector('.gifpage')
    elGif.style.visibility = "visible"
    getSrc(el)
    drawImg(gCurrImg)
    saveMeme(id)
    var elgallery = document.querySelector('.gallery')
    var elGrid = document.querySelector('.grid')
    elgallery.style.display = 'none'
    elGrid.style.display = 'none'
}
function getSrc(el) {
    gCurrImg = el
}

//T Do
function setSearch(el) {
    var searchWord = el.value
    findMatch(searchWord)
}

function chooseLine() {
    if (gClick > gMeme.lines.length - 1) {
        gClick = 0
        clearCanvas()
        drawAllTxt()
    }
    else {
        gClickedLine = gMeme.lines[gClick]
        let x = gMeme.lines[gClick].x
        let y = gMeme.lines[gClick].y
        gFontSize = gMeme.lines[gClick].size
        gtxtWidth = gMeme.lines[gClick].rectWidth
        gMeme.selectedLineIdx = gClick + 1
        clearCanvas()
        drawAllTxt()
        drawRect(x - (gtxtWidth / 2), y - gFontSize)
        gClick++
    }
}

function drawAllTxt() {
    if (gMeme.lines) {
        gActive = true
        clearCanvas()
        drawImg(gCurrImg)
        var lines = gMeme.lines
        lines.forEach(line => {
            gTxt = line.txt
            gFontFamily = line.fontFamily
            gBcg = line.color
            gStrokeColor = line.stroke
            gFontSize = line.size
            gAlign = line.align
            gtxtWidth = line.rectWidth
            var x = line.x
            var y = line.y
            drawText(gTxt, x, y)
        }

        )
    };
    gActive = false
}

// function resizeCanvas() {
//     var elContainer = document.querySelector('.canvas-container');
//     // Note: changing the canvas dimension this way clears the canvas
//     console.log(elContainer.offsetWidth)
//     gCanvas.width = elContainer.offsetWidth
//     gCanvas.height = elContainer.offsetHeight
// }



///STYLE FUNC
function setTxt(txt) {
    if (gdraw >= 0) {
        clearCanvas()
        drawAllTxt()
    }
    gTxt = txt

}


function setFontFamily(value) {
    gFontFamily = value
}
function setBcg(value) {
    gBcg = value
}
function setClr(value) {
    gStrokeColor = value
}

function decFontSize() {
    if (gFontSize <= 5) return
    gFontSize -= 4
}
function incFontSize() {
    gFontSize += 4
    if (gFontSize > 90) return

}
function alignLft() { gAlign = 'left' }
function alignRgt() { gAlign = 'right' }
function alignCtr() { gAlign = 'center' }
function setFontFamily(value) {
    gFontFamily = value
}


function downloadImg(elLink) {
    drawAllTxt()
    if (!gActive) {
        var canvas = document.querySelector('.canva')
        var imgContent = canvas.toDataURL("image/jpg", 1.0)
        elLink.href = imgContent
    }

}

function saveMemes() {
    var memes = loadFromStorage(KEY)
    if (!memes || memes.length === 0) memes = gMeme
    else memes.push(gMeme)
    saveToStorage(KEY, memes)
    console.log(localStorage);
}

// scale ctx.scale(2, 2);