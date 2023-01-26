import { Router } from 'express'
import { ProductoCtrl } from '../controllers/producto.js'
import {
  auth
} from '../middlewares/auth.middleware.js'

const router = Router()

router.get('/', ProductoCtrl.getAll)
router.get('/create', auth, ProductoCtrl.create)
router.post('/', auth, ProductoCtrl.save)

export default router
