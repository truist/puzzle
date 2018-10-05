'use strict'
var solver = require('./solver.js')

var boardSize = 56
var basePieces = [
  [32, 11],
  [32, 10],
  [28, 14],
  [28, 7],
  [28, 6],
  [21, 18],
  [21, 18],
  [21, 14],
  [21, 14],
  [17, 14],
  [14, 4],
  [10, 7]
]

function main () {
  solver.init(boardSize, basePieces)
  solver.findSolution(showProgress, solved)
}

var UPDATE_COUNT = 100000
var counter = 0
var start = new Date().getTime()
function showProgress (pieces, board) {
  if (++counter % UPDATE_COUNT === 0) {
    process.stdout.write('.')
  }
}

function solved (pieces, board) {
  printBoard(board)
  process.stdout.write(pieces + '\n')
  process.stdout.write((new Date().getTime() - start) / 1000 + ' seconds')
  process.stdout.write('\n\nSUCCESS!!!\n\n')
  return true
}

function printBoard (board) {
  process.stdout.write('\n')
  for (var y = 0; y < boardSize; y++) {
    for (var x = 0; x < boardSize; x++) {
      if (x > 0 && x < boardSize - 1 && y > 0 && y < boardSize - 1 && board[x][y] === 0) {
        process.stdout.write(' ')
      } else {
        process.stdout.write('' + board[x][y] % 10)
      }
      process.stdout.write(' ')
    }
    process.stdout.write('\n')
  }
  process.stdout.write('\n')
}

main()
process.stdout.write('\n')
