const onSignUpSuccess = () => {
  $('#user-output').text('Account Successfully Created')
}

const onSignUpFailure = () => {
  $('#user-output').text('Account Already Exists')
}

module.exports = {
  onSignUpSuccess,
  onSignUpFailure
}
