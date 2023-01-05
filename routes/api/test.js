import { Router } from 'express'
import { productos } from '../../mocks/producto'

const router = Router()

router.get('productos-test', (req, res) => {
  res.json({
    productos
  })
})
