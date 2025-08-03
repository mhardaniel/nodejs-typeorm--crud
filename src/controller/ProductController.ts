import { AppDataSource } from "../data-source.js";
import { NextFunction, Request, Response } from "express";
import { Product } from "../entity/Product.js";

export class ProductController {
  private productRepository = AppDataSource.getRepository(Product);

  async index(request: Request, response: Response, next: NextFunction) {
    try {
      const products = await this.productRepository.find();

      response.status(200).json({
        success: true,
        data: products,
      });
    } catch (e) {
      next(e);
    }
  }

  async show(request: Request, response: Response, next: NextFunction) {
    try {
      const id = parseInt(request.params.id);

      const product = await this.productRepository.findOne({
        where: { id },
      });

      if (!product) {
        response.status(404).json({
          success: false,
          message: "unregistered product",
        });
        return;
      }

      response.json(product);
    } catch (e) {
      next(e);
    }
  }

  async store(request: Request, response: Response, next: NextFunction) {
    try {
      const { name, price, image } = request.body;

      if (!name || !price || !image) {
        response.status(400).json({
          success: false,
          message: "Please provide all fields",
        });
        return;
      }

      const product = Object.assign(new Product(), {
        name,
        price,
        image,
      });

      await this.productRepository.save(product);

      response.status(201).json({
        success: true,
        data: product,
      });
    } catch (e) {
      next(e);
    }
  }

  async update(request: Request, response: Response, next: NextFunction) {
    try {
      const id = parseInt(request.params.id);

      const { name, price, image } = request.body;

      if (!name || !price || !image) {
        response.status(400).json({
          success: false,
          message: "Please provide all fields",
        });
        return;
      }

      let productToUpdate = await this.productRepository.findOneBy({ id });
      if (!productToUpdate) {
        response.status(404).json({
          success: false,
          message: "this product not exist",
        });
        return;
      }
      productToUpdate = {
        ...productToUpdate,
        ...{ name, price, image },
      };

      await this.productRepository.save(productToUpdate);

      response.status(201).json({
        success: true,
        data: productToUpdate,
      });
    } catch (e) {
      next(e);
    }
  }

  async destroy(request: Request, response: Response, next: NextFunction) {
    try {
      const id = parseInt(request.params.id);

      let productToRemove = await this.productRepository.findOneBy({ id });

      if (!productToRemove) {
        response.status(404).json({
          success: false,
          message: "this product not exist",
        });
        return;
      }

      await this.productRepository.remove(productToRemove);

      response.status(200).json({
        success: true,
        message: "product has been removed",
      });
    } catch (e) {
      next(e);
    }
  }
}
