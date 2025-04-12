import { IBagRepository } from '@/repositories/i-bag-repository'

export class UpdateDeliveredBag {
  constructor(private bagRepository: IBagRepository) {
    this.bagRepository = bagRepository
  }

  async execute(id: string) {
    const updatedBag = await this.bagRepository.updateToDelivered(id)

    return updatedBag
  }
}
