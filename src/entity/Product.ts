import { Field, Float, GraphQLISODateTime, ID, ObjectType } from 'type-graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class Product {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: string;

  @Field(() => String)
  @Column('varchar')
  name!: string;

  @Field(() => Float)
  @Column('float')
  price!: number;

  @Field(() => String)
  @Column('varchar')
  image!: string;

  @Field(() => GraphQLISODateTime)
  @CreateDateColumn()
  created_at: Date = new Date();

  @Field(() => GraphQLISODateTime)
  @UpdateDateColumn()
  updated_at: Date = new Date();
}
