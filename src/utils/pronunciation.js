export default function (number, titles) {
  const cases = [2, 0, 1, 1, 1, 2]
  const check = number % 100 > 4 && number % 100 < 20
  const finalCase = cases[number % 10 < 5 ? number % 10 : 5]

  return titles[check ? 2 : finalCase]
}