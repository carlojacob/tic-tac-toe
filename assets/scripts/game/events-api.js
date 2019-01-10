'use strict'

// Require files referenced in this document
const api = require('./api')
const ui = require('./ui')

// Handler for request to get all game data for user
const onGetGames = () => {
  api.getGames()
    .then(ui.getGamesSuccess)
    .catch(ui.getGamesFailure)
}

// Handler for request to get all completed game data for user
const onGetOverGames = isOver => {
  api.getOverGames(isOver)
    .then(ui.getOverGamesSuccess)
    .catch(ui.getOverGamesFailure)
}

// Handler for request to get current game data for user
const onGetGame = () => {
  api.getGame()
    .then(ui.getGameSuccess)
    .catch(ui.getGameFailure)
}

// Handler for request to create a new game on user's account
const onCreateGame = () => {
  api.createGame()
    .then(ui.createGameSuccess)
    .catch(ui.createGameFailure)
}

// Handler for request to update current game data on space selections and game completion status change
const onUpdateGame = (index, value, over) => {
  api.updateGame(index, value, over)
    .then(ui.updateGameSuccess)
    .catch(ui.updateGameFailure)
}

module.exports = {
  onGetGames,
  onGetOverGames,
  onGetGame,
  onCreateGame,
  onUpdateGame
}
