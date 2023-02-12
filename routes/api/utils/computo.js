const numRandom = (max) => Math.round(Math.random() * (max + 1) - 1)
const countRepet = (numbers = []) => {
  const repet = {}
  numbers.forEach(number => {
    repet[number] = (repet[number] || 0) + 1
  })
  return repet
}

process.on('message', msg => {
  const numbers = new Array(msg).fill().map((_value, _index) => numRandom(1000))
  const repet = countRepet(numbers)
  process.send(repet)
})

process.send('listo')
