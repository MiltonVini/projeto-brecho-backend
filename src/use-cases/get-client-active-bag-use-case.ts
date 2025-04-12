import { IBagRepository } from '@/repositories/i-bag-repository'

export class GetActiveClientBagUseCase {
  constructor(private bagsRepository: IBagRepository) {
    this.bagsRepository = bagsRepository
  }

  async execute(clientId: string) {
    const bag = await this.bagsRepository.findActiveBagByClientId(clientId)

    return bag
  }
}
