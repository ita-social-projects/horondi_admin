const mockBusinessPage = (mockLoading) => ({
  BusinessPages: {
    list: [
      {
        _id: '0c3c7954dd35de268bed4fe8',
        code: 0,
        title: [
          {
            lang: 'ua',
            value: 'Пустишка'
          },
          {
            lang: 'en',
            value: 'Fake'
          }
        ]
      }
    ],
    loading: mockLoading
  },
  QuestionsAnswers: {
    listQuestions: {
      items: [
        {
          _id: '0c3c7954dd35de268bed4fe8',
          question: [
            {
              lang: 'ua',
              value: 'Пустишка'
            },
            {
              lang: 'en',
              value: 'Fake'
            }
          ],
          answer: [
            {
              lang: 'ua',
              value: 'Пустишка'
            },
            {
              lang: 'en',
              value: 'Fake'
            }
          ]
        }
      ]
    }
  },
  Table: {
    pagination: {
      currentPage: 0,
      rowsPerPage: 10
    },
    itemsCount: 1
  }
});

export default mockBusinessPage;
