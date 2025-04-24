import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from 'fastify'
import { verify } from 'jsonwebtoken'

const jwtSecret = process.env.JWT_SECRET

export function ensureAuthenticated(
  request: FastifyRequest,
  reply: FastifyReply,
  done: HookHandlerDoneFunction,
) {
  const authToken = request.headers.authorization

  if (!authToken) {
    return reply.status(401).send({
      message: 'Invalid token',
    })
  }

  const token = authToken.split(' ')[1]

  try {
    verify(token, String(jwtSecret))
    done()
  } catch (error) {
    return reply.status(401).send({
      message: 'Invalid token',
    })
  }
}
