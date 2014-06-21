"use strict";
var util = require('util');
var solver = require('./solver')

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

var UPDATE_COUNT = 10000;
var counter = 0, totalSpeed = 0, speed = 0, hours = 0;
var start = new Date().getTime(), lastTime = start;

main();
process.exit(0);

function main() {
    solver.init(boardSize, basePieces);
    solver.findSolution(showProgress, solved);
}

function showProgress(pieces, board) {
    if (board) {
        //printBoard(board);
        return;
    }
	if (++counter % UPDATE_COUNT == 0) {
        var now = new Date().getTime();
        totalSpeed = Math.round(counter / ((now - start) / 1000));
        hours = Math.round((479001600 - counter) / totalSpeed / 3600);
        speed = Math.round(UPDATE_COUNT / ((now - lastTime) / 1000));
        lastTime = now;
        util.print(counter + ": "
            + speed + "/sec now; "
            + totalSpeed + "/sec total; "
            + hours + " hours remaining"
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
    util.print((new Date().getTime() - start) / 1000 / 60 + " minutes");
    util.print("\n\nSUCCESS!!!\n\n");
    process.exit(0);
}

