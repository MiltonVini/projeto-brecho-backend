import { IClientRepository } from '@/repositories/i-client-repository'
import { Prisma } from '@prisma/client'
import { ClientAlreadyExists } from './errors/client-already-exists-error'

export class RegisterClientUseCase {
  constructor(private clientRepository: IClientRepository) {
    this.clientRepository = clientRepository
  }

  async execute(data: Prisma.ClientsCreateInput) {
    const clientAlreadyExists = await this.clientRepository.findClient(
      data.email,
    )

    if (clientAlreadyExists) {
      throw new ClientAlreadyExists()
    }

    await this.clientRepository.create({
      name: data.name,
      instagram_name: data.instagram_name,
      email: data.email,
    })
  }
}
