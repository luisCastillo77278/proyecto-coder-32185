import { request, response } from 'express'
import { Product } from '../models/Product.js'
import { Container } from '../models/ContainerDB.js'
import { clientSql } from '../database/cliente.js'

const listProducts = new Container(clientSql, 'PRODUCTS')

export const ProductoCtrl = {

  getAll: async (_req, res = response) => {
    const productos = await listProducts.getAll()

    if (productos.error) return

    return res.render('producto', {
      productos,
      existProducto: productos.length > 0,
      title: 'Vista de productos',
      toPath: '/producto/create',
      textPath: 'crear'
    })
  },
  create: (req, res) => {
    return res.render('formulario', {
      name: req.user.email,
      title: 'Formulario de productos',
      toPath: '/producto',
      textPath: 'menú'
    })
  },
  save: async (req = request, res = response) => {
    const { title, price, thumbnail } = req.body

    if (!title || !price || !thumbnail) {
      return res.render('formulario', {
        name: req.session.user,
        existError: true,
        error: 'los campos son obligatorios',
        title: 'Formulario de productos',
        toPath: '/producto',
        textPath: 'menú'
      })
    }

    const producto = await listProducts.save(
      new Product(title, price, thumbnail)
    )
    if (producto.error) return
    res.redirect('/producto')
  }

}
