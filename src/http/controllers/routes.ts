import { FastifyInstance } from 'fastify'
import { registerUser } from './register-user'
import { createProduct } from './create-product'
import { insertSalesController } from './insert-sales-controller'
import { createBagController } from './create-bag-controller'
import { registerClient } from './register-client'
import { insertProductsInBag } from './insert-products-bag'
import { getProducts } from './get-all-products-controllers'
import { getBagsController } from './get-all-bags-controller'
import { updateDeliveredBagController } from './update-delivered-bag-controller'
import { getBagDetailsController } from './get-bag-details-controller'
import { getClientController } from './get-client-controller'
import { getProductDetaisController } from './get-product-details'
import { getSalesByBagController } from './get-sales-by-bag-controller'
import { getAllClientesController } from './get-all-clients-controller'
import { getClientActiveBagController } from './get-client-active-bag-controller'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', registerUser)

  app.post('/clients', registerClient)
  app.get('/clients/:id', getClientController)
  app.get('/clients', getAllClientesController)
  app.get('/clients/:client_id/active-bag', getClientActiveBagController)

  app.get('/products', getProducts)
  app.get('/products/:id', getProductDetaisController)
  app.post('/products', createProduct)

  app.get('/sales/:bag_id', getSalesByBagController)
  app.post('/sales', insertSalesController)

  app.get('/bags', getBagsController)
  app.get('/bags/:bag_id', getBagDetailsController)
  app.post('/bags', createBagController)
  app.patch('/bags/:bag_id', updateDeliveredBagController)
  app.post('/bags/products', insertProductsInBag)
}
