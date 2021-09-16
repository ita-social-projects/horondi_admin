const mockUserId = '604394a2a7532c33dcb326d5';

const mockUsers = {
  list: [
    {
      _id: '601ae576593be34714f2cf86',
      firstName: 'Admin',
      lastName: 'admin',
      email: 'admin@gmail.com',
      role: 'user',
      phoneNumber: null,
      banned: {
        blockPeriod: '0',
        blockCount: 0,
        updatedAt: null
      }
    }
  ],
  user: {
    firstName: 'admin',
    lastName: 'admin',
    confirmed: false,
    role: 'user',
    phoneNumber: 123,
    email: 'admin@gmail.com',
    address: 'Abc',
    banned: {
      blockPeriod: '0',
      blockCount: 0,
      updatedAt: '2021-09-15T12:27:10.474Z'
    }
  },
  userLoading: false
};
const user = {
  _id: '5fbe46259e79126198841b3e',
  address: 'Abc',
  banned: {
    blockPeriod: '0',
    blockCount: 0,
    updatedAt: '2021-08-06T15:13:56.248Z'
  },
  confirmed: true,
  email: 'user@gmail.com',
  firstName: 'B',
  lastName: 'S',
  phoneNumber: 123,
  role: 'admin'
};

module.exports = {
  mockUsers,
  mockUserId,
  user
};
