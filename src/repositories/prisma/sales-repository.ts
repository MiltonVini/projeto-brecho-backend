import { ISalesCreateInput, ISalesRepository } from '../i-sales-repository'
import { prisma } from '@/lib/prisma'

export class PrismaSalesRepository implements ISalesRepository {
  async insert(data: ISalesCreateInput) {
    const sale = await prisma.sales.create({
      data: {
        sale_id: data.sale_id,
        transaction_date: new Date(),
        client_id: data.client_id,
        bag_id: data.bag_id,
        product: {
          connect: { id: data.product_id },
        },
      },
    })

    return sale
  }

  async findSalesByBag(bagId: string) {
    const sales = await prisma.sales.findMany({
      where: {
        bag_id: bagId,
      },
      select: {
        id: true,
        sale_id: true,
        transaction_date: true,
        client_id: true,
        bag_id: true,
        product: {
          select: {
            id: true,
            description: true,
            price: true,
            cost: true,
          },
        },
      },
    })

    return sales
  }

  async getLastSaleId() {
    const lastSale = await prisma.sales.findFirst({
      orderBy: {
        sale_id: 'desc',
      },
    })
    return lastSale?.sale_id || null
  }
}
