export default function (number) {

  if (number > 999999999) {
    return '+100m'
  }

  if (number > 999999) {
    return Math.sign(number)*((Math.abs(number)/1000000).toFixed(1)) + 'm'
  }

  if (number > 999) {
    return Math.sign(number)*((Math.abs(number)/1000).toFixed(1)) + 'k'
  }

  return number
}