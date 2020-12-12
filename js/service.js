'use strict'

var gMeme = {}
var gMemesData;


var gKeywords = { 'kids': 0, 'president': 0, 'people': 0, 'celebs': 0, 'animals': 0, 'movie': 0 }
var gImgs = [
    { id: 1, url: '1.jpg', keywords: ['president', 'people', 'celebs'] },
    { id: 2, url: '2.jpg', keywords: ['animals'] },
    { id: 3, url: '3.jpg', keywords: ['kids', 'animals'] },
    { id: 4, url: '4.jpg', keywords: ['animals', 'movie'] },
    { id: 5, url: '5.jpg', keywords: ['kids'] },
    { id: 6, url: '6.jpg', keywords: ['happy'] },
    { id: 7, url: '7.jpg', keywords: ['kids'] },
    { id: 8, url: '8.jpg', keywords: ['happy', 'celebs', 'movie'] },
    { id: 9, url: '9.jpg', keywords: ['kids', 'happy'] },
    { id: 10, url: '10.jpg', keywords: ['happy', 'president', 'people', 'celebs'] },
    { id: 11, url: '11.jpg', keywords: ['people', 'celebs'] },
    { id: 12, url: '12.jpg', keywords: ['people', 'celebs'] },
    { id: 13, url: '13.jpg', keywords: ['people', 'celebs', 'animals', 'movie'] },
    { id: 14, url: '14.jpg', keywords: ['people', 'celebs', 'movie'] },
    { id: 15, url: '15.jpg', keywords: ['people', 'celebs', 'movie'] },
    { id: 16, url: '16.jpg', keywords: ['people', 'celebs', 'movie'] },
    { id: 17, url: '17.jpg', keywords: ['president', 'people', 'celebs'] },
    { id: 18, url: '18.jpg', keywords: ['kids', 'movie'] },

];

function findIdxById(id) {
    var idx = 0
    var lines = gMeme.lines
    if (gClickedLine && lines.length !== 0) {
        var currId = id
        idx = lines.findIndex(line => line.id === currId)
    }
    return idx
}



function createLine(x, y, width, rectX, rectY) {
    if (gMeme.lines === 0) {
        gMeme.lines = []
        gMeme.lineCount = 0
    }
    var line = {
        id: _makeId(),
        txt: gTxt,
        size: gFontSize,
        align: gAlign,
        color: gBcg,
        stroke: gStrokeColor,
        rectWidth: width,
        fontFamily: gFontFamily,
        x,
        y,
        rectX: rectX,
        rectY: rectY,
    }
    gMeme.lines.push(line)
    gMeme.lineCount = (gMeme.lines).length
    console.log(gMeme);
}

function changeLine(idx) {
    if (idx === -1 || gdraw === -1) return
    var line = gMeme.lines[idx]
    line.txt = gTxt
    console.log(line);
}

function _makeId(length = 5) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}

function drawImg() {
    var img = new Image();
    img.src = './img/' + gCurrImg
    if (img.complete) {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)

    } else {
        img.onload = function () {
            gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)

        };
    }
}


function createGallery(array = gImgs) {
    var elGrid = document.querySelector('.grid')
    var strHtmls = array.map(img =>
        `<img src=./img/${img.url} id=${img.id} onclick="displayCanvas('${img.url}','${img.id}')">`
    )
    elGrid.innerHTML = strHtmls.join('')
}


function filterGallery(keyword) {
    gKeywords[keyword] = +1
    var trues = gImgs.filter(key => (key.keywords.includes(keyword)))
    createGallery(trues)
    var elkey = document.querySelector(`.${keyword}`)
    elkey.style.fontSize = 16 * gKeywords[keyword] * 2 + 'px'
}

function filterGallerybyTyping(keyword) {
    debugger
    var trues = gImgs.filter(key => (key.keywords.find(key => { return key.substring(0, keyword.length) === keyword })))
    createGallery(trues)
}


function saveMeme(id) {
    var meme = {
        selectedImgId: id,
        selectedLineIdx: 0,
        lines: 0,
    }
    gMeme = meme

}


// if i have ty=ime use this to draw Meme Gallery
function copy() {
    if (!gMemesData) gMemesData = []
    var imgData = gCtx.getImageData(0, 0, gCanvas.width, gCanvas.height);
    gMemesData.push(imgData)
    // gCtx.putImageData(imgData, 0, 0);
}

function saveMemes() {
    var memes = [loadFromStorage(KEY)]
    if (!memes || memes.length === 0) memes = gMeme
    memes.push(gMeme)
    saveToStorage(KEY, memes)
}
