import { MongoClient } from 'mongodb'

export class Container {
  #config = {
    url: 'mongodb://lc77278:lc77278@localhost:27017'
  }

  constructor (collection) {
    this.collection = this.#configDb(collection)
  }

  async #configDb (collection) {
    console.log(collection)
    const client = new MongoClient(this.#config.url)
    await client.connect()
    const db = client.db('coderpruebas')
    return db.collection(collection)
  }

  async save (data) {
    const { insertedId } = await (await this.collection).insertOne(data)
    return await (await this.collection).findOne({ _id: insertedId }, { projection: { _id: 0 } })
  }

  async getAll () {
    return await (await this.collection).find({}, { projection: { _id: 0 } }).toArray()
  }
}
