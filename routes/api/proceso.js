import { request, response, Router } from 'express'

const router = Router()

const numRandom = (max) => Math.round(Math.random() * (max + 1) - 1)
const countRepet = (numbers = []) => {
  const repet = {}
  numbers.forEach(number => {
    repet[number] = (repet[number] || 0) + 1
  })
  return repet
}

router.get('/ramdom', (req = request, res = response) => {
  const { cant } = req.query

  const self = cant ?? 500 // 100.000.000

  const numbers = new Array(self).fill().map((_value, _index) => numRandom(self))

  const repet = countRepet(numbers)
  console.log(repet)
  res.json({
    repet,
    length: Object.values(repet).length
  })
})

export default router
