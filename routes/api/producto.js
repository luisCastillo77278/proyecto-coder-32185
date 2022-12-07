import { Router } from 'express'
import { ProductoCtrl } from '../../controllers/api/producto.js'

const router = Router()

router.get('/productos', ProductoCtrl.getAll)
router.get('/productos/:id', ProductoCtrl.getById)
router.post('/productos', ProductoCtrl.create)
router.put('/productos/:id', ProductoCtrl.updateById)
router.delete('/productos/:id', ProductoCtrl.deleteById)



export default  router