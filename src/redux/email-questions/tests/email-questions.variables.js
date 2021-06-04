export const skip = 1;
export const filter = 'ALL';
export const currentPage = 1;
export const rowsPerPage = 10;

export const mockTableState = {
  dense: false,
  pagination: {
    currentPage: 0,
    rowsPerPage: 10,
    rowsPerPageOptions: [10, 20, 30]
  },
  itemsCount: 0
};

export const mockQuestions = {
  questions: [
    {
      _id: '5fb27d2f671b230024b455a9',
      senderName: 'bob',
      email: 'jeriko.outback@gmail.com',
      text: 'hello',
      date: '1605532975782',
      status: 'ANSWERED',
      answer: {
        text: 'yes',
        date: '1605533004875'
      }
    }
  ],
  count: 1
};

export const mockQuestion = {
  _id: '5fb27d2f671b230024b455a9',
  senderName: 'bob',
  email: 'jeriko.outback@gmail.com',
  text: 'hello',
  date: '1605532975782',
  status: 'ANSWERED',
  answer: {
    admin: {
      _id: '5fa30305dd5c330b0c1292b3',
      email: 'admin2@gmail.com',
      firstName: 'Super аdmin',
      lastName: 'Super admin full'
    },
    text: 'yes',
    date: '1605533004875'
  }
};

export const mockDeletedQuestion = [
  {
    _id: '5fb27d2f671b230024b455a9'
  }
];

export const mockMoveQuestionToSpam = [
  {
    ...mockQuestion,
    status: 'SPAM'
  }
];

export const mockMoveQuestionToSpamPayload = {
  questionsToSpam: '5fb27d2f671b230024b455a9',
  adminId: '5fa30305dd5c330b0c1292b3'
};

export const mockAnswerEmailQuestionPayload = {
  questionId: '5fb27d2f671b230024b455a9',
  adminId: '5fa30305dd5c330b0c1292b3',
  text: 'yes'
};

export const emailQuestionsState = {
  list: [],
  pendingCount: 0,
  currentQuestion: null,
  loading: false,
  error: null,
  count: 1,
  pagination: {
    skip: 0,
    limit: 0
  }
};

export const id = '5fb27d2f671b230024b455a9';

export const emailQuestionsPayload = {
  filter: {
    emailQuestionStatus: 'ANSWERED'
  },
  skip: 0
};

export const pagination = {
  skip: currentPage * rowsPerPage,
  limit: 10
};

export const allQuestionsRes = {
  ...mockQuestions,
  pagination
};

export const filters = {
  search: '',
  dateFrom: '',
  dateTo: '',
  show: []
};

export const answer = 'OK';
export const count = 1;
