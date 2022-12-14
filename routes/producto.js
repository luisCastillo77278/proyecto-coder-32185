import { Router } from 'express'
import { ProductoCtrl } from '../controllers'

const router = Router()

router.get('/', ProductoCtrl.getAll)
router.get('/create', ProductoCtrl.create)
router.post('/', ProductoCtrl.save)

export default router