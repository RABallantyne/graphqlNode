import { v4 as uuidv4 } from 'uuid';

const Mutation = {
  createUser(parent, args, { db }, info) {
    const emailTaken = db.users.some((user) => {
      return user.email === args.data.email;
    });
    if (emailTaken) {
      throw new Error('Email taken');
    }

    const user = {
      id: uuidv4(),
      ...args.data,
    };
    db.users.push(user);
    return user;
  },

  deleteUser(parent, args, { db }, info) {
    const userIndex = db.users.findIndex((user) => {
      return user.id === args.id;
    });
    if (userIndex === -1) {
      throw new Error('No User with that ID.');
    }
    const deletedUsers = db.users.splice(userIndex, 1);
    db.posts = db.posts.filter((post) => {
      const match = post.author === args.id;
      if (match) {
        db.comments = db.comments.filter((comment) => {
          return comment.post !== post.id;
        });
      }
      return !match;
    });
    db.comments = db.comments.filter((comment) => {
      return comment.author !== args.id;
    });
    return deletedUsers[0];
  },

  updateUser(parent, args, { db }, info) {
    const { id, data } = args;
    const user = db.users.find((user) => user.id === id);
    if (!user) {
      throw new Error('User not found');
    }

    if (typeof data.email === 'string') {
      const emailTaken = db.users.some((user) => user.email === data.email);
      if (emailTaken) {
        throw new Error('Email taken');
      }
      user.email = data.email;
    }
    if (typeof data.name === 'string') {
      user.name = data.name;
    }
    if (typeof data.age !== 'undefined') {
      user.age = data.age;
    }
    return user;
  },

  createPost(parent, args, { db }, info) {
    const userExists = db.users.some((user) => {
      return user.id === args.data.author;
    });
    if (!userExists) {
      throw new Error('User not found');
    }
    const post = {
      id: uuidv4(),
      ...args.data,
    };
    db.posts.push(post);
    return post;
  },

  deletePost(parent, args, { db }, info) {
    const postIndex = db.posts.findIndex((post) => {
      return post.id === args.id;
    });
    if (postIndex === -1) {
      throw new Error('no post with that id.');
    }
    const deletedPost = db.posts.splice(postIndex, 1);
    db.comments = db.comments.filter((comment) => {
      return comment.post !== args.id;
    });
    return deletedPost[0];
  },

  updatePost(parent, args, { db }, info) {
    const { id, data } = args;
    const post = db.posts.find((post) => post.id === id);
    if (!post) {
      throw new Error('Post does not exist');
    }
    if (typeof data.title === 'string') {
      post.title = data.title;
    }
    if (typeof data.body === 'string') {
      post.body = data.body;
    }
    if (typeof data.published === 'boolean') {
      post.published = data.published;
    }
    return post;
  },

  createComment(parent, args, { db }, info) {
    const userExists = db.users.some((user) => user.id === args.data.author);
    const postExists = db.posts.some(
      (post) => post.id === args.data.post && post.published
    );
    if (!postExists || !userExists) {
      throw new Error("Something isn't right homeboy");
    }
    const comment = {
      id: uuidv4(),
      ...args.data,
    };
    db.comments.push(comment);
    return comment;
  },

  deleteComment(parent, args, { db }, info) {
    const commentIndex = db.comments.findIndex(
      (comment) => comment.id === args.id
    );
    if (commentIndex === -1) {
      throw new Error('comment not found');
    }
    const deletedComment = db.comments.splice(commentIndex, 1);
    return deletedComment[0];
  },

  updateComment(parent, args, { db }, info) {
    const { id, data } = args;
    const comment = db.comments.find((comment) => comment.id === id);
    if (!comment) {
      throw new Error('Comment does not exist');
    }
    if (typeof data.content === 'string') {
      comment.content = data.content;
    }
    return comment;
  },
};

export { Mutation as default };
