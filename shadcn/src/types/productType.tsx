export interface IProduct {
  id: number;
  name: string;
  price: number;
  image: string;
}

export interface IProductStateResponse {
  success: boolean;
  message: string;
}
