import { PrismaBagRepository } from '@/repositories/prisma/bag-repository'
import { GetBagsUseCase } from '@/use-cases/get-all-bags-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function getBagsController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getBagsParamsSchema = z.object({
    is_delivered: z.string().optional(),
  })

  const { is_delivered } = getBagsParamsSchema.parse(request.query)

  const data: { is_delivered?: boolean } = {}

  if (is_delivered === 'true') {
    data.is_delivered = true
  } else if (is_delivered === 'false') {
    data.is_delivered = false
  }

  try {
    const bagsRepository = new PrismaBagRepository()
    const getBagsUseCase = new GetBagsUseCase(bagsRepository)

    const bags = await getBagsUseCase.execute(data)

    return reply.status(200).send(bags)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return reply.status(409).send({
      message: error.message,
    })
  }
}
