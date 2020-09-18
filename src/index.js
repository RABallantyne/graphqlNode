import { GraphQLServer } from 'graphql-yoga';

import { resolvers } from './resolvers';
import { typeDefs } from './typeDefs';

const server = new GraphQLServer({
  typeDefs,
  resolvers,
});

server.start(() => {
  console.log('Server started ya dumby!');
});
