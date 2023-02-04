import { Router } from 'express'
import { AutenticacionCtrl } from '../controllers/autenticacion.js'
import {
  auth
} from '../middlewares/auth.middleware.js'
import passport from 'passport'

const router = Router()

router.get('/login', AutenticacionCtrl.login)

router.post('/create', passport.authenticate('login', {
  failWithError: true
}),
(req, res, next) => res.json({ resp: 'okl' }),
(_err, req, res, _next) => {
  res.status(401).send({ resp: false })
}
)

router.get('/logout', auth, AutenticacionCtrl.logout)

export default router
