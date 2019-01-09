'use strict'

const eventsGameAPI = require('./events-api')
const ui = require('./ui')

let clickCount = 0
const players = ui.players
let currentBoard = ['', '', '', '', '', '', '', '', '']
const winningBoards = ui.winningBoards
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
  ui.resetClick(players, clickCount)
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
    eventsGameAPI.onUpdateGame(currentSpaceId, currentPlayer, over)
    $('#game-board > div > div > div').on('click', gameOver)
    return
  }
  clickCount += 1
  if (clickCount === 9) {
    checkForFullBoard(currentSpaceId, currentPlayer)
    return
  }
  $('#user-output').text(`Player ${players[clickCount % 2]}'s Turn`)
  eventsGameAPI.onUpdateGame(currentSpaceId, currentPlayer, over)
}

const spaceSelectionFailure = () => $('#user-output').text(`Space already selected! Player ${players[clickCount % 2]} Try Again`)

const checkForWin = currentPlayer => {
  for (const key in winningBoards) {
    const winningBoard = winningBoards[key]
    if (currentBoard[winningBoard[0]] === currentPlayer &&
    currentBoard[winningBoard[1]] === currentPlayer &&
    currentBoard[winningBoard[2]] === currentPlayer) {
      over = true
      $('#game-board > div > div > div').off('click', onSpaceClick)
      return $('#user-output').text(`Game Over. Player ${currentPlayer} Wins!`)
    }
  }
}

const checkForFullBoard = (currentSpaceId, currentPlayer) => {
  over = true
  eventsGameAPI.onUpdateGame(currentSpaceId, currentPlayer, over)
  $('#game-board > div > div > div').off('click', onSpaceClick)
  $('#game-board > div > div > div').on('click', gameOver)
  return $('#user-output').text('Game Over. It\'s a Draw!')
}

const onGameHistoryClick = event => {
  event.preventDefault()
  eventsGameAPI.onGetGames()
  eventsGameAPI.onGetOverGames(true)
  ui.hideShowForHistory()
  const isOver = true
  eventsGameAPI.onGetOverGames(isOver)
}

const onOKClick = event => {
  event.preventDefault()
  ui.returnToGameBoard()
}

const gameOver = () => $('#user-output').text('Game Over. Start a new game.')

module.exports = {
  resetBoardOnSignIn,
  onSpaceClick,
  onResetClick,
  onGameHistoryClick,
  onOKClick
}
