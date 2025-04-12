import { IClientRepository } from '@/repositories/i-client-repository'
import { ClientNotFoundError } from './errors/client-not-found-error'

export class GetClientUseCase {
  constructor(private clientsRepository: IClientRepository) {
    this.clientsRepository = clientsRepository
  }

  async execute(id: string) {
    const client = await this.clientsRepository.findById(id)

    if (!client) {
      throw new ClientNotFoundError()
    }

    return client
  }
}
