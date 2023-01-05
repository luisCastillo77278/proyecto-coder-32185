import { clientSql } from './cliente.js'

export const createTableProducts = async () => {
  const exist = await clientSql.schema.hasTable('PRODUCTS')
  if (!exist) {
    await clientSql.schema.createTable('PRODUCTS', table => {
      table.string('id')
      table.string('title')
      table.string('thumbnail')
      table.float('price')
    })
  }
  console.log('TABLA PRODUCTS CREADA')
}

export const createTableChats = async () => {
  const exist = await clientSql.schema.hasTable('CHATS')
  if (!exist) {
    await clientSql.schema.createTable('CHATS', table => {
      table.increments('id')
      table.string('email')
      table.string('message')
      table.string('date')
    })
  }
  console.log('TABLA CHATS CREADA')
}
