import { GraphQLServer } from 'graphql-yoga';

//Type definitions (schema)

const typeDefs = `
  type Query {
    hello: String!
    name: String!
  }
`;

//Resolvers

const resolvers = {
  Query: {
    hello() {
      return 'This is my first query!';
    },
    name() {
      return 'Bobby B';
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
