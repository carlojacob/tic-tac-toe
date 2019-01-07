const config = require('../config')
const store = require('../store')

const getGamesOnSignIn = () => {
  return $.ajax({
    url: config.apiUrl + '/games',
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
    .then(gamesData => {
      store.games = gamesData.games
    })
    .catch(() => console.log('All Game Data Could Not Be Retrieved'))
}

const createGameOnSignIn = () => {
  return $.ajax({
    url: config.apiUrl + '/games',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
    .then(gameData => {
      store.game = gameData.game
      console.log(store)
      console.log(store.game)
    })
    .catch(
      console.log('New Game Could Not Be Started')
    )
}

module.exports = {
  getGamesOnSignIn,
  createGameOnSignIn
}
