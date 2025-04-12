import { IBagRepository } from '@/repositories/i-bag-repository'
import { ClientAreadyHaveActiveBag } from './errors/client-already-have-active-bag-error'

interface BagUseCaseRequest {
  client_id: string
}

export class CreateBagUseCase {
  constructor(private bagRepository: IBagRepository) {
    this.bagRepository = bagRepository
  }

  async execute(data: BagUseCaseRequest) {
    const doesClientAlreadyHaveActiveBag =
      await this.bagRepository.findActiveBagByClientId(data.client_id)

    if (doesClientAlreadyHaveActiveBag) {
      throw new ClientAreadyHaveActiveBag()
    }

    await this.bagRepository.create({
      client_id: data.client_id,
    })
  }
}
