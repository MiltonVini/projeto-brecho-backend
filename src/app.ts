import fastify from 'fastify'
import { appRoutes } from './http/controllers/routes'
import { ZodError } from 'zod'
import { env } from '@/env'
import fastifyCors from '@fastify/cors'
import fastifyJwt from '@fastify/jwt'
import { ensureAuthenticated } from './middlewares/ensure-authenticated'
import { clientRoutes } from './http/controllers/clients/routes'
import { productRoutes } from './http/controllers/products/routes'
import { salesRoutes } from './http/controllers/sales/routes'
import { bagRoutes } from './http/controllers/bags/routes'

export const app = fastify()

app.register(fastifyCors, {
  origin: ['http://127.0.0.1:5173', 'https://www.unusualshop.com.br'],
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
})

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  sign: {
    expiresIn: env.EXPIRES_IN,
  },
})

app.register(appRoutes)

app.register(async (protectedRoutes) => {
  protectedRoutes.addHook('preHandler', ensureAuthenticated)

  protectedRoutes.register(clientRoutes)
  protectedRoutes.register(productRoutes)
  protectedRoutes.register(salesRoutes)
  protectedRoutes.register(bagRoutes)
})

app.setErrorHandler((error, _request, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Validation error.',
      issues: error.format(),
    })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // TODO: Here we should log to an external tool like DataDog/NewRelic/Sentry
  }
})
