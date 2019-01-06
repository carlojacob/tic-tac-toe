'use strict'

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')
const authenticationEvents = require('./auth/events')
const gameEvents = require('./game/events')

// $('#game-board').hide() // ******temporarily display game-board on opening, while working on game code******
$('#change-password-sign-out').hide()

$(() => {
  $('#sign-up').on('submit', authenticationEvents.onSignUp)
  $('#sign-in').on('submit', authenticationEvents.onSignIn)
  $('#change-password').on('submit', authenticationEvents.onChangePassword)
  $('#sign-out').on('submit', authenticationEvents.onSignOut)
})

$(() => {
  $('#game-board > div > div > div').on('click', gameEvents.onSpaceClick)
})
