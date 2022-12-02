/***************************************
 * Name: Samuel Claflin
 * Date: 12/1/2022
 * Assignment: Homework 5
 * Email: samuel_claflin@student.uml.edu
 ***************************************/

// Strict
"use strict";

/***************************************
 * Constants 
 ***************************************/

const TILE_DISTRIBUTION = {
    "A": 9,
    "B": 2,
    "C": 2,
    "D": 4,
    "E": 12,
    "F": 2,
    "G": 3,
    "H": 2,
    "I": 9,
    "J": 1,
    "K": 1,
    "L": 4,
    "M": 2,
    "N": 6,
    "O": 8,
    "P": 2,
    "Q": 1,
    "R": 6,
    "S": 4,
    "T": 6,
    "U": 4,
    "V": 2,
    "W": 2,
    "X": 1,
    "Y": 2,
    "Z": 1,
    "Blank": 2
};
const ASSETS_BASE_PATH = "./assets/";
const TILE_IMAGE_PATH_BASE = ASSETS_BASE_PATH + "Scrabble_Tiles/";
const TILE_IMAGE_PATHS = {
    "A": TILE_IMAGE_PATH_BASE + "Scrabble_Tile_A.jpg",
    "B": TILE_IMAGE_PATH_BASE + "Scrabble_Tile_B.jpg",
    "C": TILE_IMAGE_PATH_BASE + "Scrabble_Tile_C.jpg",
    "D": TILE_IMAGE_PATH_BASE + "Scrabble_Tile_D.jpg",
    "E": TILE_IMAGE_PATH_BASE + "Scrabble_Tile_E.jpg",
    "F": TILE_IMAGE_PATH_BASE + "Scrabble_Tile_F.jpg",
    "G": TILE_IMAGE_PATH_BASE + "Scrabble_Tile_G.jpg",
    "H": TILE_IMAGE_PATH_BASE + "Scrabble_Tile_H.jpg",
    "I": TILE_IMAGE_PATH_BASE + "Scrabble_Tile_I.jpg",
    "J": TILE_IMAGE_PATH_BASE + "Scrabble_Tile_J.jpg",
    "K": TILE_IMAGE_PATH_BASE + "Scrabble_Tile_K.jpg",
    "L": TILE_IMAGE_PATH_BASE + "Scrabble_Tile_L.jpg",
    "M": TILE_IMAGE_PATH_BASE + "Scrabble_Tile_M.jpg",
    "N": TILE_IMAGE_PATH_BASE + "Scrabble_Tile_N.jpg",
    "O": TILE_IMAGE_PATH_BASE + "Scrabble_Tile_O.jpg",
    "P": TILE_IMAGE_PATH_BASE + "Scrabble_Tile_P.jpg",
    "Q": TILE_IMAGE_PATH_BASE + "Scrabble_Tile_Q.jpg",
    "R": TILE_IMAGE_PATH_BASE + "Scrabble_Tile_R.jpg",
    "S": TILE_IMAGE_PATH_BASE + "Scrabble_Tile_S.jpg",
    "T": TILE_IMAGE_PATH_BASE + "Scrabble_Tile_T.jpg",
    "U": TILE_IMAGE_PATH_BASE + "Scrabble_Tile_U.jpg",
    "V": TILE_IMAGE_PATH_BASE + "Scrabble_Tile_V.jpg",
    "W": TILE_IMAGE_PATH_BASE + "Scrabble_Tile_W.jpg",
    "X": TILE_IMAGE_PATH_BASE + "Scrabble_Tile_X.jpg",
    "Y": TILE_IMAGE_PATH_BASE + "Scrabble_Tile_Y.jpg",
    "Z": TILE_IMAGE_PATH_BASE + "Scrabble_Tile_Z.jpg",
    "Blank": TILE_IMAGE_PATH_BASE + "Scrabble_Tile_Blank.jpg"
};
const DOUBLE_WORD_SPACE_IMAGE_PATH = ASSETS_BASE_PATH + "Scrabble_DoubleWordSpace.png";
const DEFAULT_SPACE_IMAGE_PATH = ASSETS_BASE_PATH + "Scrabble_DefaultSpace.png";
const WORDS_FILE = ASSETS_BASE_PATH + "words.txt";
const SCRABBLE_SQUARE_CLASS = "scrabble-square";
const DROPPABLE_HOVER_CLASS = "droppable-hover";
const BOARD_SPACE_CLASS = "board-space";
const DRAGGABLE_CLASS = "draggable";
const DROPPABLE_CLASS = "droppable";
const TILE_CLASS = "tile";
const NUM_SPACES = 7;
const NUM_TILES = 7;

/***************************************
 * Globals 
 ***************************************/

let validWords = [];

/***************************************
 * Functions
 ***************************************/

// Entry point
const main = () => {
    // Copy a set of tiles for the current game
    const currentTiles = {...TILE_DISTRIBUTION};

    // Generate an initial array of tiles for the player
    const playerTiles = randTiles(currentTiles, NUM_TILES);

    // Perform all required initializations
    initialize(playerTiles);
};

/***************************************
 * JQuery 
 ***************************************/

// Aggregates all required initializations
const initialize = (playerTiles) => {
    initializeValidWords();
    initializeDroppableSpaces();
    initializePlayerTiles(playerTiles);
};

// Performs all required graphical initializations for droppable spaces
const initializeDroppableSpaces = () => {
    initializeBoardRowSpaces();
    initializeTileRackSpaces();
    initializeAllDroppables();
};

// Performs all required graphical initializations for the player's tiles
const initializePlayerTiles = (playerTiles) => {
    renderPlayerTiles(playerTiles);
    initializeAllDraggables();
    positionPlayerTiles();
};

// Generates the board row
const initializeBoardRowSpaces = () => {
    // Add the droppable elements
    for (let i = 0; i < NUM_SPACES; i++) {
        // Determine which image to use
        const src = i == 1 || i == 5
            ? DOUBLE_WORD_SPACE_IMAGE_PATH
            : DEFAULT_SPACE_IMAGE_PATH;

        // Append the image to the board row
        $("#board-row").append(`
            <img 
                alt="Board Space" 
                class="${DROPPABLE_CLASS} ${SCRABBLE_SQUARE_CLASS} ${BOARD_SPACE_CLASS}" 
                src="${src}">
        `);
    }
};

// Generates the droppable spaces within the tile rack
const initializeTileRackSpaces = () => {
    // Add the droppable elements
    for (let i = 0; i < NUM_TILES; i++) {
        $("#tile-rack-tile-container").append(`
            <div 
                class="${DROPPABLE_CLASS} ${SCRABBLE_SQUARE_CLASS}">
            </div>
        `);
    }
};

// Calls the droppable() method on all required elements
const initializeAllDroppables = () => {
    $(`.${DROPPABLE_CLASS}`).droppable({
        accept: `.${DRAGGABLE_CLASS}`,
        drop: function(event, ui) {
            const draggable = ui.draggable;
            const droppable = $(this);
            handleDrop(draggable, droppable);
        },
        out: function(event, ui) {
            const droppable = $(this);
            handleOut(droppable);
        },
        hoverClass: DROPPABLE_HOVER_CLASS
    });
};

// Renders an array of tiles to the page
const renderPlayerTiles = (playerTiles) => {
    playerTiles.forEach((playerTile, idx) => {
        const id = `${Date.now()}-${idx}`;
        $("#content-wrapper").append(getTileImage(playerTile, id));
    });
};

// Calls the draggable() method on all required elements
const initializeAllDraggables = () => {
    $(`.${DRAGGABLE_CLASS}`).draggable({
        revert: "invalid"
    });
};

// Positions the player's tiles within the tile rack
const positionPlayerTiles = () => {
    for (let i = 0; i < NUM_TILES; i++) {
        // Select the draggable and droppable elements
        const draggable = $(`.${DRAGGABLE_CLASS}:eq(${i})`);
        const droppable = $(`#tile-rack-tile-container .${DROPPABLE_CLASS}:nth-child(${i + 1})`);

        // Ensure that no other draggable elements can be placed within the current droppable element
        droppable.droppable({
            accept: `#${draggable.attr("id")}` 
        });

        // Position the draggable element
        draggable.position({
            my: "left top",
            at: "left top",
            of: droppable
        });
    }
};

// Returns the HTML string of an image that corresponds with a given tile
const getTileImage = (tile, id) => {
    // Generate a unique ID for each tile
    return `
        <img 
            alt="Tile" 
            id="${id}" 
            class="${SCRABBLE_SQUARE_CLASS} ${DRAGGABLE_CLASS}" 
            src="${TILE_IMAGE_PATHS[tile]}" 
            data-letter="${tile}">
    `;
};

// Handles the drop event for JQuery droppables
const handleDrop = (draggable, droppable) => {
    // Position the draggable element within the droppable element
    draggable.position({
        my: "left top",
        at: "left top",
        of: droppable
    });

    // Ensure that no other draggable elements can be placed within the current droppable element
    droppable.droppable({
        accept: `#${draggable.attr("id")}`
    });

    // Handle board space drops
    if (droppable.hasClass(BOARD_SPACE_CLASS))
        handleScrabbleSpaceDrop(draggable, droppable);
};

// Handles the case in which a tile is dropped onto a board space
const handleScrabbleSpaceDrop = (draggable, droppable) => {
    // Set the "letter" attribute of the droppable element
    droppable.data("letter", draggable.data("letter"));

    // Check for a valid word
    if (isScrabbleWord(getRowString())) {
        console.log("Word");
    } else {
        console.log("Not Word");
    }
};

// Handles the out event for JQuery droppables
const handleOut = (droppable) => {
    // Ensure that any draggable element can once again be placed within the current droppable element
    droppable.droppable({
        accept: `.${DRAGGABLE_CLASS}`
    });

    // Remove the "letter" attribute of the droppable element if applicable
    if (droppable.hasClass(BOARD_SPACE_CLASS))
        droppable.removeData("letter");
};

/***************************************
 * Helpers 
 ***************************************/

// Reads the file of valid words and pushes each one into the list of valid words
const initializeValidWords = () => {
    jQuery.get(WORDS_FILE, (data) => {
        // Ensure that the string is lower case
        data = data.toUpperCase();

        // Split the string
        validWords = data.split("\r\n");
    });
};

// Generates an array of n random tiles based on he tiles currently available
const randTiles = (currentTiles, n) => {
    // Initialization
    const tiles = [];

    // Generate n random tiles and push them into the array
    for (let i = 0; i < n; i++)
        tiles.push(randTile(currentTiles));
    
    return tiles;
};

// Generates a random tile based on the tiles currently available
const randTile = (currentTiles) => {
    // Determine the number of different tiles available
    const numTilesAvailable = Object.keys(currentTiles).length;

    // Return the empty string if no tiles are available
    if (numTilesAvailable === 0)
        return "";
    
    // Select a tile at random
    const randTileIndex = randInt(0, numTilesAvailable);
    const randTile = Object.keys(currentTiles)[randTileIndex];

    // Decrement the quantity of the chosen tile remaining
    currentTiles[randTile]--;

    // Remove the chosen type of tile if no more remain
    if (currentTiles[randTile] === 0)
        delete currentTiles[randTile];

    return randTile;
};

// Determines whether or not a given string is a valid Scrabble word
const isScrabbleWord = (str) => {
    // Clean up the given string
    str = str.trim().toUpperCase();

    // Search for the word in the list of valid words
    return validWords.includes(str);
};

// Determines the string formed by the letters within the board row
const getRowString = () => {
    // Initialization
    let str = "";

    // Iterate over each board space
    for (let i = 0; i < NUM_SPACES; i++) {
        // Retrieve the current letter
        const curr = $(`.${BOARD_SPACE_CLASS}:nth-child(${i + 1})`);
        const currLetter = curr.data("letter");

        // Append the current letter to the string
        if (typeof currLetter === "string")
            str += currLetter;
        else
            str += " ";
    }

    return str;
};

// Generates a random integer in the range [min, max]
const randInt = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
};

/***************************************
 * Execution
 ***************************************/

// Run
$(document).ready(main);
