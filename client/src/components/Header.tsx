import Cart from './Cart'
import { Product as ProductType } from '../types/index'

interface HeaderProps {
  cart: ProductType[],
  onCheckout: () => void
}

const Header = ({ cart, onCheckout }: HeaderProps) => {
  return (
    <header>
      <h1>The Shop!</h1>
      <Cart cart={cart} onCheckout={onCheckout} />
    </header>
  )
}

export default Header