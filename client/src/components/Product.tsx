import { Product as ProductType } from "../types"
import { SyntheticEvent, useState } from 'react'
import EditForm from './EditForm'

interface ProductProps extends ProductType {
  onUpdateProduct: (arg0: ProductType) => void,
  onRemoveProduct: (arg0: string) => void,
  cart: ProductType[],
  onAddToCart: (arg0: string) => void
}

const Product = ({title, price, quantity, _id, onUpdateProduct, onRemoveProduct, cart, onAddToCart}: ProductProps) => {
  const [showEdit, setShowEdit] = useState(false)

  const handleTriggerEdit = () => {
    setShowEdit(() => !showEdit)
  }

  const handleRemoveProduct = (e: SyntheticEvent) => {
    e.preventDefault()
    if (confirm('Are you sure you want to delete this product?')) {
      onRemoveProduct(_id)
    }
  }

  // I'm aware that this is only changing the quantity for me, not for all viewers... 
  // I can edit the quantity on the backend, but then when I refresh the page it won't replenish the items that were in my cart
  // Working on how to achieve that...
  const getQuantity = () => {
    return quantity - cart.filter(product => product._id === _id).length
  }

  const handleAddToCart = (e: SyntheticEvent) => {
    e.preventDefault()
    onAddToCart(_id)
  }

  return (
    <li className="product">
      <div className="product-details">
        <h3>{title}</h3>
        <p className="price">${price}</p>
        <p className="quantity">{getQuantity()} left in stock</p>
        <div className="actions product-actions">
          <button className="add-to-cart" disabled={getQuantity() === 0} onClick={e => handleAddToCart(e)}>Add to Cart</button>
          <button className="edit" onClick={handleTriggerEdit}>Edit</button>
        </div>
        <button className="delete-button" onClick={e => handleRemoveProduct(e)}><span>X</span></button>
      </div>
      {showEdit ? <EditForm title={title} price={price} quantity={quantity} _id={_id} onTriggerForm={handleTriggerEdit} onUpdateProduct={onUpdateProduct} /> : null}
    </li>
  )
}

export default Product