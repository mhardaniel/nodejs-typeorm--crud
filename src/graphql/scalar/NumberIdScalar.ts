import { GraphQLScalarType, Kind } from 'graphql';

export const NumberIdScalar = new GraphQLScalarType({
  name: 'NumberId',
  description: 'A custom scalar for converting numbers to string IDs.',

  // Converts the internal server value (number) to a client-readable format (string)
  serialize(value: unknown): string {
    if (typeof value === 'number') {
      return String(value); // Convert number to string
    }
    throw new Error('NumberIdScalar can only serialize number values.');
  },

  // Converts a client-provided variable value (string) to the internal server format (number)
  parseValue(value: unknown): number {
    if (typeof value === 'string') {
      const num = parseInt(value, 10);
      if (isNaN(num)) {
        throw new Error('NumberIdScalar received a non-numeric string value.');
      }
      return num; // Convert string to number
    }
    throw new Error('NumberIdScalar can only parse string values.');
  },

  // Converts a hard-coded literal value in the query (string) to the internal server format (number)
  parseLiteral(ast): number {
    if (ast.kind === Kind.STRING) {
      const num = parseInt(ast.value, 10);
      if (isNaN(num)) {
        throw new Error(
          'NumberIdScalar received a non-numeric string literal.',
        );
      }
      return num; // Convert string to number
    }
    throw new Error('NumberIdScalar can only parse string literals.');
  },
});
