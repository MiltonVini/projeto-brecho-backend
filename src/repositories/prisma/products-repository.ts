import { Prisma } from '@prisma/client'
import { IProductRepository, IProductFindInput } from '../i-products-repository'
import { ProductUpdateInput } from '../i-users-repository'
import { prisma } from '@/lib/prisma'

export class PrismaProductRepository implements IProductRepository {
  async create(data: Prisma.ProductCreateInput) {
    const product = await prisma.product.create({
      data: {
        description: data.description,
        price: data.price,
        cost: data.cost,
        stock: data.stock,
        stock_type: data.stock_type,
        created_at: new Date(),
      },
    })
    return product
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async update(data: ProductUpdateInput): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async findById(id: string) {
    const product = await prisma.product.findFirst({
      where: {
        id,
      },
    })
    return product
  }

  async findProductStockType(id: string) {
    const product = await prisma.product.findFirst({
      where: {
        id,
      },
    })

    return product?.stock_type || null
  }

  async updateToSold(id: string) {
    await prisma.product.update({
      where: {
        id,
      },
      data: {
        is_sold: true,
      },
    })
  }

  async findAll(data: IProductFindInput) {
    const products = await prisma.product.findMany({
      where: {
        is_sold: data.is_sold,
      },
    })
    return products
  }
}
