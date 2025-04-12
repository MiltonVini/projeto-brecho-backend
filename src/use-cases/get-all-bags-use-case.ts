import { IbagFindInput, IBagRepository } from '@/repositories/i-bag-repository'

export class GetBagsUseCase {
  constructor(private bagsRepository: IBagRepository) {
    this.bagsRepository = bagsRepository
  }

  async execute(data: IbagFindInput) {
    const bags = await this.bagsRepository.findAll(data)

    return bags
  }
}
