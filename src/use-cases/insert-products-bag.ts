import { IBagProductsRepository } from '@/repositories/i-bag-products'
import { IBagRepository } from '@/repositories/i-bag-repository'
import { IProductRepository } from '@/repositories/i-products-repository'
import { ProductNotSold } from './errors/product-not-sold-error'

export interface inserProductsInBagRequest {
  client_id: string
  product_list: string[]
}

export class InsertProductsInBagUseCase {
  constructor(
    private bagRepository: IBagRepository,
    private bagProductsRepository: IBagProductsRepository,
    private productRepository: IProductRepository,
  ) {
    this.bagRepository = bagRepository
    this.bagProductsRepository = bagProductsRepository
    this.productRepository = productRepository
  }

  async execute(data: inserProductsInBagRequest) {
    const clientActiveBag = await this.bagRepository.findActiveBagById(
      data.client_id,
    )

    if (clientActiveBag) {
      for (const product of data.product_list) {
        const productInfo = await this.productRepository.findProduct(product)

        if (productInfo?.is_sold === false) {
          throw new ProductNotSold()
        }

        await this.bagProductsRepository.create({
          bag_id: clientActiveBag?.id,
          product_id: product,
        })
      }
    }
  }
}
