'use strict'
var gCanvas;
var gCtx;
var gTxt;
var gdraw = -1
var gCurrImg;
var gActive = false
var gRect;
var gClick = 0;
var gRectExist = false;
var gClickedLine;
var isDrawing = false;
var gX;
var gY;
var gDiff = 0
var refresh
var gBcg = '#fff';
var gStrokeColor = 'black';
var gtxtWidth;
var gFontSize = 60;
var gFontFamily = 'Impact';
var gAlign = 'center';

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
    if (!gCurrImg.includes("data:")) { drawImg(gCurrImg), saveMeme(id) }
    if (gCurrImg.includes("data:")) {
        debugger
        let memesArray = loadFromStorage(KEY);
        gMeme = memesArray.find(meme => meme.urlData === gCurrImg)
        gCurrImg = gMeme.url
        drawImg(gCurrImg)
        drawAllTxt()
    }
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
        `<div class="${key}" style="font-size:${gKeywords[key] * 16}px" onclick="filterGallery('${key}')">${key}</div>`)
    var searchWords = document.querySelector('.search-words')
    searchWords.innerHTML = strHtmls.join('')
}

function displayMemesGallery() {
    var savedMemes = loadFromStorage(KEY)
    createMemesGallery(savedMemes)
    displayGallery()
}
function createMemesGallery(array) {
    var elGrid = document.querySelector('.grid')
    var strHtmls = array.map(meme =>
        `<img src=${meme.urlData} id=${meme.id} onclick="displayCanvas('${meme.urlData}','${meme.id}')">`
    )
    elGrid.innerHTML = strHtmls.join('')
}
function toggleDraw() {
    isDrawing = true;

}

function rePosition(ev) {
    ev.preventDefault()
    if (isDrawing === true) {
        if (ev.type.includes("touch")) {
            var rect = ev.target.getBoundingClientRect();
            if (!ev.targetTouches.length) return
            let x = ev.targetTouches[0].pageX - rect.left;
            let y = ev.targetTouches[0].pageY - rect.top;
            if (offsetX < gtxtWidth || offsetX > gCanvas.width - gtxtWidth || offsetY < gFontSize || offsetY > gCanvas.height - gFontSize) return
            gX = x
            gY = y

        }
        else {
            var { offsetX, offsetY } = ev;
            if (offsetX < gtxtWidth || offsetX > gCanvas.width - gtxtWidth || offsetY < gFontSize || offsetY > gCanvas.height - gFontSize) return
            gX = ev.offsetX;
            gY = ev.offsetY;

        }
    }
}


function mouseUp(ev) {
    isDrawing = false;
    var currX;
    var currY;
    if (isDrawing === false) {
        if (ev.type.includes("touch")) {
            var rect = ev.target.getBoundingClientRect();
            if (!ev.targetTouches.length) return
            let x = ev.targetTouches[0].pageX - rect.left;
            let y = ev.targetTouches[0].pageY - rect.top;
            if (offsetX < gtxtWidth || offsetX > gCanvas.width - gtxtWidth || offsetY < gFontSize || offsetY > gCanvas.height - gFontSize) return
            currX = x
            currY = y
        }
        else {
            currX = ev.offsetX
            currY = ev.offsetY
            var idx = gMeme.selectedLineIdx
            gClickedLine.x = currX
            gClickedLine.y = currY
        }
        gClickedLine.rectX = gClickedLine.x - (gtxtWidth / 2) + 5
        gClickedLine.rectY = gClickedLine.y - gFontSize + 10
        var lines = gMeme.lines
        lines.splice(idx, 1)
        lines.push(gClickedLine)
        gX = 0;
        gY = 0;

        drawAllTxt()
    }
}


function getLine(ev) {
    if (gdraw === -1) return
    var currX;
    var currY;
    if (ev.type.includes("touch")) {
        var rect = ev.target.getBoundingClientRect();
        if (!ev.targetTouches.length) return
        let x = ev.targetTouches[0].pageX - rect.left;
        let y = ev.targetTouches[0].pageY - rect.top;
        currX = x
        currY = y
    }
    else {
        currX = ev.offsetX
        currY = ev.offsetY
    }
    var lines = gMeme.lines
    gClickedLine = lines.find(line => {
        return (currX >= line.rectX && currX <= (line.rectX * 1.286 + line.rectWidth)
            && currY >= (line.rectY - line.size) && currY <= (line.rectY + line.size))

    })
    var currId = gClickedLine.id
    var idx = findIdxById(currId)
    gMeme.selectedLineIdx = idx
    if (gClickedLine) {
        var elInput = document.querySelector('.write')
        elInput.value = gClickedLine.txt
        drawRectSelected(gClickedLine)
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
    gCtx.rect(x - 10 + gDiff, y - 10, gtxtWidth + 15, gFontSize * 1.286) // x,y,widht,height
    gCtx.stroke()
}
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
        refreshPge()


    }
    else if (gdraw === 1) {
        drawText(gTxt, (gCanvas.width / 2), gCanvas.height - 100)
        let rectX = (gCanvas.width / 2) - (gtxtWidth / 2)
        let rectY = gCanvas.height - gFontSize - 100
        let width = gtxtWidth
        createLine((gCanvas.width / 2), gCanvas.height - 100, width, rectX, rectY)
        drawRect(rectX, rectY)
        refreshPge()

    }
    else {
        drawText(gTxt, (gCanvas.width / 2), (gCanvas.height / 2))
        let rectX = (gCanvas.width / 2) - (gtxtWidth / 2)
        let rectY = (gCanvas.height / 2) - gFontSize
        let width = gtxtWidth
        createLine((gCanvas.width / 2), (gCanvas.height / 2), width, rectX, rectY)
        drawAllTxt()
        drawRect(rectX, rectY)
        refreshPge()


    }
    clearInput()

}



function clearCanvas() {
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height)

}
function clearInput() {
    var elInput = document.querySelector('.clear')
    elInput.value = ''
    gClickedLine = 0

}

function getSrc(el) {
    gCurrImg = el
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



function updateCanvas() {
    changeLine()
    drawAllTxt()
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
    drawAllTxt()
    var canvas = document.querySelector('.canva')
    var imgContent = canvas.toDataURL("image/jpg", 1.0)
    setTimeout(saveMemes(imgContent), 1000)
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

function drawImgFromLink() {
    var img = new Image()
    img.src = gCurrImg
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height) //img,x,y,xend,yend
    }
}

///DESIGN 

function updateInput() {
    var elInput = document.querySelector('.write')
    if (!gClickedLine) return
    else {
        elInput.value = gClickedLine.txt
        changeLine()
        drawText()
        drawAllTxt()

    }
}

function setTxt(txt) {
    if (gdraw >= 0 && gClickedLine) {
        gClickedLine.txt = txt
        clearCanvas()
        drawAllTxt()
        updateCanvas()
    }
    gTxt = txt

}

function setFontFamily(value) {
    gFontFamily = value
    if (gClickedLine) gClickedLine.fontFamily = value
    updateCanvas()
}
function setBcg(value) {
    gBcg = value
    if (gClickedLine) gClickedLine.color = value
    updateCanvas()
}

function setClr(value) {
    gStrokeColor = value
    if (gClickedLine) gClickedLine.stroke = value
    updateCanvas()
}

function decFontSize() {
    if (gFontSize <= 5) return
    gFontSize -= 4
    if (gClickedLine) gClickedLine.size = gFontSize
    updateCanvas()

}
function incFontSize() {
    gFontSize += 4
    if (gFontSize > 90) return
    if (gClickedLine) gClickedLine.size = gFontSize
    updateCanvas()
}
function alignLft() {
    gAlign = 'left'
    if (gClickedLine) gClickedLine.align = gAlign
    gDiff = +gtxtWidth / 2
    updateCanvas()
}
function alignRgt() {
    gAlign = 'right'
    if (gClickedLine) gClickedLine.align = gAlign
    gDiff = -gtxtWidth / 2
    updateCanvas()

}
function alignCtr() {
    gAlign = 'center'
    if (gClickedLine) gClickedLine.align = gAlign
    gDiff = 0
}
