'use strict'

const eventsGameAPI = require('./events-api')

let clickCount = 0
const players = ['X', 'O']
let currentBoard = ['', '', '', '', '', '', '', '', '']
const winningBoards = {
  'board1': [0, 1, 2],
  'board2': [3, 4, 5],
  'board3': [6, 7, 8],
  'board4': [0, 3, 6],
  'board5': [1, 4, 7],
  'board6': [2, 5, 8],
  'board7': [0, 4, 8],
  'board8': [2, 4, 6]
}
let over = false

const resetBoardOnSignIn = () => {
  resetVariables()
  $('#game-board > div > div > div').html('')
}

const onSpaceClick = event => {
  event.preventDefault()
  const currentSpaceId = event.target.id
  if (event.target.innerHTML === '') {
    spaceSelectionSuccess(currentSpaceId)
  } else {
    spaceSelectionFailure()
  }
}

const onResetClick = () => {
  if (over === true) {
    $('#game-board > div > div > div').on('click', onSpaceClick)
  }
  eventsGameAPI.onCreateGame()
  resetVariables()
  $('#game-board > div > div > div').html('')
  $('#user-output').text(`Game Reset`)
  $('#user-output').append(`<p>Player ${players[clickCount % 2]}'s Turn</p>`)
  $('#game-board > div > div > div').off('click', gameOver)
}

const resetVariables = () => {
  over = false
  clickCount = 0
  currentBoard = ['', '', '', '', '', '', '', '', '']
}

const spaceSelectionSuccess = currentSpaceId => {
  const currentPlayer = players[clickCount % 2]
  $('#' + currentSpaceId).text(currentPlayer)
  currentBoard[currentSpaceId] = `${currentPlayer}`
  checkForWin(currentPlayer)
  if (over === true) {
    $('#game-board > div > div > div').on('click', gameOver)
    eventsGameAPI.onUpdateGame(currentSpaceId, currentPlayer, over)
    return
  }
  clickCount += 1
  if (clickCount === 9) {
    $('#game-board > div > div > div').off('click', onSpaceClick)
    $('#game-board > div > div > div').on('click', gameOver)
    over = true
    eventsGameAPI.onUpdateGame(currentSpaceId, currentPlayer, over)
    return $('#user-output').text(`Game Over. It's a Draw!`)
  }
  $('#user-output').text(`Player ${players[clickCount % 2]}'s Turn`)
  eventsGameAPI.onUpdateGame(currentSpaceId, currentPlayer, over)
}

const spaceSelectionFailure = () => { // ******remove braces if not needed******
  $('#user-output').text(`Space already selected! Player ${players[(clickCount + 1) % 2]} Try Again`)
}

const checkForWin = currentPlayer => {
  for (const key in winningBoards) {
    const winningBoard = winningBoards[key]
    if (currentBoard[winningBoard[0]] === `${currentPlayer}` &&
    currentBoard[winningBoard[1]] === `${currentPlayer}` &&
    currentBoard[winningBoard[2]] === `${currentPlayer}`) {
      over = true
      $('#game-board > div > div > div').off('click', onSpaceClick)
      return $('#user-output').text(`Game Over. Player ${currentPlayer} Wins!`)
    }
  }
}

const gameOver = () => { // ******remove braces if not needed******
  $('#user-output').text(`Game Over. Start a new game.`)
}

module.exports = {
  resetBoardOnSignIn,
  onSpaceClick,
  onResetClick
}
