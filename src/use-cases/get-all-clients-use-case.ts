import { IClientRepository } from '@/repositories/i-client-repository'

export class GetAllClientsUseCase {
  constructor(private clientsReposiotry: IClientRepository) {
    this.clientsReposiotry = clientsReposiotry
  }

  async execute() {
    const clients = await this.clientsReposiotry.findAll()

    return clients
  }
}
