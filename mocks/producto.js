import { faker } from '@faker-js/faker'
import crypto from 'crypto'

export const productos = [
  {
    id: crypto.randomUUID(),
    nombre: faker.commerce.product.name,
    price: faker.commerce.price,
    foto: ''
  }
]
