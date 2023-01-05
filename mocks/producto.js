import { faker } from '@faker-js/faker'
import crypto from 'crypto'

export const getProductos = (count) => {
  const productos = new Array(count).fill(1, 0, count)

  return productos.map(() => ({
    id: crypto.randomUUID(),
    title: faker.commerce.product(),
    price: faker.commerce.price(),
    thumbnail: faker.image.sports()
  }))
}
