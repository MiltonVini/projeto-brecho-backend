import { PrismaProductRepository } from '@/repositories/prisma/products-repository'
import { CreateProductUseCase } from '@/use-cases/create-product'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function createProduct(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createProductBodySchema = z
    .object({
      description: z.string(),
      price: z.number(),
      cost: z.number(),
      stock: z.number().optional(),
      stock_type: z.enum(['single', 'multiple']),
    })
    .refine(
      (data) => {
        if (data.stock_type === 'multiple') {
          return data.stock !== undefined
        }
        return true
      },
      {
        message: 'Stock must be provided',
        path: ['stock'],
      },
    )

  try {
    const data = createProductBodySchema.parse(request.body)

    const productRepository = new PrismaProductRepository()
    const createProductUseCase = new CreateProductUseCase(productRepository)

    await createProductUseCase.execute(data)
  } catch (error) {
    console.error(error)
    throw error
  }

  return reply.status(201).send()
}
