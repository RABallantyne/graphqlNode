import { GraphQLServer } from 'graphql-yoga';

// Scalar types: String, Boolean, Int, Float, ID

//demo user data

const users = [
  {
    id: '1',
    name: 'Rob',
    email: 'bobbo@example.com',
    age: 36,
  },
  {
    id: '2',
    name: 'Lola',
    email: 'lola@doggo.com',
  },
  {
    id: '3',
    name: 'Uma',
    email: 'uma@borkin.com',
    age: 5,
  },
];

//Type definitions (schema)
const typeDefs = `
  type Query {
    users(query: String): [User!]!
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
    users(parent, args, ctx, info) {
      if (!args.query) {
        return users;
      }
      return users.filter((user) => {
        return user.name.toLowerCase().includes(args.query.toLowerCase());
      });
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
