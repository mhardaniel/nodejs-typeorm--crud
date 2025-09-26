import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

import type { IProduct, ProductDialogCompProps } from '@/types/productType'
import { useProductStore } from '@/store/product'
import { toast } from 'sonner'
import { useState } from 'react'

const ProductDialog = ({ product, open, setOpen }: ProductDialogCompProps) => {
  const { updateProduct } = useProductStore()
  const [updatedProduct, setUpdatedProduct] = useState(product)

  const handleUpdateProduct = async (id: number, updatedProduct: IProduct) => {
    const { success, message } = await updateProduct(id, updatedProduct)

    success ? (toast.success(message), setOpen(false)) : toast.error(message)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Update Product</DialogTitle>
            <DialogDescription className="sr-only">
              update product details{' '}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name">Product Name</Label>
              <Input
                id="name"
                name="name"
                defaultValue={product.name}
                onChange={(e) =>
                  setUpdatedProduct({ ...updatedProduct, name: e.target.value })
                }
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                name="price"
                type="number"
                defaultValue={product.price}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    price: e.target.valueAsNumber,
                  })
                }
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="image">Product Name</Label>
              <Input
                id="image"
                name="image"
                defaultValue={product.image}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    image: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button id="cancel-update-dialog" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              onClick={() => handleUpdateProduct(product.id, updatedProduct)}
            >
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}

export default ProductDialog
