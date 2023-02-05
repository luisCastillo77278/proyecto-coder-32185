import { request, response } from 'express'
import { Container } from '../models/ContainerDB.js'
import { clientSql } from '../database/cliente.js'
import bcryptjs from 'bcryptjs'

const UserModel = new Container(clientSql, 'USERS')

export const AutenticacionCtrl = {

  login: async (_req, res = response) => {
    return res.render('login')
  },
  save: async (_req, res = response) => {
    return res.redirect('/producto/create')
  },
  sigin: async (_req, res = response) => {
    return res.render('sigin')
  },
  register: async (req, res = response) => {
    const { password, email } = req.body

    const isUser = await UserModel.getByOne(email)

    if (isUser) {
      return res.render('error', {
        auth: 'SIGIN',
        path: '/auth/register'
      })
    }

    const pass = await bcryptjs.hash(password, 10)
    await UserModel.save({ password: pass, email })

    return res.redirect('/producto/create')
  },
  logout: async (req = request, res = response) => {
    if (req.isAuthenticated()) {
      const user = req.user
      req.logout(_err => {
        res.render('logout', {
          name: user.email
        })
      })
    }
  }
}
