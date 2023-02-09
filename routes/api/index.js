import { Router } from 'express'
import product from './producto.js'
import sistema from './sistema.js'

const router = Router()

router.use('/', product)
router.use('/', sistema)

export default router
