import { PrismaBagProductsRepository } from '@/repositories/prisma/bag-products-repository'
import { PrismaBagRepository } from '@/repositories/prisma/bag-repository'
import { PrismaProductRepository } from '@/repositories/prisma/products-repository'
import { InsertProductsInBagUseCase } from '@/use-cases/insert-products-bag'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function insertProductsInBag(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const insertProductsBagBodySchema = z.object({
    client_id: z.string(),
    product_list: z.array(z.string()),
  })

  const data = insertProductsBagBodySchema.parse(request.body)

  try {
    const bagRepository = new PrismaBagRepository()
    const bagProductsRepository = new PrismaBagProductsRepository()
    const productRepository = new PrismaProductRepository()
    const inserProductsBagUseCase = new InsertProductsInBagUseCase(
      bagRepository,
      bagProductsRepository,
      productRepository,
    )

    await inserProductsBagUseCase.execute({
      ...data,
    })

    return reply.status(201).send()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return reply.status(409).send({
      message: error.message,
    })
  }
}
