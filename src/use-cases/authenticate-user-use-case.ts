import { IUsersRepository } from '@/repositories/i-users-repository'
import { compare } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

export interface AuthenticateRequest {
  email: string
  password: string
}

export class AuthenticateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {
    this.usersRepository = usersRepository
  }

  async execute(data: AuthenticateRequest) {
    const existingUser = await this.usersRepository.findByEmail(data.email)

    if (!existingUser) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatches = await compare(
      data.password,
      existingUser.password_hash,
    )

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    return existingUser
  }
}
