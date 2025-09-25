import { randomUUID } from 'crypto'
import { IProductRepository, IProductFindInput } from '../i-products-repository'
import { ProductUpdateInput } from '../i-users-repository'
import { Prisma, Product } from '@prisma/client'

export class InMemoryProductRepository implements IProductRepository {
  private products: Product[] = []

  async create(data: Prisma.ProductCreateInput) {
    const product: Product = {
      id: randomUUID(),
      description: data.description,
      price: data.price,
      cost: data.cost,
      stock: data.stock,
      stock_type: data.stock_type,
      created_at: new Date(),
      is_sold: false,
    }

    this.products.push(product)
    return product
  }

  async update(data: ProductUpdateInput) {
    const index = this.products.find((p) => p.id === data.id)
    if (index >= 0) {
      this.products[index] = {
        ...this.products[index],
        ...data,
      }
    }
  }

  async findById(id: string) {
    return this.products.find((p) => p.id === id) || null
  }

  async findProductStockType(id: string) {
    const product = this.products.find((p) => p.id === id)
    return product?.stock_type || null
  }

  async updateToSold(id: string) {
    const index = this.products.findIndex((p) => p.id === id)
    if (index >= 0) {
      this.products[index].is_sold = true
    }
  }

  async findAll(data: IProductFindInput) {
    return this.products.filter((p) => p.is_sold === data.is_sold)
  }
}
