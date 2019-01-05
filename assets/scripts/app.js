'use strict'

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')
const authenticationEvents = require('./auth/events')

$(() => {
  $('#game-board').hide()
  $('#sign-up').on('submit', authenticationEvents.onSignUp)
  $('#sign-in').on('submit', authenticationEvents.onSignIn)
})
