import { InMemoryBagRepository } from '@/repositories/in-memory/in-memory-bag-repository'
import { describe, it, expect, beforeEach } from 'vitest'
import { CreateBagUseCase } from '../create-bag-use-case'
import { ClientAreadyHaveActiveBag } from '../errors/client-already-have-active-bag-error'
import { randomUUID } from 'crypto'

let bagRepository: InMemoryBagRepository
let createBagUseCase: CreateBagUseCase

describe('CreateBagUseCase', () => {
  beforeEach(() => {
    bagRepository = new InMemoryBagRepository()
    createBagUseCase = new CreateBagUseCase(bagRepository)
  })

  it('should create a new bag if client does not have an active bag', async () => {
    const client_id = randomUUID()

    await createBagUseCase.execute({ client_id })

    const activeBag = await bagRepository.findActiveBagByClientId(client_id)
    expect(activeBag).toBeDefined()
    expect(activeBag?.client_id).toBe(client_id)
    expect(activeBag?.is_delivered).toBe(false)
  })

  it('should throw an error if client already has an active bag', async () => {
    const client_id = randomUUID()

    // cria uma bag ativa manualmente
    await bagRepository.create({ client_id })

    await expect(() =>
      createBagUseCase.execute({ client_id }),
    ).rejects.toBeInstanceOf(ClientAreadyHaveActiveBag)
  })
})
