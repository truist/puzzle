var boardSize;
var basePieces;
var board;

var lastPermutation;
var lastDepth;

exports.init = function(size, pieces) {
    boardSize = size;
    basePieces = reverse(pieces); //reverse it here to offset the reversal in permute()
    board = [];
    for (var x = 0; x < size; x++) {
        board[x] = [];
        for (var y = 0; y < size; y++) {
            board[x][y] = 0;
        }
    }

    lastDepth = 0;
    lastPermutation = undefined;
}

exports.findSolution = function(progress, done) {
    permute(basePieces.length, basePieces, function(pieces) {
        progress(pieces, null);

        if (sameStartAsBefore(pieces)) {
            return false;
        } else {
            lastDepth = 0;
            lastPermutation = pieces;
            return fillBoard(pieces, 0, progress, done);
        }
    });
}

function fillBoard(pieces, piecesIndex, progress, done) {
    if (pieces.length == piecesIndex) {
        return done(pieces, board);
    }

    return findCorner(function(x, y) {
        progress(pieces, board);
        return checkAndPlaceBothWays(pieces, piecesIndex, x, y, progress, done);
    });
}

function checkAndPlaceBothWays(pieces, piecesIndex, x, y, progress, done) {
    var piece = pieces[piecesIndex];

    if (checkAndPlace(x, y, piece[0], piece[1], piecesIndex + 1)) {
        if (fillBoard(pieces, piecesIndex + 1, progress, done)) {
            return true;
        } else {
            unPlace(x, y, piece[0], piece[1]);
        }
    }

    if (checkAndPlace(x, y, piece[1], piece[0], piecesIndex + 1)) {
        if (fillBoard(pieces, piecesIndex + 1, progress, done)) {
            return true;
        } else {
            unPlace(x, y, piece[1], piece[0]);
        }
    }

    lastDepth = Math.max(lastDepth, piecesIndex);
    return false;
}

function checkAndPlace(x, y, width, height, value) {
    if (x + width > boardSize || y + height > boardSize) return false;

    //check the corners first
    if (board[x+width-1][y] || board[x][y+height-1] || board[x+width-1][y+height-1]) return false;

    for (var i = x; i < x + width; i++) {
        for (var j = y; j < y + height; j++) {
            if (board[i][j]) {
                //first, clean up after ourselves
                for (var l = x; l <= i; l++) {
                    for (var m = y; m < (i == l ? j : y + height); m++) {
                        board[l][m] = 0;
                    }
                }
                return false;
            } else {
                board[i][j] = value;
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

function sameStartAsBefore(newPieces) {
    if (!lastPermutation) {
        return false;
    }
    for (var i = 0; i <= lastDepth; i++) {
        if (lastPermutation[i][0] != newPieces[i][0] || lastPermutation[i][1] != newPieces[i][1]) {
            return false;
        }
    }
    return true;
}

function permute(N, pieces, callback) {
    if (N === 1) {
        return callback(reverse(pieces)); //reverse it so the front-end is stable
    } else {
        for (var c = 0; c < N; c++) {
            if (permute(N-1, pieces, callback)) {
                return true;
            }

            var swapIndex = N % 2 ? 1 : c;
            var temp = pieces[N-1];
            pieces[N-1] = pieces[swapIndex];
            pieces[swapIndex] = temp;
        }
    }
}

function reverse(array) {
    var newArray = [];
    for (var i = 0; i < array.length; i++) {
        newArray[i] = array[array.length - i - 1];
    }
    return newArray;
}

function findCorner(callback) {
    //check the bottom-left corner first, then travel the open spaces along the edge
    //(either up the left wall, or across on the bottom edge of a piece)
    if (board[0][boardSize-1]) { //we're full to the bottom edge
        return east(0, boardSize, callback); //yes, this is off the bottom edge; yay, javascript!
    } else {
        return north(0, boardSize-1, callback);
    }
}

//our top edge must be against another piece
function east(x, y, callback) {
    if (boardSize == x+1 || !board[x+1][y-1]) {
        return north(x+1, y-1, callback); //this might be off the right edge; yay, javascript!
    } else if (board[x+1][y]) {
        return south(x, y, callback);
    } else {
        return east(x+1, y, callback);
    }
}

//our right edge must be against another piece
function south(x, y, callback) {
    if (boardSize == y+1 || !board[x+1][y+1]) {
        return east(x+1, y+1, callback); //this might be off the bottom edge; yay, javascript!
    } else {
        return south(x, y+1, callback);
    }
}

//our left edge must be against another piece
function north(x, y, callback) {
    if (0 == y) {
        //we've made it to the top wall; we must be done
        return callback(x, y);
    } else if (x > 0 && !board[x-1][y-1]) {
        return west(x-1, y-1, callback);
    } else if (board[x] && board[x][y-1]) { //check for being off the edge
        //we've found a corner
        return callback(x, y);
    } else {
        return north(x, y-1, callback);
    }
}

//our bottom edge must be against another piece
function west(x, y, callback) {
    if (board[x-1][y]) {
        return north(x, y, callback);
    } else {
        return west(x-1, y, callback);
    }
}
