import { MongoClient } from 'mongodb'
import { normalize, schema } from 'normalizr'

export class MongoContainer {
  #URI = process.env.NODE === 'dev'
    ? 'mongodb://lc77278:lc77278@localhost:27017'
    : 'mongodb+srv://lc77278:lc77278@cluster0.vkqhkh4.mongodb.net'

  constructor (name, collection) {
    this.connection = this.ConnectDb(name, collection)
  }

  async ConnectDb (name, collection) {
    const cliente = new MongoClient(this.#URI)
    await cliente.connect()
    const db = cliente.db(name)
    return db.collection(collection)
  }

  async save (data) {
    const { insertedId } = await (await this.connection).insertOne(data)
    return insertedId
  }

  async getAll () {
    const messages = await (await this.connection).find({}, { projection: { _id: 0 } }).toArray()
    const authorSchema = new schema.Entity('author', {}, { idAttribute: 'email' })
    const messageSchema = new schema.Entity('message', { author: authorSchema })
    const messagesSchema = new schema.Array({ messages: messageSchema })
    const normalizer = normalize(messages, messagesSchema)
    return normalizer
  }
}
