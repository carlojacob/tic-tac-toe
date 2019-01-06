'use strict'

let clickCount = 0
const players = ['X', 'O']
const currentBoard = ['', '', '', '', '', '', '', '', '']
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

const onSpaceClick = event => {
  respondToSpaceSelection(event)
}

const respondToSpaceSelection = event => {
  const currentSpaceId = event.target.id
  if (event.target.innerHTML === '') {
    spaceSelectionSuccess(currentSpaceId)
  } else {
    spaceSelectionFailure()
  }
}

const spaceSelectionSuccess = currentSpaceId => {
  $('#' + currentSpaceId).text(players[clickCount % 2])
  currentBoard[currentSpaceId] = `${players[clickCount % 2]}`
  checkForWin()
  if (over === true) {
    $('#game-board > div > div > div').on('click', gameOver)
    return
  }
  clickCount += 1
  if (clickCount === 9) {
    $('#game-board > div > div > div').off('click', onSpaceClick)
    $('#game-board > div > div > div').on('click', gameOver)
    over = true
    return $('#user-output').text(`Game Over. It's a Draw!`)
  }
  $('#user-output').text(`Player ${players[(clickCount + 1) % 2]}'s Turn`)
}

const spaceSelectionFailure = () => { // ******remove braces if not needed******
  $('#user-output').text(`Space already selected! Player ${players[clickCount % 2]} Try Again`)
}

const checkForWin = () => {
  for (const key in winningBoards) {
    const winningBoard = winningBoards[key]
    if (currentBoard[winningBoard[0]] === `${players[clickCount % 2]}` &&
    currentBoard[winningBoard[1]] === `${players[clickCount % 2]}` &&
    currentBoard[winningBoard[2]] === `${players[clickCount % 2]}`) {
      over = true
      $('#game-board > div > div > div').off('click', onSpaceClick)
      return $('#user-output').text(`Game Over. Player ${players[clickCount % 2]} Wins!`)
    }
  }
}

const gameOver = () => { // ******remove braces if not needed******
  $('#user-output').text(`Game Over. Start a new game.`)
}

module.exports = {
  onSpaceClick
}
