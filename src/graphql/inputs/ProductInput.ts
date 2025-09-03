import { Field, Float, InputType, ObjectType } from 'type-graphql';
import { Product } from '../../entity/Product.js';

@ObjectType()
export class IProductApiResponse {
  @Field(() => Boolean)
  success: boolean = false;

  @Field(() => Product)
  data?: Product;

  @Field(() => String)
  message?: string;
}

@InputType()
export class ProductInput implements Partial<Product> {
  @Field(() => String)
  name!: string;

  @Field(() => Float)
  price!: number;

  @Field(() => String)
  image!: string;
}
