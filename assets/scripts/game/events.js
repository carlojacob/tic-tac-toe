'use strict'

let clickCount = 0
const players = ['X', 'O']

const onSpaceClick = event => {
  respondToSpaceSelection(event)
}

const respondToSpaceSelection = event => {
  const currentSpaceId = event.target.id
  if (event.target.innerHTML === '') {
    spaceSelectionSuccess(currentSpaceId)
  } else {
    spaceSelectionFailure()
  }
}

const spaceSelectionSuccess = currentSpaceId => {
  $('#' + currentSpaceId).text(players[clickCount % 2])
  $('#user-output').text(`Player ${players[(clickCount + 1) % 2]}'s turn`)
  clickCount += 1
}

const spaceSelectionFailure = () => {
  $('#user-output').text(`Space already selected! Player ${players[clickCount % 2]} Try again`)
}

module.exports = {
  onSpaceClick
}
