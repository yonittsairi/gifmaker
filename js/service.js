'use strict'
var gFontSize = 60;
var gFontFamily = 'Impact';

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
var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [{ txt: 'I never eat Falafel', size: 20, align: 'left', color: 'red' }]
}


function createLine(txt) {
    console.log('0');
    gMeme.lines[0].txt = txt
}



function drawImg() {
    var img = new Image();
    img.src = './img/' + gCurrImg
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height) //img,x,y,xend,yend
    }
}


function createGallery() {
    var elGrid = document.querySelector('.grid')

    var strHtmls = gImgs.map(img =>
        `<img src=./img/${img.url} id=${img.id} onclick="displayCanvas('${img.url}')">`
    )
    elGrid.innerHTML = strHtmls.join('')
}


function findMatch(word) {
    console.log('to come');

}