import { SyntheticEvent } from "react"
import { useState } from 'react'
import { Product } from '../types/index'

interface ToggleableAddProductFormProps {
  showAddProduct: boolean,
  onToggleForm: () => void,
  onAddProduct: (arg0: Omit<Product, '_id'>) => void
}

const ToggleableAddProductForm = ({showAddProduct, onToggleForm, onAddProduct}: ToggleableAddProductFormProps) => {
  const [productTitle, setProductTitle] = useState('')
  const [price, setPrice] = useState('')
  const [quantity, setQuantity] = useState('')

  const handleAddProduct = (e: SyntheticEvent) => {
    e.preventDefault()
    const newProduct = {
      title: productTitle,
      price: Number(price),
      quantity: Number(quantity)
    }
    onAddProduct(newProduct)
  }

  if (!showAddProduct) {
    return null
  }

  return (
    <div className="add-form">
      <form onSubmit={e => handleAddProduct(e)}>
        <div className="input-group">
          <label htmlFor="product-name">Product Name:</label>
          <input
            type="text"
            id="product-name"
            name="product-name"
            value={productTitle}
            onChange={e => setProductTitle(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="product-price">Price:</label>
          <input
            type="number"
            id="product-price"
            name="product-price"
            min="0"
            step="0.01"
            value={price}
            onChange={e => setPrice(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="product-quantity">Quantity:</label>
          <input
            type="number"
            id="product-quantity"
            name="product-quantity"
            min="0"
            value={quantity}
            onChange={e => setQuantity(e.target.value)}
            required
          />
        </div>
        <div className="actions form-actions">
          <button type="submit">Add</button>
          <button type="button" onClick={onToggleForm}>Cancel</button>
        </div>
      </form>
    </div>
  )
}

export default ToggleableAddProductForm