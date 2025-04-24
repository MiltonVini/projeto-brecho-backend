import { PrismaProductRepository } from '@/repositories/prisma/products-repository'
import { ProductNotFoundError } from '@/use-cases/errors/product-not-found-error'
import { GetProductDetailsUseCase } from '@/use-cases/get-product-details-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function getProductDetaisController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const getProductDetailsParamsSchema = z.object({
      id: z.string(),
    })

    const { id } = getProductDetailsParamsSchema.parse(request.params)

    const productRepository = new PrismaProductRepository()
    const getProductDetailsUseCase = new GetProductDetailsUseCase(
      productRepository,
    )

    const product = await getProductDetailsUseCase.execute(id)

    return reply.status(200).send(product)
  } catch (error) {
    if (error instanceof ProductNotFoundError) {
      return reply.status(409).send({
        message: error.message,
      })
    }

    if (error instanceof Error) {
      return reply.status(400).send({
        message: error.message,
      })
    }

    return reply.status(500).send({
      message: 'Internal Server Error',
    })
  }
}
