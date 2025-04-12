import { PrismaBagRepository } from '@/repositories/prisma/bag-repository'
import { GetBagDetailsUseCase } from '@/use-cases/get-bag-details-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function getBagDetailsController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const bagRepository = new PrismaBagRepository()
  const getUserBagUseCase = new GetBagDetailsUseCase(bagRepository)

  const getUserBagParamsSchema = z.object({
    bag_id: z.string(),
  })

  const { bag_id } = getUserBagParamsSchema.parse(request.params)

  try {
    const bag = await getUserBagUseCase.execute(bag_id)

    return reply.status(200).send(bag)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return reply.status(409).send({
      message: error.message,
    })
  }
}
