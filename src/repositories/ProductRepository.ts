import { AppDataSource } from '../data-source.js';
import { Product } from '../entity/Product.js';

export const ProductRepository = AppDataSource.getRepository(Product);
