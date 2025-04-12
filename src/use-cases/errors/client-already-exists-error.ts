export class ClientAlreadyExists extends Error {
  constructor() {
    super('Client already exists')
  }
}
