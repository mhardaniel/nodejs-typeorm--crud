import { Resolver, Query, Arg, Mutation } from 'type-graphql';
import { Product } from '../../entity/Product.js';
import { ProductRepository } from '../../repositories/ProductRepository.js';
import { ProductInput, IProductApiResponse } from '../inputs/ProductInput.js';

@Resolver()
export class ProductResolver {
  @Query(() => [Product])
  async products() {
    try {
      return await ProductRepository.find();
    } catch (error) {}
  }

  @Query(() => Product)
  async product(@Arg('id', () => String) id: string) {
    try {
      return await ProductRepository.findOne({
        where: { id },
      });
    } catch (error) {}
  }

  @Mutation(() => IProductApiResponse)
  async storeProduct(@Arg('data', () => ProductInput) data: ProductInput) {
    try {
      const product = Object.assign(new Product(), data);

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

  @Mutation(() => IProductApiResponse)
  async updateProduct(
    @Arg('id', () => String) id: string,
    @Arg('data', () => ProductInput) data: ProductInput,
  ) {
    try {
      let productToUpdate = await ProductRepository.findOneBy({ id });
      if (!productToUpdate) {
        return {
          success: false,
          message: 'this product not exist',
        };
      }

      Object.assign(productToUpdate, data);

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

  @Mutation(() => IProductApiResponse)
  async destroyProduct(
    @Arg('id', () => String) id: string,
  ): Promise<IProductApiResponse> {
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
