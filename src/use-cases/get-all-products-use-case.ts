import {
  IProductRepository,
  IProductFindInput,
} from '@/repositories/i-products-repository'

export class GetProductsUseCase {
  constructor(private productRepository: IProductRepository) {
    this.productRepository = productRepository
  }

  async execute(data: IProductFindInput) {
    const products = await this.productRepository.findAll(data)

    return products
  }
}
