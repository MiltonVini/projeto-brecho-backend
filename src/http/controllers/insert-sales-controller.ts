import { PrismaProductRepository } from '@/repositories/prisma/products-repository'
import { PrismaSalesRepository } from '@/repositories/prisma/sales-repository'
import { InsertSalesUseCase } from '@/use-cases/insert-sales-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function insertSalesController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const insertSalesBodySchema = z.object({
    product_list: z.array(z.string()),
    client_id: z.string(),
    bag_id: z.string(),
  })

  const data = insertSalesBodySchema.parse(request.body)

  console.log(data)

  try {
    const productRepository = new PrismaProductRepository()
    const salesRepository = new PrismaSalesRepository()
    const salesUseCase = new InsertSalesUseCase(
      salesRepository,
      productRepository,
    )

    await salesUseCase.execute(data)

    return reply.status(201).send()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return reply.status(400).send({
      erro: error.message,
    })
  }
}
