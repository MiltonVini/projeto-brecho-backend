import { FastifyInstance } from 'fastify'
import { getBagsController } from './get-all-bags-controller'
import { getBagDetailsController } from './get-bag-details-controller'
import { createBagController } from './create-bag-controller'
import { updateDeliveredBagController } from './update-delivered-bag-controller'
import { insertProductsInBag } from './insert-products-bag'

export async function bagRoutes(app: FastifyInstance) {
  app.get('/bags', getBagsController)
  app.get('/bags/:bag_id', getBagDetailsController)
  app.post('/bags', createBagController)
  app.patch('/bags/:bag_id', updateDeliveredBagController)
  app.post('/bags/products', insertProductsInBag)
}
