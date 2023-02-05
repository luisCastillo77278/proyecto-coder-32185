import { request, response } from 'express'

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
  register: async (_req, res = response) => {
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
