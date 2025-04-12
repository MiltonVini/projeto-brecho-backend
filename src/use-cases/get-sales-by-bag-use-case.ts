import { ISalesRepository } from '@/repositories/i-sales-repository'

export class GetSalesByBagUseCase {
  constructor(private salesRepository: ISalesRepository) {
    this.salesRepository = salesRepository
  }

  async execute(id: string) {
    const sales = await this.salesRepository.findSalesByBag(id)

    return sales
  }
}
