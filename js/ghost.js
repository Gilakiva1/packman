'use strict'
const GHOST = '&#128123;';
// const GHOST = '&';

var gGhosts;
var gIntervalGhosts;

function createGhost(board, idx) {
    var colors = ['red', 'green', 'pink'];
    // var idx = Math.floor(Math.random() * (3));
    var ghost = {
        location: {
            i: 3,
            j: 3
        },
        currCellContent: FOOD,
        color: colors[idx]
    }
    gGhosts.push(ghost);
    board[ghost.location.i][ghost.location.j] = GHOST;

}

function setColorGhost() {
    for (let i = 0; i < gGhosts.length; i++) {
        var elGhost = document.querySelector(`.cell${gGhosts[i].location.i}-${gGhosts[i].location.j}`);
        console.log(elGhost.innerText);
        elGhost.style.color = 'red';
    }
}

function createGhosts(board) {
    gGhosts = []
    createGhost(board, 0)
    createGhost(board, 1)
    createGhost(board, 2)
    // setColorGhost();
    gIntervalGhosts = setInterval(moveGhosts, 1000)
}

function moveGhosts() {

    for (var i = 0; i < gGhosts.length; i++) {
        var ghost = gGhosts[i]
        moveGhost(ghost)
    }
}

function moveGhost(ghost) {
    var moveDiff = getMoveDiff()
    var nextLocation = {
        i: ghost.location.i + moveDiff.i,
        j: ghost.location.j + moveDiff.j
    }

    var nextCell = gBoard[nextLocation.i][nextLocation.j]

    if (nextCell === WALL || nextCell === GHOST) return;
    if (nextCell === PACMAN) {
        gameOver()
        return;
    }

    // update the model
    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent
    // update the DOM
    renderCell(ghost.location, ghost.currCellContent)

    //Move the ghost
    ghost.location = nextLocation
    // update the model
    ghost.currCellContent = gBoard[ghost.location.i][ghost.location.j]
    gBoard[ghost.location.i][ghost.location.j] = GHOST
    // update the DOM
    renderCell(ghost.location, getGhostHTML(ghost))
}

function getMoveDiff() {
    var randNum = getRandomIntInclusive(1, 100);

    if (randNum <= 25) {
        return {
            i: 0,
            j: 1
        }
    } else if (randNum <= 50) {
        return {
            i: -1,
            j: 0
        }
    } else if (randNum <= 75) {
        return {
            i: 0,
            j: -1
        }
    } else {
        return {
            i: 1,
            j: 0
        }
    }
}

function getGhostHTML(ghost) {
    var color = gPacman.isSuper ? 'blue' : ghost.color
    return `<span style="color:${color};">${GHOST}</span>`
}