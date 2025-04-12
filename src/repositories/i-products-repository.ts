import { Prisma, Product, StockType } from '@prisma/client'
import { ProductUpdateInput } from './i-users-repository'

export type IProductFindInput = {
  is_sold?: boolean
}

export interface IProductRepository {
  create(data: Prisma.ProductCreateInput): Promise<Product>
  update(data: ProductUpdateInput): Promise<void>
  findById(id: string): Promise<Product | null>
  updateToSold(id: string): Promise<void>
  findProductStockType(id: string): Promise<StockType | null>
  findAll(data: IProductFindInput): Promise<Product[]>
}
