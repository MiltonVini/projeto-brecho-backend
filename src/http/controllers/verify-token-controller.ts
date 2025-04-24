import { env } from '@/env'
import { FastifyReply, FastifyRequest } from 'fastify'

import { verify } from 'jsonwebtoken'

const jwtSecret = env.JWT_SECRET

export async function verifyTokenController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const authToken = request.headers.authorization

    if (!authToken) {
      return reply.status(401).send({
        message: 'Invalid token',
      })
    }

    const token = authToken.split(' ')[1]
    try {
      verify(token, String(jwtSecret))

      return reply.status(200).send({
        message: 'Valid token',
      })
    } catch (error) {
      return reply.status(401).send({
        message: 'Invalid token',
      })
    }
  } catch (err) {
    console.log(err)
  }
}
