import { Bags } from '@prisma/client'
import {
  IBagCreateInput,
  IbagFindInput,
  IBagRepository,
} from '../i-bag-repository'
import { randomUUID } from 'crypto'

export class InMemoryBagRepository implements IBagRepository {
  private bags: Bags[] = []
  private sales: { bag_id: string; product_id: string; price: number }[] = []
  private products: { id: string; price: number }[] = []

  async create(data: IBagCreateInput): Promise<Bags> {
    const bag: Bags = {
      id: randomUUID(),
      client_id: data.client_id,
      created_at: new Date(),
      is_delivered: false,
      delivered_at: null,
    }

    this.bags.push(bag)
    return bag
  }

  async findActiveBagByClientId(id: string) {
    return (
      this.bags.find(
        (bag) => bag.client_id === id && bag.is_delivered === false,
      ) ?? null
    )
  }

  async findById(id: string) {
    const bag = this.bags.find((b) => b.id === id)
    if (!bag) return null

    const salesForBag = this.sales.filter((s) => s.bag_id === bag.id)
    const total_amount = salesForBag.reduce((acc, s) => acc + s.price, 0)

    const bagOutput = {
      id: bag.id,
      created_at: bag.created_at,
      is_delivered: bag.is_delivered,
      delivered_at: bag.delivered_at,
      total_amount,
    }

    return bagOutput
  }

  async updateToDelivered(id: string) {
    const bag = this.bags.find((b) => b.id === id)
    if (!bag) throw new Error('Bag not found')

    bag.is_delivered = true
    bag.delivered_at = new Date()

    return bag
  }

  async findAll(data: IbagFindInput) {
    return this.bags
      .filter((b) => b.is_delivered === data.is_delivered)
      .map((bag) => ({
        id: bag.id,
        created_at: bag.created_at,
        is_delivered: bag.is_delivered,
        delivered_at: bag.delivered_at,
        client: {
          id: bag.client_id,
          name: `Client-${bag.client_id}`, // mock
          instagram_name: `@mock_${bag.client_id}`, // mock
        },
      }))
      .sort((a, b) => b.created_at.getTime() - a.created_at.getTime())
  }

  /**
   * Métodos extras úteis para teste unitário
   */
  addSale(bag_id: string, product_id: string, price: number) {
    this.sales.push({ bag_id, product_id, price })
  }

  addProduct(id: string, price: number) {
    this.products.push({ id, price })
  }
}
