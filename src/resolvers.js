// import { users, posts, me, post, comments } from '../data/data';
import { v4 as uuidv4 } from 'uuid';

let posts = [
  {
    id: '1',
    title: 'A post about things',
    body: 'qqqqqqq?',
    published: true,
    author: '10',
  },
  {
    id: '2',
    title: 'A different post about other things',
    body: 'I really do care, and you should too weee',
    published: false,
    author: '20',
  },
  {
    id: '3',
    title: 'Zimbabwe is a great country!',
    body: 'Pretty sure there are Africans there or something like that weeee',
    published: true,
    author: '20',
  },
];

//demo user data

let users = [
  {
    id: '10',
    name: 'Rob',
    email: 'bobbo@example.com',
    age: 36,
  },
  {
    id: '20',
    name: 'Lola',
    email: 'lola@doggo.com',
  },
  {
    id: '30',
    name: 'Uma',
    email: 'uma@borkin.com',
    age: 5,
  },
];

let comments = [
  {
    id: '110',
    content: 'what a post!',
    author: '10',
    post: '1',
  },
  {
    id: '111',
    content: 'poop post!',
    author: '20',
    post: '1',
  },
  {
    id: '112',
    content: 'pee peeeee post!',
    author: '30',
    post: '3',
  },
  {
    id: '113',
    content: 'wonky doo dah!',
    author: '20',
    post: '2',
  },
];

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
        return user.email === args.data.email;
      });
      if (emailTaken) {
        throw new Error('Email taken');
      }

      const user = {
        id: uuidv4(),
        ...args.data,
      };
      users.push(user);
      return user;
    },

    deleteUser(parent, args, ctx, info) {
      const userIndex = users.findIndex((user) => {
        return user.id === args.id;
      });
      if (userIndex === -1) {
        throw new Error('No User with that ID.');
      }
      const deletedUsers = users.splice(userIndex, 1);
      posts = posts.filter((post) => {
        const match = post.author === args.id;
        if (match) {
          comments = comments.filter((comment) => {
            return comment.post !== post.id;
          });
        }
        return !match;
      });
      comments = comments.filter((comment) => {
        return comment.author !== args.id;
      });
      return deletedUsers[0];
    },

    createPost(parent, args, ctx, info) {
      const userExists = users.some((user) => {
        return user.id === args.data.author;
      });
      if (!userExists) {
        throw new Error('User not found');
      }
      const post = {
        id: uuidv4(),
        ...args.data,
      };
      posts.push(post);
      return post;
    },

    deletePost(parent, args, ctx, info) {
      const postIndex = posts.findIndex((post) => {
        return post.id === args.id;
      });
      if (postIndex === -1) {
        throw new Error('no post with that id.');
      }
      const deletedPost = posts.splice(postIndex, 1);
      comments = comments.filter((comment) => {
        return comment.post !== args.id;
      });
      return deletedPost[0];
    },

    createComment(parent, args, ctx, info) {
      const userExists = users.some((user) => user.id === args.data.author);
      const postExists = posts.some(
        (post) => post.id === args.data.post && post.published
      );
      if (!postExists || !userExists) {
        throw new Error("Something isn't right homeboy");
      }
      const comment = {
        id: uuidv4(),
        ...args.data,
      };
      comments.push(comment);
      return comment;
    },

    deleteComment(parent, args, ctx, info) {
      const commentIndex = comments.findIndex(
        (comment) => comment.id === args.id
      );
      if (commentIndex === -1) {
        throw new Error('comment not found');
      }
      const deletedComment = comments.splice(commentIndex, 1);
      return deletedComment[0];
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
