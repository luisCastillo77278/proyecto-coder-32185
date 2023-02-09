import { MongoClient } from 'mongodb'
import { normalize, schema } from 'normalizr'
import { config } from 'dotenv'

config()

export class MongoContainer {
  #URI = process.env.NODE === 'dev'
    ? process.env.MONGO_URI_DEV_CONT
    : process.env.MONGO_URI_PROD

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
