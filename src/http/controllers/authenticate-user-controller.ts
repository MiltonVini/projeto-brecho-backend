import { PrismaUsersRepository } from '@/repositories/prisma/users-repository'
import { AuthenticateUserUseCase } from '@/use-cases/authenticate-user-use-case'
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function authenticateUserController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateUserBodySchema = z.object({
    email: z.string(),
    password: z.string(),
  })

  const data = authenticateUserBodySchema.parse(request.body)

  const usersRepository = new PrismaUsersRepository()
  const useCase = new AuthenticateUserUseCase(usersRepository)

  try {
    const userAuthenticated = await useCase.execute(data)

    if (userAuthenticated) {
      const authToken = await reply.jwtSign(
        {
          email: userAuthenticated.email,
        },
        {
          sign: {
            sub: userAuthenticated.id,
          },
        },
      )

      return reply.status(200).send({
        message: 'Valid user',
        authToken,
      })
    }
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(401).send({
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
