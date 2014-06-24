var boardSize;
var pieces;
var board;
var placed;

exports.init = function(size, basePieces) {
    boardSize = size;
    pieces = basePieces;
    board = [];
    for (var x = 0; x < size; x++) {
        board[x] = [];
        for (var y = 0; y < size; y++) {
            board[x][y] = 0;
        }
    }
    placed = [];
    for (var i = 0; i < pieces.length; i++) {
        placed[i] = false;
    }
}

exports.findSolution = function(progress, done) {
    fillBoard(0, 0, 0, progress, done);
}

function fillBoard(piecesIndex, x, y, progress, done) {
    for (var i = 0; i < pieces.length; i++) {
        if (!placed[i] && checkAndPlaceBothWays(i, x, y, progress, done)) {
            return true;
        }
    }
    return false;
}

function checkAndPlaceBothWays(piecesIndex, x, y, progress, done) {

    return checkAndPlaceOneWay(piecesIndex, false, x, y, progress, done)
        || checkAndPlaceOneWay(piecesIndex, true, x, y, progress, done);
}

function checkAndPlaceOneWay(piecesIndex, rotated, x, y, progress, done) {
    var piece = pieces[piecesIndex];
    var width = rotated ? piece[1] : piece[0];
    var height = rotated ? piece[0] : piece[1];

    if (checkAndPlace(x, y, width, height, piecesIndex + 1)) {
        placed[piecesIndex] = true;
        if (allPlaced()) {
            if (done(pieces, board)) {
                return true;
            }
        } else {
            if (findNextCorner(x, y, done, function(x, y) {
                return fillBoard(piecesIndex + 1, x, y, progress, done);
            })) {
                return true;
            }
        }
        unPlace(x, y, width, height);
        placed[piecesIndex] = false;
    } else {
        progress(pieces, board);
    }
    return false;
}

function findNextCorner(startX, startY, done, callback) {
    for (var y = startY; y < boardSize; y++) {
        for (var x = (y == startY ? startX : 0); x < boardSize; x++) {
            if (!board[x][y]) {
                return callback(x, y);
            }
        }
    }
    return false;
}

function checkAndPlace(x, y, width, height, value) {
    if (x + width > boardSize || y + height > boardSize) return false;

    //check the corners first
    if (board[x+width-1][y] || board[x][y+height-1] || board[x+width-1][y+height-1]) return false;

    for (var i = x; i < x + width; i++) {
        for (var j = y; j < y + height; j++) {
            if (!board[i][j]) {
                board[i][j] = value;
            } else {
                //oops! something's here; better clean up our mess...
                for (var l = x; l <= i; l++) {
                    for (var m = y; m < (i == l ? j : y + height); m++) {
                        board[l][m] = 0;
                    }
                }
                return false;
            }
        }
    }
    return true;
}

function unPlace(x, y, width, height) {
    for (var i = x; i < x + width; i++) {
        for (var j = y; j < y + height; j++) {
            board[i][j] = 0;
        }
    }
}

function allPlaced() {
    for (var i = 0; i < placed.length; i++) {
        if (!placed[i]) {
            return false;
        }
    }
    return true;
}

