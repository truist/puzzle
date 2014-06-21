# Calibron 12 solver

This is a JavaScript / node.js tool that finds the solution to the [Calibron 12](http://www.creativecrafthouse.com/index.php?main_page=product_info&products_id=844) puzzle. The internet also has a great overview of the [origins of the puzzle](http://www.pavelspuzzles.com/2010/08/the_calibron_12block_puzzle.html) and [some ways people have approached solving it](http://mypuzzlecollection.blogspot.com/2012/06/calibron-12.html).

To run this, run `node puzzle.js`.

This is a brute-force solver, which runs through all possible permutations of the piece-ordering (12! = 479,001,600) and each rotation of each piece (2^12 = 4096). As the tool runs, it will report progress (and time remaining until all permutations are exhausted) based on processing each permutation (including all its rotations). But practically, given this initial configuration and the algorithm at the time of this writing, it solves it after ~33.5M permutations, or about 7% of the total search space, so it's much faster than it might otherwise be.

It takes about an hour on a 2.13GHz Core 2 Duo (i.e. a Macbook Air from a few years ago). It will take about 10x that long on the EC2 free tier (based on hypervisor throttling; it could be much faster than that with 100% available CPU).

Note that it is single-threaded, because it's node.js.

I'm not going to publish the solution, but I'll send it to anyone who asks for it.

To run the tests:

    npm install
    node_modules/.bin/mocha
