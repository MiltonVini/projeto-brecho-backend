import { PrismaBagRepository } from '@/repositories/prisma/bag-repository'
import { CreateBagUseCase } from '@/use-cases/create-bag-use-case'
import { ClientAreadyHaveActiveBag } from '@/use-cases/errors/client-already-have-active-bag-error'
import { ProductNotSold } from '@/use-cases/errors/product-not-sold-error'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function createBagController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createBagBodySchema = z.object({
    client_id: z.string(),
  })

  const data = createBagBodySchema.parse(request.body)

  try {
    const bagRepository = new PrismaBagRepository()
    const bagUsecase = new CreateBagUseCase(bagRepository)

    await bagUsecase.execute(data)
  } catch (error) {
    if (error instanceof ClientAreadyHaveActiveBag) {
      return reply.status(409).send({
        message: error.message,
      })
    }

    if (error instanceof ProductNotSold) {
      return reply.status(409).send({
        message: error.message,
      })
    }
  }

  return reply.status(201).send()
}
