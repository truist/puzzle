# Calibron 12 solver

This is a JavaScript / node.js tool that finds the solution to the [Calibron 12](http://www.creativecrafthouse.com/index.php?main_page=product_info&products_id=844) puzzle. The internet also has a great overview of the [origins of the puzzle](http://www.pavelspuzzles.com/2010/08/the_calibron_12block_puzzle.html) and [some ways people have approached solving it](http://mypuzzlecollection.blogspot.com/2012/06/calibron-12.html).

To run this, run `node puzzle.js`.

This is a brute-force solver that simply searches for a solution via iteration, but it does it very efficiently. Even though there are 12! (479,001,600) permutations possible, this tool can find the solution in under a second on a 2.13GHz Core 2 Duo (and it's single-threaded JavaScript!). It can find all variations of the solution (i.e. rotations and swaps) (i.e. evaluate the entire search space) in 48 seconds.

I'm not going to publish the solution, but I'll send it to anyone who asks for it.

To run the tests:

    npm install
    node_modules/.bin/mocha
