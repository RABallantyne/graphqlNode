import { GraphQLServer } from 'graphql-yoga';

//add location and bio query...

//Type definitions (schema)

const typeDefs = `
  type Query {
    hello: String!
    name: String!
    location: String!
    bio: String!
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
    location() {
      return 'Denver, CO';
    },
    bio() {
      return 'A guy learning GraphQL!';
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
