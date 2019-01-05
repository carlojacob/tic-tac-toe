let clickCount = 0

const onSpaceClick = event => {
  const currentId = event.target.id
  if (clickCount % 2 === 0) {
    $('#' + currentId).text('X')
  } else {
    $('#' + currentId).text('O')
  }
  clickCount += 1
}

module.exports = {
  onSpaceClick
}
