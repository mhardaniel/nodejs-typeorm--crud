export interface IProduct {
  id: number
  name: string
  price: number
  image: string
}

export interface IProductStateResponse {
  success: boolean
  message: string
}

export interface ProductState {
  loading: boolean
  error: string | null

  products: IProduct[]
  createProduct: (
    newProduct: Omit<IProduct, 'id'>,
  ) => Promise<IProductStateResponse>
  fetchProducts: () => void
  deleteProduct: (id: number) => Promise<IProductStateResponse>
  updateProduct: (
    id: number,
    updatedProduct: IProduct,
  ) => Promise<IProductStateResponse>
}

export interface ProductDialogCompProps {
  product: IProduct
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}
