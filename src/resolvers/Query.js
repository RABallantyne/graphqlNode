const Query = {
  posts(parent, args, { db }, info) {
    if (!args.query && args.published === undefined) {
      return db.posts;
    }
    return args.published === undefined
      ? db.posts.filter(
          (post) =>
            post.title.toLowerCase().includes(args.query.toLowerCase()) ||
            post.body.toLowerCase().includes(args.query.toLowerCase())
        )
      : db.posts.filter((post) => post.published === args.published);
  },

  users(parent, args, { db }, info) {
    if (!args.query) {
      return db.users;
    }
    return db.users.filter((user) => {
      return user.name.toLowerCase().includes(args.query.toLowerCase());
    });
  },

  comments(parent, args, { db }, info) {
    return db.comments;
  },
};

export { Query as default };
