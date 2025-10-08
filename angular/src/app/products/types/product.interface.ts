export interface IProduct {
  id: number;
  name: string;
  price: number;
  image: string;
}

export interface IProductsResponse {
  success: boolean;
  message: string;
  data: IProduct[];
}

export interface IProductResponse {
  success: boolean;
  message: string;
  data: IProduct;
}
