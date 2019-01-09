'use strict'

const store = require('../store')

const players = ['X', 'O']
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

const resetClick = (players, clickCount) => {
  $('#game-board > div > div > div').html('')
  $('#user-output').text(`Game Reset`)
  $('#user-output').append(`<p>Player ${players[clickCount % 2]}'s Turn</p>`)
}

const getGamesSuccess = gamesData => {
  store.games = gamesData.games
  const totalGames = store.games.length
  $('#history-output0').hide()
  for (let i = 0; i < 5; i++) {
    $('#history-output' + (i + 1)).show()
  }
  $('#history-output2').text(`Total Games Played: ${totalGames}`)
  $('#ok').show()
}

const getGamesFailure = gameData => $('#user-output').text(`Unable to Get Games Data`)

const getOverGamesSuccess = gamesData => {
  store.overGames = gamesData.games
  const totalOverGames = store.overGames.length
  $('#history-output3').text(`Total Games Completed: ${totalOverGames}`)
  calcWinPercent(store.overGames)
}

const calcWinPercent = overGames => {
  let gameBoard = []
  const totalWins = [0, 0]
  for (let i = 0; i < overGames.length; i++) {
    gameBoard = overGames[i].cells
    for (const key in winningBoards) {
      const winningBoard = winningBoards[key]
      for (let j = 0; j < players.length; j++) {
        if (gameBoard[winningBoard[0]] === players[j] && gameBoard[winningBoard[1]] === players[j] && gameBoard[winningBoard[2]] === players[j]) {
          totalWins[j] += 1
        }
      }
    }
  }
  $('#history-output4').text(`Total Games Won by Player ${players[0]}: ${totalWins[0]}`)
  $('#history-output5').text(`Total Games Won by Player ${players[1]}: ${totalWins[1]}`)
}

const getOverGamesFailure = gameData => $('#user-output').text(`Unable to Get Over Games Data`)

const getGameSuccess = gamesData => {
  store.game = gamesData.game
}

const getGameFailure = gameData => $('#user-output').text(`Unable to Get Game Data`)

const createGameSuccess = gameData => {
  store.game = gameData.game
}

const createGameFailure = gamesData => $('#user-output').text(`New Game Could Not Be Started`)

const updateGameSuccess = gameData => {
  store.game = gameData.game
}

const returnToGameBoard = () => {
  const currentOutput = $('#user-output').text()
  if (currentOutput.indexOf('Enjoy') > -1 || currentOutput.indexOf('Reset') > -1) {
    $('#user-output').text('Player X\'s turn')
  }
  hideShowForGameBoard()
}

const updateGameFailure = gamesData => $('#user-output').text(`Game Storage Could Not Be Updated`)

const hideShowForHistory = () => {
  $('#change-password-sign-out').hide()
  $('#reset-and-history').hide()
  $('#user-output').hide()
  $('#game-board').hide()
  $('#history-output0').show()
}

const hideShowForGameBoard = () => {
  for (let i = 0; i < 5; i++) {
    $('#history-output' + (i + 1)).hide()
  }
  $('#ok').hide()
  $('#change-password-sign-out').show()
  $('#reset-and-history').show()
  $('#user-output').show()
  $('#game-board').show()
}

module.exports = {
  players,
  winningBoards,
  resetClick,
  getGamesSuccess,
  getGamesFailure,
  getOverGamesSuccess,
  getOverGamesFailure,
  getGameSuccess,
  getGameFailure,
  createGameSuccess,
  createGameFailure,
  updateGameSuccess,
  updateGameFailure,
  hideShowForHistory,
  returnToGameBoard
}
