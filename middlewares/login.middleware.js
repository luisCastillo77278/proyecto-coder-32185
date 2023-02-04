// import bcryptjs from 'bcryptjs'
import { Container } from '../models/ContainerDB.js'
import { clientSql } from '../database/cliente.js'

const UserModel = new Container(clientSql, 'USERS')

export const loginPassport = async (email, password, done) => {
  // a qui seria buscar el usuario
  const user = await UserModel.getByOne(email)
  // verificar si el usuario existe
  // const isPassword = await bcryptjs.compare(password, '')
  // verificar si el password es correcto
  if (!user || password !== '12345678') return done(null, false)
  // retornar done
  done(null, user)
}

export const deserailizer = async (email, done) => {
  const user = await UserModel.getByOne(email)
  done(null, user)
}

export const serializer = async (user, done) => {
  done(null, user.email)
}
