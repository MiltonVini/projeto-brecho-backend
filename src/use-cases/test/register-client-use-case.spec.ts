import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryClientRepository } from '@/repositories/in-memory/in-memory-client-repository'
import { RegisterClientUseCase } from '../register-client'
import { ClientAlreadyExists } from '../errors/client-already-exists-error'

let clientRepository: InMemoryClientRepository
let registerClientUseCase: RegisterClientUseCase

describe('RegisterClientUseCase', () => {
  beforeEach(() => {
    clientRepository = new InMemoryClientRepository()
    registerClientUseCase = new RegisterClientUseCase(clientRepository)
  })

  it('should register a new client successfully', async () => {
    const clientData = {
      name: 'Milton',
      instagram_name: '@milton',
      email: 'milton@example.com',
    }

    await registerClientUseCase.execute(clientData)

    const createdClient = await clientRepository.findClient(clientData.email)
    expect(createdClient).toBeDefined()
    expect(createdClient?.name).toBe(clientData.name)
    expect(createdClient?.instagram_name).toBe(clientData.instagram_name)
    expect(createdClient?.email).toBe(clientData.email)
  })

  it('should throw an error if client already exists', async () => {
    const clientData = {
      name: 'Milton',
      instagram_name: '@milton',
      email: 'milton@example.com',
    }

    await clientRepository.create(clientData)

    await expect(() =>
      registerClientUseCase.execute(clientData),
    ).rejects.toBeInstanceOf(ClientAlreadyExists)
  })
})
