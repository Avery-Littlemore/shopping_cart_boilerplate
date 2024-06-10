import EditableProduct from './EditableProduct'
import { Product as ProductType } from "../types"

interface ProductListProps {
  products: ProductType[],
  onUpdateProduct: (arg0: ProductType) => void,
  onRemoveProduct: (arg0: string) => void,
  onAddToCart: (arg0: ProductType) => void
}

const ProductList = ({products, onUpdateProduct, onRemoveProduct, onAddToCart}: ProductListProps) => {
  return (
    products.map((product) => {
      return <EditableProduct key={product._id} product={product}
      onUpdateProduct={onUpdateProduct} onRemoveProduct={onRemoveProduct} onAddToCart={onAddToCart}/>
    })
  )
}

export default ProductList