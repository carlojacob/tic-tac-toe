'use strict'

// Require files referenced in this document
const getFormFields = require('../../../lib/get-form-fields')
const api = require('./api')
const ui = require('./ui')
const eventsGameLogic = require('../game/events-logic')
const eventsGameAPI = require('../game/events-api')

// Handler for click on sign up button
const onSignUp = event => {
  event.preventDefault()
  const formData = getFormFields(event.target)

  api.signUp(formData)

    .then(ui.onSignUpSuccess)
    .catch(ui.onSignUpFailure)

  $('form').trigger('reset')
}

// Handler for click on sign in button
const onSignIn = event => {
  event.preventDefault()
  eventsGameLogic.resetBoardOnSignIn()
  const formData = getFormFields(event.target)

  api.signIn(formData)

    .then(responseData => {
      ui.onSignInSuccess(responseData)
      eventsGameAPI.onCreateGame()
    })
    .catch(ui.onSignInFailure)

  $('form').trigger('reset')
}

// Handler for click on change password button
const onChangePassword = event => {
  event.preventDefault()
  const formData = getFormFields(event.target)

  api.changePassword(formData)

    .then(ui.onChangePasswordSuccess)
    .catch(ui.onChangePasswordFailure)

  $('form').trigger('reset')
}

// Handler for click on sign out button
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
