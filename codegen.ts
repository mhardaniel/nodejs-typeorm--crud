import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: './src/graphql/schema.graphql',
  generates: {
    './src/graphql/types.ts': {
      plugins: ['typescript', 'typescript-resolvers'],
      config: {
        contextType: './src/graphql/context.ts#DataSourceContext',
      },
    },
  },
};

export default config;
