import { PrismaClientRepository } from '@/repositories/prisma/client-repository'
import { GetAllClientsUseCase } from '@/use-cases/get-all-clients-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function getAllClientesController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const clientRepository = new PrismaClientRepository()
  const useCase = new GetAllClientsUseCase(clientRepository)

  try {
    const clients = await useCase.execute()

    return reply.status(200).send(clients)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return reply.status(409).send({
      message: error.message,
    })
  }
}
