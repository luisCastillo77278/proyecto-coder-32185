import http from 'node:http'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import express from 'express'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import passport from 'passport'
import { Strategy } from 'passport-local'
import { engine } from 'express-handlebars'
import { Server } from 'socket.io'

import router from './routes/api/producto.js'
import login from './routes/autenticacion.js'
import producto from './routes/producto.js'
import { SocketCtrl } from './socket/producto.socket.js'

import {
  createTableChats,
  createTableProducts,
  createTableUsers
} from './database/init.js'

const app = express()
const server = http.createServer(app)
const io = new Server(server)

const PORT = 3001
const URI_MONGO = process.env.NODE === 'dev'
  ? 'mongodb://lc77278:lc77278@localhost:27017/sesiones?authSource=admin&w=1'
  : 'mongodb+srv://lc77278:lc77278@cluster0.vkqhkh4.mongodb.net'

const advancedOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

const __dirname = dirname(fileURLToPath(import.meta.url))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(join(__dirname, './public')))
app.engine('handlebars', engine())
app.set('views', join(__dirname, './views'))
app.set('view engine', 'handlebars')

app.use(session({
  secret: 'secreto',
  saveUninitialized: false,
  resave: false
}))

createTableProducts()
createTableChats()
createTableUsers()

io.on('connection', socket => SocketCtrl(socket, io))
app.use('/auth', login)
app.use('/producto', producto)
app.use('/api', router)

passport.use('login', new Strategy(
  (email, password, done) => {
    const user = users[email]
    if (user?.password !== password) {
      return done(null, false)
    }
    done(null, user)
  })
)

app.use(passport.initialize())
const users = {
  'lc77278@gmail.com': {
    email: 'lc77278@gmail.com',
    password: '12345678'
  }
}

passport.serializeUser((user, done) => {
  done(null, user.email)
})

passport.deserializeUser((email, done) => {
  const user = Object.values(users).find(u => u.email === email)
  done(null, user)
})

app.use(passport.session())

server.listen(
  PORT,
  function () {
    console.log(`servidor corriendo en PORT: ${this.address().port}`)
  }
)

// app.on('error', error => console.log(`Error en el servidor ${error}`))
