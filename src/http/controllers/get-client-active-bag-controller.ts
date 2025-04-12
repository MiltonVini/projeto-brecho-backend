import { PrismaBagRepository } from '@/repositories/prisma/bag-repository'
import { GetActiveClientBagUseCase } from '@/use-cases/get-client-active-bag-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function getClientActiveBagController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getClientActiveBagsParamsSchema = z.object({
    client_id: z.string(),
  })

  const { client_id } = getClientActiveBagsParamsSchema.parse(request.params)

  const bagsRepository = new PrismaBagRepository()
  const useCase = new GetActiveClientBagUseCase(bagsRepository)

  try {
    const bag = await useCase.execute(client_id)

    return reply.status(200).send(bag)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return reply.status(409).send({
      message: error.message,
    })
  }
}
