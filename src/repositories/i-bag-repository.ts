import { Bags } from '@prisma/client'

export interface IBagCreateInput {
  client_id: string
}

export interface IbagFindInput {
  is_delivered?: boolean
}

export interface ClientOutput {
  id: string
  name: string
  instagram_name: string
}

export interface IBagsOutput {
  id: string
  created_at: Date
  is_delivered: boolean
  delivered_at: Date | null
  client: ClientOutput
}

export interface IBagRepository {
  create(data: IBagCreateInput): Promise<Bags>
  findActiveBagByClientId(clientId: string): Promise<Bags | null>
  findById(id: string): Promise<Bags | null>
  updateToDelivered(id: string): Promise<Bags>
  findAll(data: IbagFindInput): Promise<IBagsOutput[]>
}
