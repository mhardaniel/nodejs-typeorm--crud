import { NextFunction, Request, Response } from 'express';
import { Product } from '../entity/Product.js';
import { ProductRepository } from '../repositories/ProductRepository.js';

class ProductController {
  async index(request: Request, response: Response, next: NextFunction) {
    try {
      const products = await ProductRepository.find();

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
      const id = request.params.id;

      if (!id) return;

      const product = await ProductRepository.findOne({
        where: { id },
      });

      if (!product) {
        response.status(404).json({
          success: false,
          message: 'this product not exist',
        });
        return;
      }

      response.status(200).json({ success: true, data: product });
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
          message: 'Please provide all fields',
        });
        return;
      }

      const product = Object.assign(new Product(), {
        name,
        price,
        image,
      });

      await ProductRepository.save(product);

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
      const id = request.params.id;

      if (!id) return;

      const { name, price, image } = request.body;

      if (!name || !price || !image) {
        response.status(400).json({
          success: false,
          message: 'Please provide all fields',
        });
        return;
      }

      let productToUpdate = await ProductRepository.findOneBy({ id });
      if (!productToUpdate) {
        response.status(404).json({
          success: false,
          message: 'this product not exist',
        });
        return;
      }
      productToUpdate = {
        ...productToUpdate,
        ...{ name, price, image },
      };

      await ProductRepository.save(productToUpdate);

      response.status(200).json({
        success: true,
        data: productToUpdate,
      });
    } catch (e) {
      next(e);
    }
  }

  async destroy(request: Request, response: Response, next: NextFunction) {
    try {
      const id = request.params.id;

      if (!id) return;

      let productToRemove = await ProductRepository.findOneBy({ id });

      if (!productToRemove) {
        response.status(404).json({
          success: false,
          message: 'this product not exist',
        });
        return;
      }

      await ProductRepository.remove(productToRemove);

      response.status(200).json({
        success: true,
        message: 'product has been removed',
      });
    } catch (e) {
      next(e);
    }
  }
}

export default new ProductController();
