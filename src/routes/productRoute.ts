import { ProductController } from "../controller/ProductController.js";

export const ProductRoutes = [
  {
    method: "get",
    route: "/api/products",
    controller: ProductController,
    action: "index",
  },
  {
    method: "get",
    route: "/api/products/:id",
    controller: ProductController,
    action: "show",
  },
  {
    method: "post",
    route: "/api/products",
    controller: ProductController,
    action: "store",
  },
  {
    method: "put",
    route: "/api/products/:id",
    controller: ProductController,
    action: "update",
  },
  {
    method: "delete",
    route: "/api/products/:id",
    controller: ProductController,
    action: "destroy",
  },
];
