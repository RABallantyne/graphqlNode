import { GraphQLServer } from 'graphql-yoga';

// Scalar types: String, Boolean, Int, Float, ID

// Create query def and resolver for each:

// title - string, product name
// price - float
// releaseYear - int (optional)
// rating - float (optional)
// inStock - boolean

//Type definitions (schema)
const typeDefs = `
  type Query {
    title: String!
    price: Float!
    releaseYear: Int
    rating: Float
    inStock: Boolean!
  }
`;

//Resolvers
const resolvers = {
  Query: {
    title() {
      return 'Super Thing';
    },
    price() {
      return 4.82;
    },
    releaseYear() {
      return 2019;
    },
    rating() {
      return 5;
    },
    inStock() {
      return true;
    },
  },
};

const server = new GraphQLServer({
  typeDefs,
  resolvers,
});

server.start(() => {
  console.log('Server started!');
});
