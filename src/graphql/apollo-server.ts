import { ApolloServer } from '@apollo/server';
import { buildSchema } from 'type-graphql';

import { ProductResolver } from './resolvers/ProductResolver.js';

export async function createApolloServer(): Promise<ApolloServer> {
  const schema = await buildSchema({
    resolvers: [ProductResolver],
  });

  const apolloServer = new ApolloServer({
    schema,
  });

  return apolloServer;
}
