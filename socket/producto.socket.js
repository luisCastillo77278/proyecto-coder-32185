import { Product } from '../models/Product.js'
// import { Container } from '../models/ContainerDB.js'
import { Container } from '../models/MongoContainer.js'
import { normalize, schema } from 'normalizr'
// import { clientSql } from '../database/cliente.js'

export const SocketCtrl = async (socket, io) => {
  ProductoSocket(socket, io)
  ChatSocket(socket, io)
}

const ProductoSocket = async (socket, io) => {
  // const listProducts = new Container(clientSql, 'PRODUCTS')
  const listProducts = new Container('products')
  const productos = await listProducts.getAll()
  socket.emit('productos', productos)

  socket.on('addProducto', async (payload) => {
    await listProducts.save(new Product(payload.title, payload.price, payload.thumbnail))
    const productos = await listProducts.getAll()
    io.sockets.emit('productos', productos)
  })
}

const ChatSocket = async (socket, io) => {
  const listChats = new Container('chats')
  const authorSchema = new schema.Entity('author', {}, { idAttribute: 'email' })
  const messageSchema = new schema.Entity('message', { author: authorSchema })
  const messagesSchema = new schema.Array(messageSchema)

  const chats = await listChats.getAll()

  const normalizado = normalize(chats, messagesSchema)
  console.log(normalizado)
  socket.emit('chats', chats)

  socket.on('addChat', async (payload) => {
    await listChats.save(payload)
    const chats = await listChats.getAll()

    const normalizado = normalize(chats, messagesSchema)
    console.log(normalizado)

    io.sockets.emit('chats', chats)
  })
}
