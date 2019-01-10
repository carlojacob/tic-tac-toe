'use strict'

// Require files referenced in this document
const eventsGameAPI = require('./events-api')
const ui = require('./ui')

// Variable to count how many spaces on the game board have been selected
let clickCount = 0
// Array of players, X and O
const players = ui.players
// Array representing the state of the game board, updated on each click
let currentBoard = ['', '', '', '', '', '', '', '', '']
// Object containing 8 arrays of indeces representing winning boards
const winningBoards = ui.winningBoards
// Variable to identify whether or not game is completed.
let over = false

// Function to reset the game board every time a user signs in
const resetBoardOnSignIn = () => {
  resetVariables()
  $('#game-board > div > div > div').html('')
}

// Handler for click on a space in the game board
const onSpaceClick = event => {
  event.preventDefault()
  const currentSpaceId = event.target.id
  if (event.target.innerHTML === '') {
    spaceSelectionSuccess(currentSpaceId)
  } else {
    spaceSelectionFailure()
  }
}

// Handler for click on reset button
const onResetClick = () => {
  if (over === true) {
    $('#game-board > div > div > div').on('click', onSpaceClick)
  }
  eventsGameAPI.onCreateGame()
  resetVariables()
  ui.resetClick(players, clickCount)
  $('#game-board > div > div > div').off('click', gameOver)
}

// Function to reset local game board information when game restarts
const resetVariables = () => {
  over = false
  clickCount = 0
  currentBoard = ['', '', '', '', '', '', '', '', '']
}

// Function to apply if selected space on board is available for play
const spaceSelectionSuccess = currentSpaceId => {
  const currentPlayer = players[clickCount % 2]
  $('#' + currentSpaceId).text(currentPlayer) // Enter player name onto board
  currentBoard[currentSpaceId] = `${currentPlayer}` // Store current game board
  // Function to check if the current player won on the most recent click
  checkForWin(currentPlayer)
  if (over === true) {
    // In the case of a winner, make final game update request to API;
    eventsGameAPI.onUpdateGame(currentSpaceId, currentPlayer, over)
    // And if user clicks game board after game, output game over message
    $('#game-board > div > div > div').on('click', gameOver)
    return
  }
  // Increment count of the number of clicks
  clickCount += 1
  // Conditional statement to apply if the board is full and there is no winner
  if (clickCount === 9) {
    onFullBoard(currentSpaceId, currentPlayer)
    return
  }
  // Output which player is expected to play next, if game is not won or tied
  $('#user-output').text(`Player ${players[clickCount % 2]}'s Turn`)
  // Make game update request to API after player selects space
  eventsGameAPI.onUpdateGame(currentSpaceId, currentPlayer, over)
}

// Handler to alert user if space was previously selected
const spaceSelectionFailure = () => $('#user-output').text(`Space already selected! Player ${players[clickCount % 2]} Try Again`)

// Function to check whether the current player won on the most recent play
const checkForWin = currentPlayer => {
  // Loop through each potential winning array in the winningBoards array
  for (const key in winningBoards) {
    // Temporarily store the current winning array
    const winningBoard = winningBoards[key]
    // Check whether the 3 values in the relevant index locations of the current board array match the current player
    if (currentBoard[winningBoard[0]] === currentPlayer &&
    currentBoard[winningBoard[1]] === currentPlayer &&
    currentBoard[winningBoard[2]] === currentPlayer) {
      // The current player has won, and the game is over
      over = true
      // Disable the ability to add X or O to the game board
      $('#game-board > div > div > div').off('click', onSpaceClick)
      // Output that the game is over and the identity of the winning player
      return $('#user-output').text(`Game Over. Player ${currentPlayer} Wins!`)
    }
  }
}

// Function applied if board is filled with no winner (tie)
const onFullBoard = (currentSpaceId, currentPlayer) => {
  // The game ends in a tie, and is over
  over = true
  // In the case of a tied game, make final game update request to API;
  eventsGameAPI.onUpdateGame(currentSpaceId, currentPlayer, over)
  // Disable the ability to add X or O to the game board
  $('#game-board > div > div > div').off('click', onSpaceClick)
  // And if user clicks game board after game, output game over message
  $('#game-board > div > div > div').on('click', gameOver)
  // Output that the game is over and the result is a draw
  return $('#user-output').text('Game Over. It\'s a Draw!')
}

// Handler for click on Game History button
const onGameHistoryClick = event => {
  event.preventDefault()
  // Make API requests for all game data and completed game data
  eventsGameAPI.onGetGames()
  // eventsGameAPI.onGetOverGames(true)
  const isOver = true
  eventsGameAPI.onGetOverGames(isOver)
  // Function to hide game play UI and show game history UI
  ui.hideShowForHistory()
}

// Handler for click on OK button in Game History
const onOKClick = event => {
  event.preventDefault()
  // Function to show game play UI and hide game history UI
  ui.returnToGameBoard()
}

// Output to the user that the game is over if there is a click on the board after game is done
const gameOver = () => $('#user-output').text('Game Over. Start a new game.')

module.exports = {
  resetBoardOnSignIn,
  onSpaceClick,
  onResetClick,
  onGameHistoryClick,
  onOKClick
}
