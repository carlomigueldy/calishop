class Product {
  constructor (
    name = null,
    category = null,
    small_description = null,
    description = null,
    price = 0
  ) {
    this.name = name
    this.category = category
    this.small_description = small_description
    this.description = description
    this.price = price
  }
}

export const createProduct = (data) => {
  return Object.freeze(new Product(data))
}