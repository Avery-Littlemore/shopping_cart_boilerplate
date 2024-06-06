import { Product as ProductType } from "../types"
import { useState } from 'react'
import { SyntheticEvent } from "react"

interface EditFormProps extends ProductType {
  onTriggerForm: () => void,
  onUpdateProduct: (arg0: ProductType) => void
}

const EditForm = ({title, price, quantity, _id, onTriggerForm, onUpdateProduct}: EditFormProps) => {
  const [editTitle, setEditTitle] = useState(title)
  const [editPrice, setEditPrice] = useState(`${price}`)
  const [editQuantity, setEditQuantity] = useState(`${quantity}`)

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
    if (confirm('Are you sure you want to make this change?')) {
      const updatedProduct = {
        title: editTitle,
        price: Number(editPrice),
        quantity: Number(editQuantity),
        _id: _id
      }
      onUpdateProduct(updatedProduct)
      onTriggerForm()
    }
  }

  return (
    <div className="edit-form">
      <h3>Edit Product</h3>
      <form  onSubmit={e => handleSubmit(e)}>
        <div className="input-group">
          <label htmlFor="product-name">Product Name</label>
          <input
            type="text"
            id="product-name"
            value={editTitle}
            onChange={e => setEditTitle(e.target.value)}
            aria-label="Product Name"
          />
        </div>

        <div className="input-group">
          <label htmlFor="product-price">Price</label>
          <input
            type="number"
            id="product-price"
            value={editPrice}
            onChange={e => setEditPrice(e.target.value)}
            aria-label="Product Price"
          />
        </div>

        <div className="input-group">
          <label htmlFor="product-quantity">Quantity</label>
          <input
            type="number"
            id="product-quantity"
            value={editQuantity}
            onChange={e => setEditQuantity(e.target.value)}
            aria-label="Product Quantity"
          />
        </div>

        <div className="actions form-actions">
          <button type="submit">Update</button>
          <button type="button" onClick={onTriggerForm}>Cancel</button>
        </div>
      </form>
    </div>
  )
}

export default EditForm