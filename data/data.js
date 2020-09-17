//demo post data
const me = {
  id: '123abc',
  name: 'Bobbo B',
  email: 'email@email.com',
  age: 48,
};

const post = {
  id: 'post-1',
  title: 'A really interesting post',
  body: 'lorem ipsum blah blah blah weeeeeee haaaaaaaa derrrr',
  published: false,
};

const posts = [
  {
    id: '1',
    title: 'A post about things',
    body: 'qqqqqqq?',
    published: true,
    author: '1',
  },
  {
    id: '2',
    title: 'A different post about other things',
    body: 'I really do care, and you should too weee',
    published: false,
    author: '2',
  },
  {
    id: '3',
    title: 'Zimbabwe is a great country!',
    body: 'Pretty sure there are Africans there or something like that weeee',
    published: true,
    author: '2',
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

export { users, posts, me, post };
