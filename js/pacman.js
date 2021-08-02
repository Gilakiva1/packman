'use strict'
const PACMAN = '😷';

var gPacman;
var gEatenGhosts = []

function createPacman(board) {
    gPacman = {
        location: {
            i: 3,
            j: 5
        },
        isSuper: false
    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN
}

function checkBoardEmptyFood() {
    for (var i = 1; i < gBoard.length - 1; i++) {
        for (var j = 1; j < gBoard[0].length - 1; j++) {
            if ((gBoard[i][j] === FOOD || gBoard[i][j] === SUPER)) return false
        }
    }
    return true
}

function movePacman(ev) {
    if (checkBoardEmptyFood()) {
        gameOver();
    }
    if (!gGame.isOn) return;

    var nextLocation = getNextLocation(ev)
    if (!nextLocation) return;

    var nextCell = gBoard[nextLocation.i][nextLocation.j]

    if (nextCell === WALL) return
    if (nextCell === FOOD) updateScore(1)
    if (nextCell === CHERRY) updateScore(10);
    if (nextCell === SUPER) {
        updateScore(1);
        gPacman.isSuper = true;
        setTimeout(function () {
            gPacman.isSuper = false;
        }, 5000)
    } else if (nextCell === GHOST && !gPacman.isSuper) {
        gameOver()
        renderCell(gPacman.location, EMPTY);
        return;
    }
    if (nextCell === GHOST) {
        var idx = findGhost(nextLocation.i, nextLocation.j);
        console.log(idx);
        var eatenGhost = gGhosts.splice(idx, 1)[0];
        gEatenGhosts.push(eatenGhost)
        setTimeout(function () {
            gGhosts = gGhosts.concat(gEatenGhosts);
            gEatenGhosts = [];
        }, 5000);

    }
    //  update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
    // update the DOM
    renderCell(gPacman.location, EMPTY)
    // Move the pacman
    gPacman.location = nextLocation
    //  update the model
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN
    // update the DOM
    renderCell(gPacman.location, PACMAN)
}

function findGhost(idxI, idxJ) {
    for (var i = 0; i < gGhosts.length; i++) {
        if (gGhosts[i].location.i === idxI && gGhosts[i].location.j === idxJ) return i;
    }
}

function getNextLocation(eventKeyboard) {
    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    switch (eventKeyboard.code) {
        case 'ArrowUp':
            nextLocation.i--
            break;
        case 'ArrowDown':
            nextLocation.i++
            break;
        case 'ArrowLeft':
            nextLocation.j--
            break;
        case 'ArrowRight':
            nextLocation.j++
            break;
        default:
            return null
    }
    return nextLocation;
}