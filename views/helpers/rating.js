module.exports =  rating = (score) => {
  if ( score > 85 ) {
    return 'A'
  } else if (score > 70) {
    return 'B'
  } else if (score > 55) {
    return 'C'
  } else if (score > 0 && score < 56) {
    return 'E'
  } else if (score === null) {
    return 'Empty'
  } else {
    return 'Error'
  }
}