import { SyntheticEvent } from 'react'
import { Product as ProductType } from '../types/index'

interface CartProps {
  cart: ProductType[],
  onBuy: () => void
}

const Cart = ({ cart, onBuy }: CartProps) => {
  if (cart.length === 0) {
    return (
      <div className="cart">
        <h2>Your Cart</h2>
        <p>Your cart is empty</p>
        <p>Total: $0</p>
        <button className="checkout" disabled>Checkout</button>
      </div>
    )
  }

  const handleCheckout = (e: SyntheticEvent) => {
    e.preventDefault()
    if (confirm('Are you sure you want to buy all this trash?')) {
      onBuy()
    }
  }

  const calculateTotal = () => {
    return cart.map(product => product.price).reduce((a, b) => a + b, 0).toFixed(2)
  }

  const mapProducts = () => {
    let consolidatedProducts: {[key: string]: number[]} = {}
    cart.forEach(product => {
      if (product.title in consolidatedProducts) {
        consolidatedProducts[product.title][0] += 1
      } else {
        consolidatedProducts[product.title] = [1, product.price]
      }
    })
    return Object.keys(consolidatedProducts).map(product => {
      return (
        <tr key={product}>
          <td>{product}</td>
          <td>{consolidatedProducts[product][0]}</td>
          <td>{consolidatedProducts[product][1]}</td>
        </tr>
      )
    })
  }

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      <table className="cart-items">
        <thead>
          <tr>
            <th scope="col">Item</th>
            <th scope="col">Quantity</th>
            <th scope="col">Price</th>
          </tr>
        </thead>
        <tbody>
          {mapProducts()}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={3} className="total">Total: {calculateTotal()}</td>
          </tr>
        </tfoot>
      </table>
      <div className="checkout-button">
        <button className="checkout" onClick={e => handleCheckout(e)}>Checkout</button>
      </div>
    </div>
  )
}

export default Cart