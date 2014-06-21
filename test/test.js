var expect = require('chai').expect;
var solver = require('../solver');

describe("Integration tests", function() {
    describe("#findSolution()", function() {
        it("should solve 4 pieces of area 1 in a 3x3 board (which is too big)", function() {
            solver.init(3, [[1,1], [1,1], [1,1], [1,1]]);
            var finalBoard;
            var doneCount = 0;
            solver.findSolution(function(){}, function(pieces, board) {
                finalBoard = board;
                doneCount++;
                return true;
            });
            expect(finalBoard, "correct solution").to.deep.equal([
                [1, 2, 3],
                [4, 0, 0],
                [0, 0, 0]
            ]);
            expect(doneCount, "we stopped after the first done, because we returned true").to.equal(1);
        });

        it("will keep iterating through solutions if we don't return true", function() {
            solver.init(3, [[1,1], [1,1], [1,1], [1,1]]);
            var doneCount = 0;
            solver.findSolution(function(){}, function(pieces, board) {
                doneCount++;
            });
            expect(doneCount, "we saw all the permutations and rotations").to.equal(24 * Math.pow(2, 4));
        });

        it("can exactly solve a small simple case", function() {
            solver.init(3, [[1,2], [1,3], [2,2]]);
            var finalBoard;
            solver.findSolution(function(){}, function(pieces, board) {
                finalBoard = board;
                return true;
            });
            expect(finalBoard, "correct solution").to.deep.equal([
                [1, 1, 2],
                [3, 3, 2],
                [3, 3, 2]
            ]);
        });

        it("can exactly solve a more compelex case with duplicates", function() {
            solver.init(5, [[1,2], [1,5], [2,2], [2,2], [2,5]]);
            var finalBoard;
            solver.findSolution(function(){}, function(pieces, board) {
                finalBoard = board;
                return true;
            });
            expect(finalBoard, "a correct solution (out of a few)").to.deep.equal([
                [1, 1, 1, 1, 1],
                [2, 3, 3, 4, 4],
                [2, 3, 3, 4, 4],
                [5, 5, 5, 5, 5],
                [5, 5, 5, 5, 5],
            ]);
        });

        it("succeeds with a 1-piece case", function() {
            solver.init(2, [[2,2]]);
            var finalBoard;
            solver.findSolution(function(){}, function(pieces, board) {
                finalBoard = board;
                return true;
            });
            expect(finalBoard).to.deep.equal([
                [1, 1],
                [1, 1],
            ]);
        });

        it("fails to solve an impossible case", function() {
            solver.init(2, [[1,2], [1,2], [1,2]]);
            var finalBoard;
            solver.findSolution(function(){}, function(pieces, board) {
                finalBoard = board;
                return true;
            });
            expect(finalBoard).to.be.undefined;
        });
    });
});
