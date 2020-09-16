import { GraphQLServer } from 'graphql-yoga';

// Scalar types: String, Boolean, Int, Float, ID

//Type definitions (schema)
const typeDefs = `
  type Query {
   greeting(name: String, position: String): String!
   add(numbers: [Float!]!): Float!
   grades: [Int!]!
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
    greeting(parent, args, ctx, info) {
      if (args.name && args.position) {
        return `Hello, ${args.name}, you are a great ${args.position}`;
      } else {
        return 'Hello';
      }
    },
    add(parent, args, ctx, info) {
      if (args.numbers.length === 0) {
        return 0;
      } else {
        return args.numbers.reduce((acc, curr) => {
          return acc + curr;
        });
      }
    },
    grades(parent, args, ctx, info) {
      return [88, 99, 57];
    },
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
