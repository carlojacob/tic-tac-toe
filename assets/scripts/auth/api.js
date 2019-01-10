'use strict'

// Require files referenced in this document
const config = require('../config')
const store = require('../store')

// API request using AJAX (POST) for click on sign up button
const signUp = formData => {
  return $.ajax({
    url: config.apiUrl + '/sign-up',
    method: 'POST',
    data: formData
  })
}

// API request using AJAX (POST) for click on sign in button
const signIn = formData => {
  return $.ajax({
    url: config.apiUrl + '/sign-in',
    method: 'POST',
    data: formData
  })
}

// API request using AJAX (PATCH) for click on change password button
const changePassword = formData => {
  return $.ajax({
    url: config.apiUrl + '/change-password',
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: formData
  })
}

// API request using AJAX (DELETE) for click on sign out button
const signOut = () => {
  return $.ajax({
    url: config.apiUrl + '/sign-out',
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

module.exports = {
  signUp,
  signIn,
  changePassword,
  signOut
}
