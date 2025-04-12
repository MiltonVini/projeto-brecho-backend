import { IProductRepository } from '@/repositories/i-products-repository'
import { ISalesRepository } from '@/repositories/i-sales-repository'

interface SalesUseCaseRequest {
  product_list: string[]
  client_id?: string
  bag_id?: string
}

export class InsertSalesUseCase {
  constructor(
    private salesRepository: ISalesRepository,
    private productRepository: IProductRepository,
  ) {
    this.salesRepository = salesRepository
    this.productRepository = productRepository
  }

  async execute(data: SalesUseCaseRequest) {
    // Nesta parte estou montando uma lógica autoincremental para que cada linha de uma mesma transação tenha o mesmo sale_id
    const lastSaleId = await this.salesRepository.getLastSaleId()
    const newLastSaleId = lastSaleId ? lastSaleId + 1n : 1n

    // Cada produto de uma transação é registrado na tabela de Sales
    for (const product of data.product_list) {
      // TODO: Aqui deve se fazer uma validação se aquele produto já consta como vendido

      await this.salesRepository.insert({
        sale_id: newLastSaleId,
        product_id: product,
        client_id: data.client_id,
        bag_id: data.bag_id,
      })

      const productStockType =
        await this.productRepository.findProductStockType(product)

      const isSingleStock = productStockType === 'single'

      // Produtos de estoque tipo único inseridos em vendas devem ser marcados como vendidos
      if (isSingleStock) {
        await this.productRepository.updateToSold(product)
      }
      // TODO: Fazer uma dedução de estoque para produtos com estoque multiplo
    }
  }
}
