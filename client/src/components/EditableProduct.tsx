import { Product as ProductType } from "../types"
import { SyntheticEvent, useState } from 'react'
import ToggleableEditForm from './ToggleableEditForm'

interface ProductProps {
  product: ProductType
  onUpdateProduct: (arg0: ProductType, arg1: () => void) => void,
  onRemoveProduct: (arg0: string) => void,
  onAddToCart: (arg0: ProductType) => void
}

const EditableProduct = ({ product, onUpdateProduct, onRemoveProduct, onAddToCart}: ProductProps) => {
  const [showEdit, setShowEdit] = useState(false)

  const handleTriggerEdit = () => {
    setShowEdit(() => !showEdit)
  }

  const handleRemoveProduct = (e: SyntheticEvent) => {
    e.preventDefault()
    if (confirm('Are you sure you want to delete this product?')) {
      onRemoveProduct(product._id)
    }
  }

  const handleAddToCart = (e: SyntheticEvent) => {
    e.preventDefault()
    onAddToCart(product)
  }

  return (
    <li className="product">
      <div className="product-details">
        <h3>{product.title}</h3>
        <p className="price">${product.price}</p>
        <p className="quantity">{product.quantity} left in stock</p>
        <div className="actions product-actions">
          <button className="add-to-cart" disabled={product.quantity === 0} onClick={e => handleAddToCart(e)}>Add to Cart</button>
          <button className="edit" onClick={handleTriggerEdit}>Edit</button>
        </div>
        <button className="delete-button" onClick={e => handleRemoveProduct(e)}><span>X</span></button>
      </div>
      {<ToggleableEditForm title={product.title} price={product.price} quantity={product.quantity} _id={product._id} onTriggerForm={handleTriggerEdit} onUpdateProduct={onUpdateProduct} showEdit={showEdit} />}
    </li>
  )
}

export default EditableProduct