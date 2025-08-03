import type { IProduct, IProductStateResponse } from '@/types/productType'
import { create } from 'zustand'

interface ProductState {
  products: IProduct[];
  setProducts: (products: IProduct[]) => void;
  createProduct: (newProduct: Omit<IProduct, 'id'>) => Promise<IProductStateResponse>;
  fetchProducts: () => void;
  deleteProduct: (id: number) => Promise<IProductStateResponse>;
  updateProduct: (id: number, updatedProduct: IProduct) => Promise<IProductStateResponse>;
}

export const useProductStore = create<ProductState>()((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      return { success: false, message: 'Please fill in all fields.' }
    }

    const res = await fetch('/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify(newProduct)
    })

    const data = await res.json()
    set((state) => ({
      products: [...state.products, data.data]
    }))

    return { success: true, message: 'Product created successfully.' }
  },
  fetchProducts: async () => {
    const res = await fetch("/api/products");
    const data = await res.json();
    set({ products: data.data });
  },
  deleteProduct: async (id) => {
    const res = await fetch(`/api/products/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (!data.success) return { success: false, message: data.message };

    set((state) => ({ products: state.products.filter((product) => product.id !== id) }));

    return { success: true, message: data.message };
  },
  updateProduct: async (id, updatedProduct) => {
    const res = await fetch(`/api/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProduct),
    });
    const data = await res.json();
    if (!data.success) return { success: false, message: data.message };

    set((state) => ({
      products: state.products.map((product) => (product.id === id ? data.data : product)),
    }));

    return { success: true, message: 'Product updated successfully' };
  },
}))
