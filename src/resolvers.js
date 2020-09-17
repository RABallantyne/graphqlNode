import { users, posts, me, post, comments } from '../data/data';

//Resolvers
const resolvers = {
  Query: {
    me() {
      return me;
    },
    post() {
      return post;
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

  Mutation: {
    createUser(parent, args, ctx, info) {
      const emailTaken = users.some((user) => {
        return user.email === args.email;
      });
      if (emailTaken) {
        throw new Error('Email taken');
      }
      const user = {
        id: uuidv4(),
        name: args.name,
        email: args.email,
        age: args.age,
      };
      users.push(user);
      return user;
    },

    createPost(parent, args, ctx, info) {
      const userExists = users.some((user) => {
        return user.id === args.author;
      });
      if (!userExists) {
        throw new Error('User not found');
      }
      const post = {
        id: uuidv4(),
        title: args.title,
        body: args.body,
        published: args.published,
        author: args.author,
      };
      posts.push(post);
      return post;
    },

    createComment(parent, args, ctx, info) {
      const userExists = users.some((user) => user.id === args.author);
      const postExists = posts.some(
        (post) => post.id === args.post && post.published
      );
      if (!postExists || !userExists) {
        throw new Error("Something isn't right homeboy");
      }
      const comment = {
        id: uuidv4(),
        content: args.content,
        author: args.author,
        post: args.post,
      };
      comments.push(comment);
      return comment;
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
};

export { resolvers };
