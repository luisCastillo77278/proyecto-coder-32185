import { FileCustom } from '../utilities/file.utility.js'
import { HandlingError } from '../utilities/handlingError.utility.js'

export class Container {
  #fileCustom
  constructor (file) {
    this.#fileCustom = new FileCustom(file)
  }

  async getDataBase () {
    return await this.#fileCustom.readFile()
  }

  async save (product) {
    try {
      const products = await this.getDataBase()
      products.push(product)

      await this.#fileCustom.writeFile(products)
      return product
    } catch (err) {
      return HandlingError.TrhowError(err)
    }
  }

  async getById (id) {
    try {
      const products = await this.getDataBase()
      const product = products.find((product) => product.id === id)

      if (!product) return HandlingError.ErrorFind(id)

      return product
    } catch (err) {
      return HandlingError.TrhowError(err)
    }
  }

  async getAll () {
    try {
      return await this.getDataBase()
    } catch (err) {
      return HandlingError.TrhowError(err)
    }
  }

  async updateById (id, producto) {
    try {
      const products = await this.getDataBase()
      const index = products.findIndex((product) => product.id === id)

      if (index === -1) return HandlingError.ErrorFind(id)

      products[index] = { ...products[index], ...producto }
      await this.#fileCustom.writeFile(products)
      return products[index]
    } catch (err) {
      return HandlingError.TrhowError(err)
    }
  }

  async deleteById (id) {
    try {
      const products = await this.getDataBase()
      const index = products.findIndex((product) => product.id === id)

      if (index === -1) return HandlingError.ErrorFind(id)

      const product = products[index]
      products.splice(index, 1)
      await this.#fileCustom.writeFile(products)
      return product
    } catch (err) {
      return HandlingError.TrhowError(err)
    }
  }

  async deleteAll () {
    try {
      await this.#fileCustom.writeFile([])
      return HandlingError.Message('Los elementos fueron eliminados')
    } catch (err) {
      return HandlingError.TrhowError(err)
    }
  }
}
