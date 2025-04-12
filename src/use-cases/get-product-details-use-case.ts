import { IProductRepository } from '@/repositories/i-products-repository'

export class GetProductDetailsUseCase {
  constructor(private productRepository: IProductRepository) {
    this.productRepository = productRepository
  }

  async execute(id: string) {
    const product = await this.productRepository.findById(id)

    return product
  }
}
