import bcryptjs from 'bcryptjs'
import { Container } from '../models/ContainerDB.js'
import { clientSql } from '../database/cliente.js'

const UserModel = new Container(clientSql, 'USERS')

export const loginPassport = async (email, password, done) => {
  const user = await UserModel.getByOne(email)
  const isPassword = user ? await bcryptjs.compare(password, user.password) : false
  if (!(user && isPassword)) return done(null, false)
  done(null, user)
}

export const registerPassport = async (email, password, done) => {
  const isUser = await UserModel.getByOne(email)
  if (isUser) return done(null, false)
  const pass = await bcryptjs.hash(password, 10)
  const user = await UserModel.save({ password: pass, email })
  done(null, user)
}

export const deserailizer = async (email, done) => {
  const user = await UserModel.getByOne(email)
  done(null, user)
}

export const serializer = async (user, done) => {
  done(null, user.email)
}
