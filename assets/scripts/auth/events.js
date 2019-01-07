'use strict'

const getFormFields = require('../../../lib/get-form-fields')
const api = require('./api')
const ui = require('./ui')
const eventsGameLogic = require('../game/events-logic')
const eventsGameAPI = require('../game/events-api')

const onSignUp = event => {
  event.preventDefault()
  const formData = getFormFields(event.target)

  api.signUp(formData)

    .then(ui.onSignUpSuccess)
    .catch(ui.onSignUpFailure)

  $('form').trigger('reset')
}

const onSignIn = event => {
  event.preventDefault()
  eventsGameLogic.resetBoardOnSignIn()
  const formData = getFormFields(event.target)

  api.signIn(formData)

    .then(responseData => {
      ui.onSignInSuccess(responseData)
      eventsGameAPI.getGamesOnSignIn()
      eventsGameAPI.createGameOnSignIn()
    })
    .catch(ui.onSignInFailure)

  $('form').trigger('reset')
}

const onChangePassword = event => {
  event.preventDefault()
  const formData = getFormFields(event.target)

  api.changePassword(formData)

    .then(ui.onChangePasswordSuccess)
    .catch(ui.onChangePasswordFailure)

  $('form').trigger('reset')
}

const onSignOut = event => {
  event.preventDefault()

  api.signOut()

    .then(ui.onSignOutSuccess)
    .catch(ui.onSignOutFailure)
}

module.exports = {
  onSignUp,
  onSignIn,
  onChangePassword,
  onSignOut
}
