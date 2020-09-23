const posts = [
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
const users = [
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

const comments = [
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

const db = {
  users,
  posts,
  comments,
};

export { db as default };
