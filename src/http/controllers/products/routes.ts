import { FastifyInstance } from 'fastify'
import { getProducts } from './get-all-products-controllers'
import { getProductDetaisController } from './get-product-details'
import { createProduct } from './create-product'

export async function productRoutes(app: FastifyInstance) {
  app.get('/products', getProducts)
  app.get('/products/:id', getProductDetaisController)
  app.post('/products', createProduct)
}
