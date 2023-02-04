import { request, response } from 'express'

export const AutenticacionCtrl = {

  login: async (_req, res = response) => {
    return res.render('login')
  },
  save: async (req = request, res = response) => {
    console.log('post login')
    // const { name } = req.body
    console.log(req.user)
    // if (!name) return res.render('login')

    // if (!req.session.user) {
    //   req.session.user = name
    // }

    return res.redirect('/producto/create')
  },
  logout: async (req = request, res = response) => {
    res.render('logout', {
      name: req.user.email
    })
    req.session.destroy()
  }
}
