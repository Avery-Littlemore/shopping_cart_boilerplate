import { useState, useEffect } from 'react'
import './assets/index.css'
import Header from './components/Header'
import ProductList from './components/ProductList'
import AddProductForm from './components/AddProductForm'
import { getProducts, addProduct, updateProduct, removeProduct, buyProducts }  from './services/productService'
import { Product } from './types/index'

function App() {
  const [showAddProduct, setShowAddProduct] = useState(false)
  const [products, setProducts] = useState<Product[]>([])
  const [error, setError] = useState(false)
  const [cart, setCart] = useState<Product[]>([])

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

  useEffect(() => {
    fetchProducts()
  }, [])

  const handleTriggerForm = () => {
    setShowAddProduct(prev => !prev)
  }

  const handleAddProduct = (newProduct: Product): void => {
    const pushProduct = async () => {
      try {
        const data = await addProduct(newProduct)
        console.log('found product', data)
        setProducts(prev => prev.concat(data))
      } catch (e) {
        setError(true)
        console.log(e)
      }
    }
    console.log('adding product')
    pushProduct()
    handleTriggerForm()
  }

  const handleUpdateProduct = (updatedProduct: Product): void => {
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
      } catch (e) {
        setError(true)
        console.log(e)
      }
    }
    console.log('editing product')
    editProduct()
    handleTriggerForm()
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

  const handleAddToCart = (prodId: string): void => {
    setCart(prev => prev.concat(products.filter(prod => prod._id === prodId)))
  }

  const handleBuy = () => {
    const buyCartItems = async () => {
      try {
        const data = await buyProducts(cart)
        console.log('bought cart items', data)
        setCart([])
        fetchProducts()
      } catch (e) {
        setError(true)
        console.log(e)
      }
    }
    console.log('buying cart items')
    buyCartItems()
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
      <Header cart={cart} onBuy={handleBuy} />

      <main>
        <div className="product-listing">
          <h2>Products</h2>
          <ul className="product-list">
            <ProductList products={products} onUpdateProduct={handleUpdateProduct} onRemoveProduct={handleRemoveProduct} cart={cart} onAddToCart={handleAddToCart} />
          </ul>
        </div>
        <p>
          <button className="add-product-button" onClick={handleTriggerForm}>Add A Product</button>
        </p>
        {showAddProduct ? <AddProductForm onTriggerForm={handleTriggerForm} onAddProduct={handleAddProduct} /> : null}
      </main>
    </div>
  )
}

export default App
