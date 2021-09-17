const commentData = {
  date: new Date(1615278615760),
  show: true,
  text: 'Допоможіть! Дитина помалювала фламастером, нічим не можу вивести.',
  user: {
    _id: '5fcfc2c5823c593d1c28c459',
    firstName: 'Ivan',
    email: 'vaaeking@gmail.com'
  },
  _id: '6047321793650236ddbfb841'
};
const dataList = [
  {
    ...commentData,
    product: { _id: '6043c3303e06ad3edcdb7b34' }
  },

  {
    ...commentData,
    product: { _id: '6043c3303e06ad3edcdb7b345' }
  }
];

export default dataList;
