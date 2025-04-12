export class ClientAreadyHaveActiveBag extends Error {
  constructor() {
    super('Client already have a active bag, can not create a new one.')
  }
}
