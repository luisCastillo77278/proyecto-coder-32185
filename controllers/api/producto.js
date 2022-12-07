import { request, response } from "express";
import { Container } from "../../models/ContainerDB.js";
import { clientSql } from "../../database/cliente.js";
import { Product } from "../../models/Product.js";

const listProducts = new Container(clientSql, "PRODUCTS");

//todo falta usar el throw error
export const ProductoCtrl = {
  getAll: async (_req, res) => {
    try {
      const productos = await listProducts.getAll();

      return res.status(200).json({
        productos,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  },
  getById: async (req = request, res = response) => {
    try {
      const { id } = req.params;
      const producto = await listProducts.getById(id);

      if (!producto)
        return res.json({
          message: "No existe ese elemento",
        });

      return res.status(200).json({
        producto,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  },
  create: async (req = request, res = response) => {
    try {
      const { title, thumbnail, price } = req.body;
      const producto = await listProducts.save(
        new Product(title, price, thumbnail)
      );

      if (!producto)
        return res.json({
          message: "No se creo el elemento",
        });

      return res.status(200).json({
        producto,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  },
  updateById: async (req = request, res = response) => {
    try {
      const { id } = req.params;
      const producto = await listProducts.updateById(id, { ...req.body });

      if (!producto)
        return res.json({
          message: "No existe ese elemento",
        });

      return res.status(200).json({
        producto,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  },
  deleteById: async (req = request, res = response) => {
    try {
      const { id } = req.params;
      const producto = await listProducts.deleteById(id);

      if (!producto)
        return res.json({
          message: "El elemento no se econtro",
        });

      return res.status(200).json({
        producto,
      });
    } catch (err) {
      return res.status(500).json({
        message: error.message,
      });
    }
  },
};
