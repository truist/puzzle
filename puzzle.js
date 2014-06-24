"use strict";
var util = require('util');
var solver = require('./solver.js')

var boardSize = 56;
var basePieces = [
    [32,11],
    [32,10],
    [28,14],
    [28,7],
    [28,6],
    [21,18],
    [21,18],
    [21,14],
    [21,14],
    [17,14],
    [14,4],
    [10,7]
];


function main() {
    solver.init(boardSize, basePieces);
    solver.findSolution(showProgress, solved);
}

var UPDATE_COUNT = 100000;
var counter = 0;
var start = new Date().getTime();
function showProgress(pieces, board) {
	if (++counter % UPDATE_COUNT == 0) {
        util.print('.');
	}
}

function solved(pieces, board) {
    printBoard(board);
    util.print(pieces + "\n");
    util.print((new Date().getTime() - start) / 1000  + " seconds");
    util.print("\n\nSUCCESS!!!\n\n");
    return true;
}

function printBoard(board) {
    util.print("\n");
    for (var y = 0; y < boardSize; y++) {
        for (var x = 0; x < boardSize; x++) {
            if (x > 0 && x < boardSize - 1 && y > 0 && y < boardSize - 1 && 0 == board[x][y]) {
                util.print(" ");
            } else {
                util.print(board[x][y] % 10);
            }
            util.print(" ");
        }
        util.print("\n");
    }
    util.print("\n");
}

main();
util.print("\n");

