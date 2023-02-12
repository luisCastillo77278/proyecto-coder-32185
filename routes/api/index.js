import { Router } from 'express'
import product from './producto.js'
import sistema from './sistema.js'
import proceso from './proceso.js'

const router = Router()

router.use('/', product)
router.use('/', sistema)
router.use('/', proceso)
export default router
