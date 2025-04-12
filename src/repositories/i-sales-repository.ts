import { Sales } from '@prisma/client'
import { Decimal } from '@prisma/client/runtime/library'

export interface ISalesCreateInput {
  sale_id: bigint
  product_id: string
  client_id?: string | null
  bag_id?: string | null
}

interface IProductOutput {
  id: string
  description: string
  price: Decimal
  cost: Decimal
}

interface ISalesOutput {
  id: string
  sale_id: bigint
  transaction_date: Date
  client_id: string | null
  bag_id: string | null
  product: IProductOutput
}

export interface ISalesRepository {
  insert(data: ISalesCreateInput): Promise<Sales>
  getLastSaleId(): Promise<bigint | null>
  findSalesByBag(bagId: string): Promise<ISalesOutput[] | null>
}
