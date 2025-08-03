'use client';

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useProductStore } from "@/store/product"
import type { IProduct } from "@/types/productType"
import { useState } from "react"
import { toast } from 'sonner';

type NewProductType = Omit<IProduct, 'id'>;

const CreatePage = () => {
  const { createProduct } = useProductStore()
  const [newProduct, setNewProduct] = useState<NewProductType>({
    name: '',
    price: 0,
    image: ''
  })

  const handleAddProduct = async () => {

    const { success, message } = await createProduct(newProduct)

    success ?
      toast.success(message) :
      toast.error(message)

    setNewProduct({ name: '', price: 0, image: '' })
  }

  return (
    <div className="max-w-xl mx-auto py-12">
      <div className="w-full">
        <h1 className="text-2xl mb-5 text-center">Create New Product</h1>

        <div className="w-full p-6 rounded-lg shadow-md">
          <form className="flex flex-col gap-5">
            <Input type="text" placeholder="Product Name" name="name" value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} />

            <Input type="number" placeholder="Price" name="price" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.valueAsNumber })} />

            <Input type="text" placeholder="Image URL" name="image" value={newProduct.image} onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })} />

            <Button type="button" onClick={handleAddProduct} className="w-full">Add Product</Button>
          </form>

        </div>
      </div>
    </div>
  )
}

export default CreatePage
