const commentData = {
  date: new Date(1615278615760),
  language: 0,
  status: 'PENDING',
  senderName: 'Walleriy',
  text: 'Question from playground',
  email: 'abs@gmail.com',
  _id: '60bc8bc387c65d16c4c0a31e'
};
const answeredCommentData = {
  date: new Date(1615278615760),
  language: 0,
  status: 'ANSWERED',
  senderName: 'Ivan',
  text: 'question',
  email: 'some@gmail.com',
  _id: '60cb49f8a036eb6a89424592'
};
const dataList = [
  {
    ...commentData
  },

  {
    ...answeredCommentData,
    answer: {
      admin: '60c737b35d797d0024d43bbd',
      text: 'asd',
      date: new Date(1615278615760)
    }
  }
];

export default dataList;
