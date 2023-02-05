import { Router } from 'express'
import { AutenticacionCtrl } from '../controllers/autenticacion.js'
import {
  auth
} from '../middlewares/auth.middleware.js'
import passport from 'passport'

const router = Router()

router.get('/login', AutenticacionCtrl.login)

router.post('/create',
  passport.authenticate('login', { failWithError: true }),
  AutenticacionCtrl.save,
  (_err, _req, res, _next) => {
    res.render('error', {
      auth: 'LOGIN',
      path: '/auth/login'
    })
  }
)

router.get('/register', AutenticacionCtrl.sigin)
router.post('/register',
  passport.authenticate('register', { failWithError: true }),
  AutenticacionCtrl.register,
  (_err, _req, res, _next) => {
    res.render('error', {
      auth: 'LOGIN',
      path: '/auth/register'
    })
  }
)

router.get('/logout', auth, AutenticacionCtrl.logout)

export default router
