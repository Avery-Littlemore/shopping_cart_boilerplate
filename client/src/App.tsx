import { useState, useEffect } from 'react'
import './assets/index.css'
import Header from './components/Header'
import ProductList from './components/ProductList'
import ToggleableAddProductForm from './components/ToggleableAddProductForm'
import { getProducts, addProduct, updateProduct, removeProduct, getCart, addToCart, checkout }  from './services/productService'
import { Product } from './types/index'

function App() {
  const [showAddProduct, setShowAddProduct] = useState(false)
  const [products, setProducts] = useState<Product[]>([])
  const [error, setError] = useState(false)
  const [cart, setCart] = useState<Product[]>([])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts()
        console.log(data)
        setProducts(data)
      } catch (e) {
        setError(true)
        console.log(e)
      }
    }
    fetchProducts()
    const fetchCart = async () => {
      try {
        const data = await getCart()
        console.log(data)
        setCart(data)
      } catch (e) {
        setError(true)
        console.log(e)
      }
    }
    fetchCart()
  }, [])

  const handleToggleForm = () => {
    setShowAddProduct(prev => !prev)
  }

  const handleAddProduct = (newProduct: Omit<Product, '_id'>): void => {
    const pushProduct = async () => {
      try {
        const data = await addProduct(newProduct)
        console.log('added product', data)
        setProducts(prev => prev.concat(data))
        handleToggleForm()
      } catch (e) {
        setError(true)
        console.log(e)
      }
    }
    console.log('adding product')
    pushProduct()
  }

  const handleUpdateProduct = (updatedProduct: Product, callback?: () => void): void => {
    const editProduct = async () => {
      try {
        const data = await updateProduct(updatedProduct)
        console.log('updated product', data)
        setProducts(prev => {
          return prev.map(product => {
            if (product._id === updatedProduct._id) {
              return updatedProduct
            }
            return product
          })
        })
        if (callback) {
          callback()
        }
      } catch (e) {
        setError(true)
        console.log(e)
      }
    }
    console.log('editing product')
    editProduct()
  }

  const handleRemoveProduct = (idToRemove: string): void => {
    const deleteProduct = async () => {
      try {
        const data = await removeProduct(idToRemove)
        console.log('deleted product', data)
        setProducts(prev => {
          return prev.filter(product => {
            return product._id !== idToRemove
          })
        })
      } catch (e) {
        setError(true)
        console.log(e)
      }
    }
    console.log('deleting product')
    deleteProduct()
  }

  const handleAddToCart = (product: Product): void => {
    const addItem = async () => {
      try {
        const data = await addToCart(product)
        console.log('item added', data)
        setCart(prev => {
          if (prev.find(cartItem => cartItem.title === data.item.title)) {
            return prev.map(cartItem => {
              if (cartItem.title === data.item.title) {
                return data.item
              }
              return cartItem
            })
          } else {
            return prev.concat(data.item)
          }
        })
        setProducts(prev => {
          return prev.map(product => {
            if (product.title === data.product.title) {
              return data.product
            }
            return product
          })
        })
      } catch (e) {
        setError(true)
        console.log(e)
      }
    }
    console.log('adding item')
    addItem()
  }

  const handleCheckout = () => {
    const buy = async () => {
      try {
        const data = await checkout()
        console.log('checked out', data)
        setCart([])
      } catch (e) {
        setError(true)
        console.log(e)
      }
    }
    console.log('checking out')
    buy()
  }

  if (error) {
    return (
      <>
        InsertCuteBabyYodaHere
      </>
    )
  }

  return (
    <div id="app">
      <Header cart={cart} onCheckout={handleCheckout} />

      <main>
        <div className="product-listing">
          <h2>Products</h2>
          <ul className="product-list">
            <ProductList products={products} onUpdateProduct={handleUpdateProduct} onRemoveProduct={handleRemoveProduct} onAddToCart={handleAddToCart} />
          </ul>
        </div>
        <p>
          <button className="add-product-button" onClick={handleToggleForm}>Add A Product</button>
        </p>
        <ToggleableAddProductForm showAddProduct={showAddProduct} onAddProduct={handleAddProduct} onToggleForm={handleToggleForm} />
      </main>
    </div>
  )
}

export default App
