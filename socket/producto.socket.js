import { Product } from '../models/Product.js'
import { Container } from '../models/ContainerDB.js'
import { clientSql } from '../database/cliente.js'
import { MongoContainer } from '../models/MongoContainer.js'

export const SocketCtrl = async (socket, io) => {
  ProductoSocket(socket, io)
  ChatSocket(socket, io)
}

const ProductoSocket = async (socket, io) => {
  const listProducts = new Container(clientSql, 'PRODUCTS')
  const productos = await listProducts.getAll()
  socket.emit('productos', productos)

  socket.on('addProducto', async (payload) => {
    await listProducts.save(new Product(payload.title, payload.price, payload.thumbnail))
    const productos = await listProducts.getAll()
    io.sockets.emit('productos', productos)
  })
}

const ChatSocket = async (socket, io) => {
  const listChats = new MongoContainer('coderhouse', 'CHATS')
  const chats = await listChats.getAll()

  socket.emit('chats', chats)

  socket.on('addChat', async (payload) => {
    await listChats.save(payload)
    const chats = await listChats.getAll()
    io.sockets.emit('chats', chats)
  })
}
