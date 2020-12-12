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
var isDrawing = false;
const KEY = 'memes';
var gX;
var gY;



function init() {
    gdraw = -1
    createGallery()
    displayGallery()
    var elContainer = document.querySelector('.canvas-container');
    gCanvas = document.querySelector('canvas')
    // var elGif = document.querySelector('.gifpage')
    // elGif.style.visibility = "hidden"
    gCanvas.width = elContainer.offsetWidth
    gCanvas.height = elContainer.offsetHeight
    clearInput()
    gCtx = gCanvas.getContext('2d')
}





// function displayMemeGallery() {
//     var elgallery = document.querySelector('.gallery meme')
//     var elGrid = document.querySelector('.grid meme')
//     elgallery.style.display = 'block'
//     elGrid.style.display = 'grid'
//     var elGif = document.querySelector('.gifpage')
//     elGif.style.visibility = "hidden"
//     var elContainer = document.querySelector('.canvas-container');
//     gCanvas = document.querySelector('canvas')
//     var elGif = document.querySelector('.gifpage')
//     elGif.style.visibility = "hidden"


// }
function displayGallery() {
    var elgallery = document.querySelector('.gallery')
    var elgalleryCon = document.querySelector('.gallery-container')
    var elGrid = document.querySelector('.grid')
    elgalleryCon.style.display = 'flex'
    elgallery.style.display = 'block'
    elGrid.style.display = 'grid'
    elgallery.style.opacity = '1'
    var elSearch = document.querySelector('.search-bar')
    elSearch.style.display = 'flex'
    var elGif = document.querySelector('.paint')
    var elMain2 = document.querySelector('.main2')
    elGif.style.visibility = 'hidden'
    elMain2.style.visibility = 'hidden'
    // elMain2.style.opacity = 0
    elMain2.classList.add('height')
    // elGif.style.display = 'none'
    renderKeyWords()
}



function displayCanvas(el, id) {
    var elGif = document.querySelector('.gifpage')
    var elGif = document.querySelector('.gifpage')
    elGif.style.visibility = "visible"
    getSrc(el)
    drawImg(gCurrImg)
    saveMeme(id)
    var elgallery = document.querySelector('.gallery')
    var elGrid = document.querySelector('.grid')
    elgallery.style.opacity = '0'
    elGrid.style.display = 'none'
    var elGif = document.querySelector('.paint')
    elGif.style.visibility = 'visible'
    var elMain2 = document.querySelector('.main2')
    elMain2.style.visibility = 'visible'
    elMain2.classList.remove('height')
    // elMain2.style.opacity = 1
    var elgalleryCon = document.querySelector('.gallery-container')
    elgalleryCon.style.display = 'none'
    var elSearch = document.querySelector('.search-bar')
    elSearch.style.display = 'none'
    // elGif.style.display = 'block'
    // elGif.style.display = 'flex'

}

function renderKeyWords() {
    var keyWordsArray = Object.keys(gKeywords)
    var strHtmls = keyWordsArray.map(key =>
        `<div class="${key}" onclick="filterGallery('${key}')">${key}</div>`)
    var searchWords = document.querySelector('.search-words')
    searchWords.innerHTML = strHtmls.join('')
}

function toggleDraw(ev) {
    isDrawing = true;
    gX = ev.offsetX;
    gY = ev.offsetY;

}


function rePosition(ev) {
    if (isDrawing === true) {
        var { offsetX, offsetY } = ev;
        gX = ev.offsetX;
        gY = ev.offsetY;
        if (offsetX < gtxtWidth || offsetX > gCanvas.width - gtxtWidth || offsetY < gFontSize || offsetY > gCanvas.height - gFontSize) return
        // drawRect(offsetX, offsetY)
    }

}
function mouseUp(ev) {
    if (isDrawing === true) {
        var { offsetX, offsetY } = ev;
        var idx = gMeme.selectedLineIdx
        gClickedLine.x = offsetX
        gClickedLine.y = offsetY
        gClickedLine.rectX = gClickedLine.x - (gtxtWidth / 2) + 5
        gClickedLine.rectY = gClickedLine.y - gFontSize + 10
        var lines = gMeme.lines
        lines.splice(idx, 1)
        lines.push(gClickedLine)
        gX = 0;
        gY = 0;
        isDrawing = false;
        gClickedLine = 0
        drawAllTxt()
    }
}



function getLine(ev) {
    var { offsetX, offsetY } = ev;
    if (gdraw === -1) return
    var lines = gMeme.lines
    gClickedLine = lines.find(line => {
        return (offsetX >= line.rectX && offsetX <= (line.rectX * 1.286 + line.rectWidth)
            && offsetY >= (line.rectY - line.size) && offsetY <= (line.rectY + line.size))

    })
    var currId = gClickedLine.id
    var idx = findIdxById(currId)
    console.log(idx);
    gMeme.selectedLineIdx = idx
    console.log(gMeme, currId);
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
    if (gdraw > 0 && gClickedLine) gtxtWidth = gClickedLine.rectWidth
    gCtx.rect(x - 10, y - 10, gtxtWidth + 15, gFontSize * 1.286) // x,y,widht,height
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


function getSrc(el) {
    gCurrImg = el
}

//To Do

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

function resizeCanvas() {
    var elContainer = document.querySelector('.canvas-container');
    // Note: changing the canvas dimension this way clears the canvas
    console.log(elContainer.offsetWidth)
    gCanvas.width = elContainer.offsetWidth
    gCanvas.height = elContainer.offsetHeight
}



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
function save() {
    saveMemes()
}

function setSearch(word) {
    filterGallerybyTyping(word);

}
function toggleMenu() {
    var elList = document.querySelector('ul')
    elList.classList.toggle('visible')
}
function closeMenu() {
    var elList = document.querySelector('ul')
    elList.classList.toggle('visible')

}

// scale ctx.scale(2, 2);

function uploadImg(elForm, ev) {
    ev.preventDefault();
    document.getElementById('imgData').value = gCanvas.toDataURL("image/jpeg");

    // A function to be called if request succeeds
    function onSuccess(uploadedImgUrl) {
        uploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        document.querySelector('.share-container').innerHTML = `
        <a class="btn facbook" href="https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}" title="Share on Facebook" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}'); return false;">
           Share   
        </a>`

    }

    doUploadImg(elForm, onSuccess);
}

function doUploadImg(elForm, onSuccess) {
    var formData = new FormData(elForm);
    fetch('http://ca-upload.com/here/upload.php', {
        method: 'POST',
        body: formData
    })
        .then(function (res) {
            return res.text()
        })
        .then(onSuccess)
        .catch(function (err) {
            console.error(err)
        })
}
