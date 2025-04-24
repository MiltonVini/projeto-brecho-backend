import { PrismaSalesRepository } from '@/repositories/prisma/sales-repository'
import { GetSalesByBagUseCase } from '@/use-cases/get-sales-by-bag-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import JSONbig from 'json-bigint'

import { z } from 'zod'

export async function getSalesByBagController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const insertSalesBodySchema = z.object({
    bag_id: z.string(),
  })

  const { bag_id } = insertSalesBodySchema.parse(request.params)

  try {
    const salesRepository = new PrismaSalesRepository()
    const getSalesByBagUseCase = new GetSalesByBagUseCase(salesRepository)

    const sales = await getSalesByBagUseCase.execute(bag_id)

    return reply.status(200).send(JSONbig.stringify(sales))
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return reply.status(400).send({
      erro: error.message,
    })
  }
}
