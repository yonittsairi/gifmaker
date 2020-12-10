'use strict'

var gMeme = {}


var gKeywords = { 'happy': 12, 'funny puk': 1 }
var gImgs = [
    { id: 1, url: '1.jpg', keywords: ['kids', 'president', 'people', 'celebs', 'animals', 'movie'] },
    { id: 2, url: '2.jpg', keywords: ['animals'] },
    { id: 3, url: '3.jpg', keywords: ['kids', 'animals'] },
    { id: 4, url: '4.jpg', keywords: ['animals', 'movie'] },
    { id: 5, url: '5.jpg', keywords: ['kids'] },
    { id: 6, url: '6.jpg', keywords: ['happy'] },
    { id: 7, url: '7.jpg', keywords: ['kids'] },
    { id: 8, url: '8.jpg', keywords: ['happy', 'celebs', 'movie'] },
    { id: 9, url: '9.jpg', keywords: ['kids', 'happy'] },
    { id: 10, url: '10.jpg', keywords: ['happy', 'president', 'people', 'celebs'] },
    { id: 10, url: '11.jpg', keywords: ['people', 'celebs'] },
    { id: 10, url: '12.jpg', keywords: ['people', 'celebs'] },
    { id: 10, url: '13.jpg', keywords: ['people', 'celebs', 'animals', 'movie'] },
    { id: 10, url: '14.jpg', keywords: ['people', 'celebs', 'movie'] },
    { id: 10, url: '15.jpg', keywords: ['people', 'celebs', 'movie'] },
    { id: 10, url: '16.jpg', keywords: ['people', 'celebs', 'movie'] },
    { id: 10, url: '17.jpg', keywords: ['prsident', 'people', 'celebs'] },
    { id: 10, url: '18.jpg', keywords: ['kids', 'movie'] },

];



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
}

function changeLine(idx) {
    var line = gMeme.lines[idx]
    line.txt = gTxt
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


function createGallery() {
    var elGrid = document.querySelector('.grid')

    var strHtmls = gImgs.map(img =>
        `<img src=./img/${img.url} id=${img.id} onclick="displayCanvas('${img.url}','${img.id}')">`
    )
    elGrid.innerHTML = strHtmls.join('')
}


function findMatch(word) {
    console.log('to come');

}

function saveMeme(id) {
    var meme = {
        selectedImgId: id,
        selectedLineIdx: 0,
        lines: 0,
    }
    gMeme = meme
    console.log(gMeme);
}

