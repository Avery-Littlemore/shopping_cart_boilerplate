import { SyntheticEvent } from 'react'
import { Product as ProductType } from '../types/index'

interface CartProps {
  cart: ProductType[],
  onCheckout: () => void
}

const Cart = ({ cart, onCheckout }: CartProps) => {

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
      onCheckout()
    }
  }

  const calculateTotal = () => {
    return cart.map(product => product.price * product.quantity).reduce((a, b) => a + b, 0).toFixed(2)
  }

  const mapProducts = () => {
    return cart.map(product => {
      return (
        <tr key={product._id}>
          <td>{product.title}</td>
          <td>{product.quantity}</td>
          <td>{product.price}</td>
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