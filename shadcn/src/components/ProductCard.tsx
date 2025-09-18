import { Button } from "@/components/ui/button"
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import type { IProduct } from "@/types/productType";
import { useProductStore } from "@/store/product";
import { toast } from 'sonner';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react";

const ProductCard = ({ product }: { product: IProduct }) => {

  const { deleteProduct, updateProduct } = useProductStore();
  const [open, setOpen] = useState(false);
  const [updatedProduct, setUpdatedProduct] = useState(product);

  const handleDeleteProduct = async (id: number): Promise<void> => {
    const { success, message } = await deleteProduct(id);

    success ?
      toast.success(message) :
      toast.error(message)

  };

  const handleUpdateProduct = async (id: number, updatedProduct: IProduct) => {
    const { success, message } = await updateProduct(id, updatedProduct);

    success ? (
      toast.success(message), setOpen(false)) :
      toast.error(message)
  };

  return (
    <div className="product-item">
      <div className="shadow-lg rounded-lg overflow-hidden transition-all duration-[0.3s] hover:-translate-y-2 hover:shadow-xl">
        <img src={updatedProduct.image} alt={updatedProduct.name} className="w-full h-48 object-cover" />
        <div className="p-4">
          <h2 className="product-name text-xl mb-2">{updatedProduct.name}</h2>
          <span className="product-price block font-bold text-md mb-4">${updatedProduct.price}</span>
          <div className="flex gap-2">
            <Button variant="secondary" size="icon" className="product-edit size-8 bg-blue-200 hover:cursor-pointer" onClick={() => setOpen(true)}>
              <FaRegEdit />
            </Button>
            <Button variant="secondary" size="icon" className="product-delete size-8 bg-red-200 hover:cursor-pointer" onClick={() => handleDeleteProduct(product.id)}>
              <MdDelete />
            </Button>
          </div>
        </div>
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <form>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Update Product</DialogTitle>
              <DialogDescription className="sr-only">
                update product details            </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4">
              <div className="grid gap-3">
                <Label htmlFor="name">Product Name</Label>
                <Input id="name" name="name" defaultValue={product.name} onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })} />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="price">Price</Label>
                <Input id="price" name="price" type="number" defaultValue={product.price} onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.valueAsNumber })} />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="image">Product Name</Label>
                <Input id="image" name="image" defaultValue={product.image} onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value })} />
              </div>

            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button id="cancel-update-dialog" variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit" onClick={() => handleUpdateProduct(product.id, updatedProduct)}>Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
    </div>
  )
}

export default ProductCard
