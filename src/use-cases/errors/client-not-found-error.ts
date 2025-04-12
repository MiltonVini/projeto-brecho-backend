export class ClientNotFoundError extends Error {
  constructor() {
    super('Client not found')
  }
}
