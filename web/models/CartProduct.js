export class CardProduct {
  constructor ({
    product_id = null,
    quantity = 1,
    price = null,
  } = {}) {
    this.product_id = product_id
    this.quantity = quantity
    this.price = price
  }
}

export const create = (data) => {
  return Object.freeze(new CardProduct(data))
}
            
export const getCartProducts = () => JSON.parse(localStorage.getItem('cart_products')) || []