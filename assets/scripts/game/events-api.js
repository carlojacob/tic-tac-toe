'use strict'

const api = require('./api')
const ui = require('./ui')

const onGetGames = () => {
  api.getGames()
    .then(ui.getGamesSuccess)
    .catch(ui.getGamesFailure)
}

const onGetOverGames = isOver => {
  api.getOverGames(isOver)
    .then(ui.getOverGamesSuccess)
    .catch(ui.getOverGamesFailure)
}

const onGetGame = () => {
  api.getGame()
    .then(ui.getGameSuccess)
    .catch(ui.getGameFailure)
}

const onCreateGame = () => {
  api.createGame()
    .then(ui.createGameSuccess)
    .catch(ui.createGameFailure)
}

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
