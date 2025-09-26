import type { ProductState } from '@/types/productType'
import { create } from 'zustand'

export const useProductStore = create<ProductState>()((set) => ({
  loading: false,
  error: null,

  products: [],

  createProduct: async (newProduct) => {
    set({ loading: true, error: null })

    try {
      if (!newProduct.name || !newProduct.price || !newProduct.image) {
        return { success: false, message: 'Please fill in all fields.' }
      }

      const res = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      })

      const data = await res.json()
      set((state) => ({
        products: [...state.products, data.data],
        loading: false,
      }))

      return { success: true, message: 'Product created successfully.' }
    } catch (err: unknown) {
      console.error(err)

      const errorMsg = 'Failed to create product'
      set({ error: errorMsg, loading: false })
      return { success: false, message: errorMsg }
    }
  },
  fetchProducts: async () => {
    set({ loading: true, error: null })

    try {
      const res = await fetch('/api/products')
      const data = await res.json()
      set({ products: data.data, loading: false })
    } catch (err: unknown) {
      console.error(err)

      const errorMsg = 'Failed to fetch products'
      set({ error: errorMsg, loading: false })
    }
  },
  deleteProduct: async (id) => {
    set({ loading: true, error: null })

    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
      })
      const data = await res.json()
      if (!data.success) return { success: false, message: data.message }

      set((state) => ({
        products: state.products.filter((product) => product.id !== id),
        loading: false,
      }))

      return { success: true, message: data.message }
    } catch (err: unknown) {
      console.error(err)

      const errorMsg = 'Failed to delete product'
      set({ error: errorMsg, loading: false })
      return { success: false, message: errorMsg }
    }
  },
  updateProduct: async (id, updatedProduct) => {
    set({ loading: true, error: null })

    try {
      if (
        !updatedProduct.name ||
        !updatedProduct.price ||
        !updatedProduct.image
      ) {
        return { success: false, message: 'Please fill in all fields.' }
      }

      const res = await fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProduct),
      })
      const data = await res.json()
      if (!data.success) return { success: false, message: data.message }

      set((state) => ({
        products: state.products.map((product) =>
          product.id === id ? data.data : product,
        ),
        loading: false,
      }))

      return { success: true, message: 'Product updated successfully' }
    } catch (err: unknown) {
      console.error(err)
      const errorMsg = 'Failed to update product'
      set({ error: errorMsg, loading: false })

      return { success: false, message: errorMsg }
    }
  },
}))
