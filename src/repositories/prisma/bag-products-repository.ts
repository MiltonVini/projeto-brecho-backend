import { BagProducts } from '@prisma/client'
import {
  IBagProductCreateInput,
  IBagProductsRepository,
} from '../i-bag-products'
import { prisma } from '@/lib/prisma'

export class PrismaBagProductsRepository implements IBagProductsRepository {
  async create(data: IBagProductCreateInput): Promise<BagProducts> {
    const bag = await prisma.bagProducts.create({
      data: {
        bag: {
          connect: {
            id: data.bag_id,
          },
        },
        product: {
          connect: {
            id: data.product_id,
          },
        },
      },
    })
    return bag
  }
}
