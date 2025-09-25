import { Clients, Prisma } from '@prisma/client'
import { IClientRepository } from '../i-client-repository'
import { randomUUID } from 'crypto'

export class InMemoryClientRepository implements IClientRepository {
  private clients: Clients[] = []

  async create(data: Prisma.ClientsCreateInput) {
    const client: Clients = {
      id: randomUUID(),
      name: data.name,
      instagram_name: data.instagram_name ?? null,
      email: data.email,
    }

    this.clients.push(client)
    return client
  }

  async findClient(email: string) {
    return this.clients.find((c) => c.email === email) ?? null
  }

  async findById(id: string) {
    return this.clients.find((c) => c.id === id) ?? null
  }

  async findAll(): Promise<Clients[]> {
    return [...this.clients]
  }
}
