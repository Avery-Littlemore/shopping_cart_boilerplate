import Product from './Product'
import { Product as ProductType } from "../types"

interface ProductListProps {
  products: ProductType[],
  onUpdateProduct: (arg0: ProductType) => void,
  onRemoveProduct: (arg0: string) => void,
  cart: ProductType[],
  onAddToCart: (arg0: string) => void
}

const ProductList = ({products, onUpdateProduct, onRemoveProduct, cart, onAddToCart}: ProductListProps) => {
  return (
    products.map((product) => {
      return <Product key={product._id} title={product.title} price={product.price} quantity={product.quantity} _id={product._id} 
      onUpdateProduct={onUpdateProduct} onRemoveProduct={onRemoveProduct} cart={cart} onAddToCart={onAddToCart}/>
    })
  )
}

export default ProductList