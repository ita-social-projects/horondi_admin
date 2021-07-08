const itemsCount = 9;
const replyComments = [
  {
    _id: '60e0acee0580cb2548db5505',
    replyText: 'test reply',
    showReplyComment: false,
    createdAt: '2021-07-03T18:31:10.303Z',
    verifiedPurchase: true,
    refToReplyComment: '60db19ba123304408493a704',
    answerer: {
      _id: '60a239778c0f983a5ceb218a',
      firstName: 'Іван',
      email: 'yur.dub7@gmail.com',
      role: 'user'
    }
  },
  {
    _id: '60e0acee0580cb2548db5502',
    replyText: 'test reply 2',
    showReplyComment: false,
    createdAt: '2021-07-03T18:31:10.303Z',
    verifiedPurchase: false,
    refToReplyComment: '60db19ba123304408493a702',
    answerer: {
      _id: '60a239778c0f983a5ceb218a',
      firstName: 'Василь',
      email: 'yur.dub7@gmail.com',
      role: 'user'
    }
  },
  {
    _id: '60e0acee0580cb2548db5501',
    replyText: 'test reply 2',
    showReplyComment: true,
    createdAt: '2021-07-03T18:31:10.303Z',
    verifiedPurchase: false,
    refToReplyComment: '60db19ba123304408493a702',
    answerer: {}
  }
];

module.exports = {
  itemsCount,
  replyComments
};
