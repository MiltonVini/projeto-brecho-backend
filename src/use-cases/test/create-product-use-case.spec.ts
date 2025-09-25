import { describe, it, expect, beforeEach } from 'vitest'
import { StockType } from '@prisma/client'
import { InMemoryProductRepository } from '@/repositories/in-memory/in-memory-products-repository'
import { CreateProductUseCase } from '../create-product'

let productRepository: InMemoryProductRepository
let sut: CreateProductUseCase // System Under Test

describe('CreateProductUseCase', () => {
  beforeEach(() => {
    productRepository = new InMemoryProductRepository()
    sut = new CreateProductUseCase(productRepository)
  })

  it("should be able to create a product with stock_type 'multiple'", async () => {
    const { product } = await sut.execute({
      description: 'Camiseta Azul',
      price: 100,
      cost: 50,
      stock: 10,
      stock_type: StockType.multiple,
    })

    expect(product.id).toBeDefined()
    expect(product.description).toBe('Camiseta Azul')
    expect(product.stock).toBe(10)
    expect(product.stock_type).toBe(StockType.multiple)
  })

  it("should set stock = 1 if stock_type is 'single'", async () => {
    const { product } = await sut.execute({
      description: 'Calça Jeans Customizada',
      price: 200,
      cost: 100,
      stock: 99,
      stock_type: StockType.single,
    })

    expect(product.stock).toBe(1)
    expect(product.stock_type).toBe(StockType.single)
  })
})
