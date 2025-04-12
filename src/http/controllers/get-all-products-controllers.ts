import { PrismaProductRepository } from '@/repositories/prisma/products-repository'
import { GetProductsUseCase } from '@/use-cases/get-all-products-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function getProducts(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const getProductsParamsSchema = z.object({
      is_sold: z.boolean().optional(),
    })

    const { is_sold } = getProductsParamsSchema.parse(request.params)

    const data = {
      is_sold,
    }

    const productRepository = new PrismaProductRepository()
    const getProductsUseCase = new GetProductsUseCase(productRepository)

    const products = await getProductsUseCase.execute(data)

    return reply.status(200).send(products)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return reply.status(409).send({
      message: error.message,
    })
  }
}
