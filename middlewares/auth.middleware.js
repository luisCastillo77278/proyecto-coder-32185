
export const auth = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/auth/login')
  }
  next()
}

export const logged = (req, res, next) => {
  if (req.session.user) {
    return res.redirect('/producto/create')
  }
  next()
}
