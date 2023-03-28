// Import prompt sync to ask for player input
const prompt = require('prompt-sync')();
// -------------------------- Player ----------------------------------
// Current player
let currentPlayer = 'X';

// Winner of the game
let winner = '';

// Switch the current player after each play
function switchPlayer() {
    if (currentPlayer === 'X') {
        currentPlayer = 'O'
    } else if (currentPlayer === 'O'){
        currentPlayer = 'X'
    }
}

// -------------------------- Board ----------------------------------
// Initialize the board
const board = {
    1: ' ',
    2: ' ',
    3: ' ',
    4: ' ',
    5: ' ',
    6: ' ',
    7: ' ',
    8: ' ',
    9: ' ',
}

// Get empty positions from the game board
function getEmptyPositions() {
    const boardEntries = Object.entries(board)
    const emptyEntries = boardEntries.filter((entry) => entry[1] === ' ' )
    const emptyPositions = emptyEntries.map(([position,_]) => position)

    return emptyPositions
}

// Validate the position input from player
function validatePosition(boardPosition) {
    const position = parseInt(boardPosition)  //User input for prompt will be a string
    const emptyPositions = getEmptyPositions()
    // Valid if 1-9
    // Valid if empty

    if (position < 1 || position > 9) return false
    if (board[position] !== ' ') return false

    return true
}

// Display the game board
function displayBoard() {
    console.log(`
     ${board[1]} | ${board[2]} | ${board[3]}
     ---------
     ${board[4]} | ${board[5]} | ${board[6]}
     ---------
     ${board[7]} | ${board[8]} | ${board[9]}
    `)
}

// Mark the board with the current player's marker
function markBoard(position) {
    if (!validatePosition(position)) return console.log("Invalid Position")
    board[position] = currentPlayer
    switchPlayer()
}

// Check if there is a winner
function checkWin() {
    //Winning combos
    const winCombos = [
        [1,2,3],
        [4,5,6],
        [7,8,9],
        [1,4,7],
        [2,5,8],
        [3,6,9],

        [1,5,9],
        [3,5,7],
    ]

    for (const combo of winCombos){
        const a = combo[0]
        const b = combo[1]
        const c = combo[2]

        if (board[a] != ' ' && board[a] === board[b] && board[b] === board[c]){
            winner = board[a]
            return true
        }
    }
    return false
}


// Check if there is a tie
function checkTie() {
    //No empty positions
    //No winner
    const hasWinner = checkWin()
    const emptyPositions = getEmptyPositions()
    if (hasWinner) return false
    if (emptyPositions.length > 0) return false

    return true
}

// -------------------------- Game ----------------------------------
// Play: Start the game if play is true, else stop the game
let isPlaying = false;

// Ask the player if they want to play
function askToPlay() {
    const userPrompt = prompt("Do you want to play a game? (Y/N)")

    if (userPrompt.toLowerCase() === 'y'){
        isPlaying = true;
    } else if (userPrompt.toLowerCase() === 'n'){
        isPlaying = false;
    } else {
        askToPlay()
    }
}

// Start the game
function startGame() {
    askToPlay()

    if(!isPlaying) return

    displayBoard()

    while (isPlaying != false) {
        console.log(`It's ${currentPlayer}'s turn!`)
        const position = prompt("Enter number 1-9 to place your marker")
        markBoard(position)
        displayBoard()

        const hasWinner = checkWin()
        if (hasWinner) {
            console.log(`${winner} has won!`)
            isPlaying = false
        }

        const isTie = checkTie()
        if (isTie) {
            console.log(`It's a tie!`)
            isPlaying = false
        }
    }
}

startGame()