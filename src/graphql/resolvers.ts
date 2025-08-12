import { DateTimeResolver } from 'graphql-scalars';
import { NumberIdScalar } from './scalar/NumberIdScalar.js';
import { Resolvers } from './types.js';

export const resolvers: Resolvers = {
  DateTime: DateTimeResolver,
  NumberId: NumberIdScalar,
  Query: {
    product: async (_, { id }, { dataSources }) => {
      return await dataSources.productAPI.show(id);
    },
    products: async (_, __, { dataSources }) => {
      return await dataSources.productAPI.index();
    },
  },
  Mutation: {
    storeProduct: async (_, { input }, { dataSources }) => {
      return await dataSources.productAPI.store(input);
    },
    updateProduct: async (_, { id, input }, { dataSources }) => {
      return await dataSources.productAPI.update(id, input);
    },
    destroyProduct: async (_, { id }, { dataSources }) => {
      return await dataSources.productAPI.destroy(id);
    },
  },
};
