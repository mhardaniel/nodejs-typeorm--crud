import { ApolloServer } from '@apollo/server';

import { readFileSync } from 'fs';
import path from 'path';
import { gql } from 'graphql-tag';

import { resolvers } from './resolvers.js';

const __dirname = path.resolve();

const typeDefs = gql(
  readFileSync(path.resolve(__dirname, './src/graphql/schema.graphql'), {
    encoding: 'utf-8',
  }),
);

export const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});
