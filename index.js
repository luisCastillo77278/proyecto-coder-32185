import http from 'node:http'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { config } from 'dotenv'
import express from 'express'
import session from 'express-session'
import parseArgs from 'minimist'
import MongoStore from 'connect-mongo'
import passport from 'passport'
import { Strategy } from 'passport-local'
import { engine } from 'express-handlebars'
import { Server } from 'socket.io'

import router from './routes/api/index.js'
import login from './routes/autenticacion.js'
import producto from './routes/producto.js'
import { SocketCtrl } from './socket/producto.socket.js'
import {
  loginPassport,
  registerPassport,
  deserailizer,
  serializer
} from './middlewares/login.middleware.js'

import {
  createTableChats,
  createTableProducts,
  createTableUsers
} from './database/init.js'

const app = express()
const server = http.createServer(app)
const io = new Server(server)
config()
const args = parseArgs(process.argv.slice(2), {
  default: {
    port: 3001
  },
  alias: {
    p: 'port'
  }
})

const PORT = args.port
const URI_MONGO = process.env.NODE === 'dev'
  ? process.env.MONGO_URI_DEV
  : process.env.MONGO_URI_PROD

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
  secret: process.env.SECRETO,
  saveUninitialized: false,
  resave: false,
  store: MongoStore.create({
    mongoUrl: URI_MONGO,
    mongoOptions: advancedOptions
  }),
  cookie: {
    maxAge: 20000
  }
}))

createTableProducts()
createTableChats()
createTableUsers()

passport.use('login', new Strategy({
  usernameField: 'email'
}, loginPassport))
passport.use('register', new Strategy({
  usernameField: 'email',
  passwordField: 'password'
}, registerPassport))
app.use(passport.initialize())
passport.serializeUser(serializer)
passport.deserializeUser(deserailizer)
app.use(passport.session())

io.on('connection', socket => SocketCtrl(socket, io))
app.use('/auth', login)
app.use('/producto', producto)
app.use('/api', router)

server.listen(
  PORT,
  function () {
    console.log(`servidor corriendo en PORT: ${this.address().port}`)
  }
)

app.on('error', error => console.log(`Error en el servidor ${error}`))
