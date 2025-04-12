export class ProductNotSold extends Error {
  constructor() {
    super('Can not associate a product that hasnt been sold with a bag.')
  }
}
