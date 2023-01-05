import http from 'http'
import { dirname, join } from 'path'
import express from 'express'
import { engine } from 'express-handlebars'
import { Server } from 'socket.io'
import { fileURLToPath } from 'url'
import router from './routes/api/producto.js'
import { SocketCtrl } from './socket/producto.socket.js'
import { createTableChats, createTableProducts } from './database/init.js'

const app = express()
const server = http.createServer(app)
const io = new Server(server)

const PORT = 3000

const __dirname = dirname(fileURLToPath(import.meta.url))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(join(__dirname, './public')))
app.engine('handlebars', engine())
app.set('views', join(__dirname, './views'))
app.set('view engine', 'handlebars')

createTableProducts()
createTableChats()

io.on('connection', socket => SocketCtrl(socket, io))
app.use('/api', router)

server.listen(
  PORT,
  function () {
    console.log(`servidor corriendo en  http://localhost:${this.address().port}`)
  }
)

app.on('error', error => console.log(`Error en el servidor ${error}`))
