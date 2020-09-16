//named export - as many as needed
//default export has no name, can only have one.
const message = 'a message from myModule.js';

const name = 'Ole Bobby B';

const location = 'Denver, CO';

const getGreeting = (name) => {
  return `Welcome to intro to graphQL ${name}`;
};

export { getGreeting, message, name, location as default };
