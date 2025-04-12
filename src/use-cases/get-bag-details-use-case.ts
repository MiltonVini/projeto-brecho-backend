import { IBagRepository } from '@/repositories/i-bag-repository'

export class GetBagDetailsUseCase {
  constructor(private bagsRepository: IBagRepository) {
    this.bagsRepository = bagsRepository
  }

  async execute(id: string) {
    const bag = await this.bagsRepository.findById(id)
    return bag
  }
}
