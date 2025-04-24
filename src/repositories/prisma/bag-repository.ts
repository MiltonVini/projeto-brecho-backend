import { Bags } from '@prisma/client'
import {
  IBagCreateInput,
  IbagFindInput,
  IBagRepository,
  IBagsOutput,
} from '../i-bag-repository'
import { prisma } from '@/lib/prisma'

export class PrismaBagRepository implements IBagRepository {
  async create(data: IBagCreateInput): Promise<Bags> {
    const bag = await prisma.bags.create({
      data: {
        created_at: new Date(),
        client: {
          connect: { id: data.client_id },
        },
      },
    })

    return bag
  }

  async findActiveBagByClientId(id: string) {
    const bag = await prisma.bags.findFirst({
      where: {
        client_id: id,
        is_delivered: false,
      },
    })

    return bag
  }

  async findById(id: string) {
    const bag = await prisma.$queryRaw<IBagsOutput[]>`
      SELECT b.id, b.client_id, b.created_at, b.is_delivered, b.delivered_at, SUM(p.price) AS total_amount
      FROM bags AS b
      LEFT JOIN sales AS s 
      ON b.id = s.bag_id
      LEFT JOIN products AS p
      ON s.product_id = p.id
      WHERE b.id = ${id}
      GROUP BY b.id, b.client_id, b.created_at, b.is_delivered, b.delivered_at
    `

    return bag[0] ?? null
  }

  async updateToDelivered(id: string) {
    const bag = await prisma.bags.update({
      where: {
        id,
      },
      data: {
        is_delivered: true,
        delivered_at: new Date(),
      },
    })

    return bag
  }

  async findAll(data: IbagFindInput) {
    const bags = await prisma.bags.findMany({
      where: {
        is_delivered: data.is_delivered,
      },
      select: {
        id: true,
        created_at: true,
        is_delivered: true,
        delivered_at: true,
        client: {
          select: {
            id: true,
            name: true,
            instagram_name: true,
          },
        },
      },
      orderBy: {
        created_at: 'desc',
      },
    })

    return bags
  }
}
