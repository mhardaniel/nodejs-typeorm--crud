import { Button } from '@/components/ui/button'
import { FaRegEdit } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import type { IProduct } from '@/types/productType'
import { useProductStore } from '@/store/product'
import { toast } from 'sonner'

import { useState } from 'react'
import ProductDialog from './ProductDialog'

const ProductCard = ({ product }: { product: IProduct }) => {
  const { deleteProduct } = useProductStore()
  const [open, setOpen] = useState(false)

  const handleDeleteProduct = async (id: number): Promise<void> => {
    const { success, message } = await deleteProduct(id)

    success ? toast.success(message) : toast.error(message)
  }

  return (
    <div className="product-item">
      <div className="shadow-lg rounded-lg overflow-hidden transition-all duration-[0.3s] hover:-translate-y-2 hover:shadow-xl">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h2 className="product-name text-xl mb-2">{product.name}</h2>
          <span className="product-price block font-bold text-md mb-4">
            ${product.price}
          </span>
          <div className="flex gap-2">
            <Button
              variant="secondary"
              size="icon"
              className="product-edit size-8 bg-blue-200 hover:cursor-pointer"
              onClick={() => setOpen(true)}
            >
              <FaRegEdit />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="product-delete size-8 bg-red-200 hover:cursor-pointer"
              onClick={() => handleDeleteProduct(product.id)}
            >
              <MdDelete />
            </Button>
          </div>
        </div>
      </div>

      <ProductDialog product={product} open={open} setOpen={setOpen} />
    </div>
  )
}

export default ProductCard
