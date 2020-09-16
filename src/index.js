import { GraphQLServer } from 'graphql-yoga';

// Scalar types: String, Boolean, Int, Float, ID

// 1. Set up an array of 3 dummy posts
// 2. Set up a posts query and resolver that returns all posts
// 3. test the query
// 4. add an arg that returns posts containing query string in title OR body
// 5. run sample queries to test

//demo post data

const posts = [
  {
    id: '1',
    title: 'A post about things',
    body: 'qqqqqqq?',
    published: true,
  },
  {
    id: '2',
    title: 'A different post about other things',
    body: 'I really do care, and you should too weee',
    published: false,
  },
  {
    id: '3',
    title: 'Zimbabwe is a great country!',
    body: 'Pretty sure there are Africans there or something like that weeee',
    published: true,
  },
];

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
    posts(query: String, published: Boolean):[Post!]!
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
    posts(parent, args, ctx, info) {
      if (!args.query && args.published === undefined) {
        return posts;
      }
      return args.published === undefined
        ? posts.filter(
            (post) =>
              post.title.toLowerCase().includes(args.query.toLowerCase()) ||
              post.body.toLowerCase().includes(args.query.toLowerCase())
          )
        : posts.filter((post) => post.published === args.published);
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
