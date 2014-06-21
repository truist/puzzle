"use strict";
var util = require('util');
var solver = require('./solver.js')

var boardSize = 56;
var basePieces = [
    [10,7],
    [14,4],
    [17,14],
    [21,14],
    [21,14],
    [21,18],
    [21,18],
    [28,6],
    [28,7],
    [28,14],
    [32,10],
    [32,11]
];

solver.init(boardSize, basePieces);
solver.findSolution(showProgress, solved);

function showProgress(pieces, board) {
    if (board) {
        //printBoard(board);
        return;
    }
    var UPDATE_FREQ = 10000;
    if (typeof showProgress.counter == 'undefined') {
	    showProgress.counter = 0;
	    showProgress.totalSpeed = 0;
	    showProgress.speed = 0;
	    showProgress.hours = 0;
	    showProgress.start = new Date().getTime();
	    showProgress.lastTime = showProgress.start;
    }
	if (++showProgress.counter % UPDATE_FREQ == 0) {
        var now = new Date().getTime();
        showProgress.totalSpeed = Math.round(showProgress.counter / ((now - showProgress.start) / 1000));
        showProgress.hours = Math.round((479001600 - showProgress.counter) / showProgress.totalSpeed / 3600);
        showProgress.speed = Math.round(UPDATE_FREQ / ((now - showProgress.lastTime) / 1000));
        showProgress.lastTime = now;
        util.print(showProgress.counter + ": "
            + pieces + " "
            + showProgress.speed + "/sec now; "
            + showProgress.totalSpeed + "/sec total; "
            + showProgress.hours + " hours remaining"
            + "\n"
        );
	}
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

function solved(pieces, board) {
    printBoard(board);
    util.print(pieces + "\n");
    util.print("\n\nSUCCESS!!!\n\n");
    process.exit(0);
}

