import { GraphQLServer } from 'graphql-yoga';

// Scalar types: String, Boolean, Int, Float, ID

//Type definitions (schema)
const typeDefs = `
  type Query {
   me: User!
   post: Post!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
  }
`;

//Resolvers
const resolvers = {
  Query: {
    me() {
      return {
        id: '123abc',
        name: 'Bobbo B',
        email: 'email@email.com',
        age: 48,
      };
    },
    post() {
      return {
        id: 'post-1',
        title: 'A really interesting post',
        body: 'lorem ipsum blah blah blah weeeeeee haaaaaaaa derrrr',
        published: false,
      };
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
