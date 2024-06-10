import axios from 'axios'
import { z } from 'zod'
import { Product } from '../types/index'

const productSchema = z.object({
  title: z.string(),
  quantity: z.number(),
  price: z.number(),
  _id: z.string()
})

const getProductsResponseSchema = z.array(productSchema)
const addProductResponseSchema = productSchema
const updateProductResponseSchema = productSchema

const removeProductResponseSchema = z.string()

// Todo: figure out buyProductsResponseSchema
// const buyProductsResponseSchema = z.string()

const getProducts = async () => {
  const { data } = await axios.get<{ data: Product[] }>('/api/products')
  return getProductsResponseSchema.parse(data)
}

const addProduct = async (newProduct: Omit<Product, '_id'>) => {
  const { data } = await axios.post('/api/products', newProduct)
  return addProductResponseSchema.parse(data)
}

const updateProduct = async (updatedProduct: Product) => {
  const { data } = await axios.put(`/api/products/${updatedProduct._id}`, updatedProduct)
  return updateProductResponseSchema.parse(data)
}

const removeProduct = async (idToRemove: string) => {
  const { data } = await axios.delete(`/api/products/${idToRemove}`)
  return removeProductResponseSchema.parse(data)
}

const getCart = async () => {
  const { data } = await axios.get('/api/cart')
  return data
}

const addToCart = async (product: Product) => {
  const { data } = await axios.post('/api/add-to-cart', { productId: product._id })
  return data
}

const checkout = async () => {
  const { data } = await axios.post('/api/checkout')
  return data
}

export { getProducts, addProduct, updateProduct, removeProduct, getCart, addToCart, checkout }
