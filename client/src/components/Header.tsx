import Cart from './Cart'
import { Product as ProductType } from '../types/index'

interface HeaderProps {
  cart: ProductType[],
  onBuy: () => void
}

const Header = ({ cart, onBuy }: HeaderProps) => {
  return (
    <header>
      <h1>The Shop!</h1>
      <Cart cart={cart} onBuy={onBuy} />
    </header>
  )
}

export default Header