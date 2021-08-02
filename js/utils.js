function renderMat(mat, selector) {
  var strHTML = '<table border="0"><tbody>';
  for (var i = 0; i < mat.length; i++) {
    strHTML += '<tr>';
    for (var j = 0; j < mat[0].length; j++) {
      var cell = mat[i][j];
      var className = 'cell cell' + i + '-' + j;
      if(i === 0 && j){
        strHTML += '<td  class=" ' + className + ' wall-top"> ' + cell + ' </td>'

      }else if(i===mat.length-1){
        strHTML += '<td  class=" ' + className + ' wall-bottom"> ' + cell + ' </td>'

      } else if(j === 0){
        strHTML += '<td  class=" ' + className + ' wall-left"> ' + cell + ' </td>'

      }else if(j===mat[0].length-1){
        strHTML += '<td  class=" ' + className + ' wall-right"> ' + cell + ' </td>'

      }else {
        strHTML += '<td class="' + className + '"> ' + cell + ' </td>'

      }
    }
    strHTML += '</tr>'
  }
  strHTML += '</tbody></table>';
  var elContainer = document.querySelector(selector);
  elContainer.innerHTML = strHTML;
}

// location such as: {i: 2, j: 7}
function renderCell(location, value) {
  // Select the elCell and set the value
  var elCell = document.querySelector(`.cell${location.i}-${location.j}`);
  elCell.innerHTML = value;
}

function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomInteger(min, max) {
  var randomNum = Math.floor(Math.random() * (max - min) + min);
  return randomNum;

}

function checkEmptyCell(board){
  var emptyCell = [];
  for (var i = 0; i < board.length; i++) {
      for (var j = 0; j < board[0].length; j++) {
          if(board[i][j]===EMPTY) emptyCell.push({i,j});
      }
  }
}

function loopNebs() {
  var res = [];

  
  
  for (var i = pieceCoord.i - 1; i <= pieceCoord.i + 1; i++) {
    if (i < 0 || i >= gBoard.length ) continue;
    for (var j = pieceCoord.j - 1; j < pieceCoord.j + 1; j++) {
      if (j < 0 || j >= gBoard[0].length) continue;
      if(i === pieceCoord.i && j===pieceCoord.j) continue;
      var nextCoord = {
        i,
        j
      };
      if (isEmptyCell(nextCoord)) res.push(nextCoord);
    }
  }
  return res

}


function blowUpNegs(cellI, cellJ, board) {
  for (var i = cellI - 1; i <= cellI + 1; i++) {
      if (i < 0 || i >= board.length) continue
      for (var j = cellJ - 1; j <= cellJ + 1; j++) {
          if (j < 0 || j >= board[0].length) continue
          if (i === cellI && j === cellJ) continue
          if (board[i][j] === LIFE) {
              board[i][j] = ''
              renderCell({ i, j }, '')
          }
      }
  }
}

function activateTimer() {
  var currTime = Date.now()
  var diff = new Date(currTime - gTimer);
  var min = diff.getMinutes();
  var sec = diff.getSeconds();
  // var milisec = diff.getMilliseconds() / 100;
  var elDiv = document.querySelector('.timer');
  min = min < 10 ? `0${min}` : min
  sec = sec < 10 ? `0${sec}` : sec
  var strHTML = min + ':' + sec;
  elDiv.innerHTML = strHTML;
}