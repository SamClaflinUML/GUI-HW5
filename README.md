# GUI Programming Homework 5

## Links
Repository Link: 

GitHub Pages Link: 
 
## Features 
In this assignment, I was able to implement all required features in addition to the extra credit requirement of performing accurate word verification. Initially, I attempted to implement word verification using the provided file on the UML CS servers, but realized that it contained many words that weren't valid by Scrabble rules and was missing many that were. Therefore, I sourced my own text file containing all 270k+ valid Scrabble words. Achieving basic word verification isn't terribly complicated; I did so by initializing an array containing all the words from the aforementioned text file and simply using the built-in find() method to search for the player's parsed word. I found that the complexity arose when accounting for one or more blank tiles. This is because it would, of course, take quite a long time to perform a letter substitution for the blank tile(s) and check the formed word against the array of valid words. To combat this, I constructed an algorithm that determines where the blank tile(s) are within the word, splits the word on the blank tile(s), and checks to see if any word within the array starts in the same way that the resulting split word starts, ends in the same way that the resulting split word ends, and has the same overall length as the given word. 

Regarding additional features, I added four buttons: "Submit Word", "New Tiles", "Clear Board", and "Restart". "Submit Word", which is only enabled when the current word on the board is deemed valid, will remove all tiles used to construct the word from play, add the current word score to the total score, reset the current word score, and give the player however many tiles are required to get their total back to seven. "New Tiles" will simply add all of the player's tiles back to the "bag" and generate seven new tiles. "Clear Board" will move all the tiles that are currently on the board back into the rack. Finally, restart will, of course, restart the entire game (reset all scores, reset the "bag" of tiles, and generate a new tile rack for the player).
