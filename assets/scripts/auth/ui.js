const onSignUpSuccess = () => {
  $('#user-output').text('Account Successfully Created')
}

const onSignUpFailure = () => {
  $('#user-output').text('Account Already Exists')
}

const onSignInSuccess = () => {
  $('#user-output').text('Successfully Signed In. Enjoy The Game.')
  // hide sign-up and sign-in container
  $('#sign-up-or-in').hide()
  // show game board container
  $('#game-board').show()
}

const onSignInFailure = () => {
  $('#user-output').text('Could Not Sign In. Please Try Again')
}

module.exports = {
  onSignUpSuccess,
  onSignUpFailure,
  onSignInSuccess,
  onSignInFailure
}
