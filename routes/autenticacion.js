import { Router } from 'express'
import { AutenticacionCtrl } from '../controllers/autenticacion.js'
import {
  auth,
  logged
} from '../middlewares/auth.middleware.js'

const router = Router()

router.get('/login', logged, AutenticacionCtrl.login)
router.post('/login', AutenticacionCtrl.save)
router.get('/logout', auth, AutenticacionCtrl.logout)
export default router
