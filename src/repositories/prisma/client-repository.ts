import { Prisma } from '@prisma/client'
import { IClientRepository } from '../i-client-repository'
import { prisma } from '@/lib/prisma'

export class PrismaClientRepository implements IClientRepository {
  async create(data: Prisma.ClientsCreateInput) {
    const client = await prisma.clients.create({
      data: {
        name: data.name,
        instagram_name: data.instagram_name,
        email: data.email,
      },
    })
    return client
  }

  async findClient(email: string) {
    const client = await prisma.clients.findFirst({
      where: {
        email,
      },
    })

    return client
  }

  async findById(id: string) {
    const client = await prisma.clients.findFirst({
      where: {
        id,
      },
    })

    return client
  }

  async findAll() {
    const clients = await prisma.clients.findMany()

    return clients
  }
}
