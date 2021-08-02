'use strict'
const WALL = '#'
const FOOD = '.'
const EMPTY = ' ';
const SUPER = '&#8226;'

const CHERRY = '&#127826;'
var gIntervalCherry;
var gBoard;

var gGame = {
    score: 0,
    isOn: false,
}

function init() {
    document.querySelector('button').style.display = 'none';
    gBoard = buildBoard()
    createPacman(gBoard);
    createGhosts(gBoard);
    renderMat(gBoard, '.board-container')
    gGame.isOn = true
    gIntervalCherry = setInterval(setCherry,15000);
}

function setCherry() {
    
    var emptyCell = [];
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            if(gBoard[i][j]===EMPTY) emptyCell.push({i,j});
        }
    }
    if(emptyCell.length > 0) {
        var idx = getRandomInteger(0, emptyCell.length);
        gBoard[emptyCell[idx].i][emptyCell[idx].j] = CHERRY;
        renderCell(emptyCell[idx], CHERRY);

    }
}

function buildBoard() {
    var SIZE = 10;
    var board = [];
    for (var i = 0; i < SIZE; i++) {
        board.push([]);
        for (var j = 0; j < SIZE; j++) {
            board[i][j] = FOOD;
            if (i === 0 || i === SIZE - 1 ||
                j === 0 || j === SIZE - 1 ||
                (j === 3 && i > 4 && i < SIZE - 2)) {
                board[i][j] = WALL;
            }
            if (i === 1 & j === 1 || i === 1 && j === SIZE - 2 ||
                i === SIZE - 2 && j === 1 || i == SIZE - 2 && j == SIZE - 2) {
                board[i][j] = SUPER;
            }
        }
    }
    return board;
}



function updateScore(diff) {
    gGame.score += diff
    document.querySelector('h2 span').innerText = gGame.score
}

function gameOver() {
    console.log('Game Over');
    gGame.isOn = false
    clearInterval(gIntervalGhosts);
    document.querySelector('button').style.display = "block";
    clearInterval(gIntervalCherry);
}