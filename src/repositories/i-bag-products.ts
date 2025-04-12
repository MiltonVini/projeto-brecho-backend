import { BagProducts } from '@prisma/client'

export type IBagProductCreateInput = {
  bag_id: string
  product_id: string
}

export interface IBagProductsRepository {
  create(data: IBagProductCreateInput): Promise<BagProducts>
}
