import { PrismaClientRepository } from '@/repositories/prisma/client-repository'
import { ClientNotFoundError } from '@/use-cases/errors/client-not-found-error'
import { GetClientUseCase } from '@/use-cases/get-client-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function getClientController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const clientsRepository = new PrismaClientRepository()
  const getClientUseCase = new GetClientUseCase(clientsRepository)

  const getClientParamsSchema = z.object({
    id: z.string(),
  })

  const { id } = getClientParamsSchema.parse(request.params)

  try {
    const client = await getClientUseCase.execute(id)

    return reply.status(200).send(client)
  } catch (error) {
    if (error instanceof Error) {
      return reply.status(400).send({
        message: error.message,
      })
    }

    if (error instanceof ClientNotFoundError) {
      return reply.status(409).send({
        message: error.message,
      })
    }

    return reply.status(500).send({
      message: 'Internal Server Error',
    })
  }
}
