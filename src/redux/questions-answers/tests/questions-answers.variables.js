export const uaText = 'Питання та відповіді';
export const enText = 'Questions and answers';
export const questionsAnswers = {
  _id: '61b37288cb6ee034545ffcbf',
  question: [{ value: 'Питання' }, { value: 'Question' }],
  answer: [
    {
      value: uaText
    },
    {
      value: enText
    }
  ]
};
export const error = {
  message: 'NOT_FOUND'
};
export const questionsAnswersId = '61b37322cb6ee034545ffcc4';
export const questionsAnswersToRemoveId = '61b37322cb6ee034545ffcc4';
export const allQuestionsAnswers = [
  {
    _id: '61b37416cb6ee034545ffced',
    question: [{ value: 'Про товар' }, { value: 'About product' }],
    answer: [
      {
        value: `${uaText} про товар`
      },
      {
        value: `${enText} about product`
      }
    ]
  },
  {
    _id: '61b3747fcb6ee034545ffcf7',
    question: [{ value: 'Як увійти' }, { value: 'How to escape ' }],
    answer: [
      {
        value: `${uaText} товар в наявності`
      },
      {
        value: `${uaText} goods in sight`
      }
    ]
  }
];

export const questionsAnswersToCreate = {
  page: {
    question: [{ value: 'Питання' }, { value: 'Question' }],
    answer: [
      {
        value: uaText
      },
      {
        value: enText
      }
    ]
  }
};

export const questionsAnswersToUpdate = {
  id: '61b37288cb6ee034545ffcbf',
  page: {
    question: [
      {
        lang: 'ua',
        value: `${uaText} про товар оновлений`
      },
      {
        lang: 'en',
        value: `${enText} about product updated`
      }
    ]
  }
};

export const fakeQuestionsAnswers = {
  _id: '61b3747fcb6ee034545ffcf7',
  question: [
    {
      lang: 'ua',
      value: 'Пусто'
    },
    {
      lang: 'en',
      value: 'Fake'
    }
  ],
  answer: [
    {
      lang: 'ua',
      value: 'Без тексту'
    },
    {
      lang: 'en',
      value: 'Without text'
    }
  ]
};
