const config = require('../config')
const store = require('../store')

const onGetGames = () => {
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

const onCreateGame = () => {
  return $.ajax({
    url: config.apiUrl + '/games',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
    .then(gameData => {
      store.game = gameData.game
    })
    .catch(() => console.log('New Game Could Not Be Started'))
}

const onUpdateGame = (index, value, over) => {
  return $.ajax({
    url: config.apiUrl + '/games/' + store.game.id,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: {game: {
      cell: {
        index: index,
        value: value
      },
      over: over
    }
    }
  })
    .then(gameData => {
      store.game = gameData.game
    })
    .catch(() => console.log('Game Board Could Not Be Updated'))
}

module.exports = {
  onGetGames,
  onCreateGame,
  onUpdateGame
}
