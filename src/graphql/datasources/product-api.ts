import { ProductRepository } from '../../repositories/ProductRepository.js';
import { Product } from '../../entity/Product.js';
import { ApiProductResponse, ProductInput } from '../types.js';

export class ProductAPI {
  async index() {
    try {
      return await ProductRepository.find();
    } catch (error) {}
  }

  async show(id: number) {
    try {
      return await ProductRepository.findOne({
        where: { id },
      });
    } catch (error) {}
  }

  async store(productInput: ProductInput): Promise<ApiProductResponse> {
    try {
      const product = Object.assign(new Product(), {
        ...productInput,
      });

      await ProductRepository.save(product);

      return {
        success: true,
        data: product,
      };
    } catch (error) {
      console.error(error);

      return {
        success: false,
        message: 'Internal Server Error',
      };
    }
  }

  async update(
    id: number,
    productInput: ProductInput,
  ): Promise<ApiProductResponse> {
    try {
      let productToUpdate = await ProductRepository.findOneBy({ id });
      if (!productToUpdate) {
        return {
          success: false,
          message: 'this product not exist',
        };
      }
      productToUpdate = {
        ...productToUpdate,
        ...productInput,
      };

      await ProductRepository.save(productToUpdate);

      return {
        success: true,
        data: productToUpdate,
      };
    } catch (error) {
      console.error(error);

      return {
        success: false,
        message: 'Internal Server Error',
      };
    }
  }

  async destroy(id: number): Promise<ApiProductResponse> {
    try {
      let productToRemove = await ProductRepository.findOneBy({ id });

      if (!productToRemove) {
        return {
          success: false,
          message: 'this product not exist',
        };
      }

      await ProductRepository.remove(productToRemove);

      return {
        success: true,
        message: 'product has been removed',
      };
    } catch (error) {
      console.error(error);

      return {
        success: false,
        message: 'Internal Server Error',
      };
    }
  }
}
