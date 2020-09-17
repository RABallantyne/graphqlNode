import { GraphQLServer } from 'graphql-yoga';
import { users, posts, me, post, comments } from '../data/data';

// Scalar types: String, Boolean, Int, Float, ID

//Type definitions (schema)
const typeDefs = `
  type Query {
    users(query: String): [User!]!
    posts(query: String, published: Boolean):[Post!]!
    me: User!
    post: Post!
    author: [User!]!
    comments:[Comment!]!
  }

  type Comment {
    id: ID!
    content: String!
    author: User!
    post: Post!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
    posts: [Post!]!
    comments: [Comment!]!
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
    author: User!
    comments: [Comment!]!
  }
`;

//Resolvers
const resolvers = {
  Query: {
    me() {
      return me;
    },
    post() {
      return post;
    },
    author() {
      return;
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
    comments(parent, args, ctx, info) {
      return comments;
    },
  },
  Comment: {
    author(parent, args, ctx, info) {
      return users.find((user) => {
        return user.id === parent.author;
      });
    },
    post(parent, args, ctx, info) {
      return posts.find((post) => {
        return post.id === parent.post;
      });
    },
  },
  Post: {
    author(parent, args, ctx, info) {
      return users.find((user) => {
        return user.id === parent.author;
      });
    },
    comments(parent, args, ctx, info) {
      return comments.filter((comment) => {
        return comment.post === parent.id;
      });
    },
  },
  User: {
    posts(parent, args, ctx, info) {
      return posts.filter((post) => {
        return post.author === parent.id;
      });
    },
    comments(parent, args, ctx, info) {
      return comments.filter((comment) => {
        return comment.author === parent.id;
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
