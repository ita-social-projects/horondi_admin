import { useState } from 'react';
import { config } from '../configs';

const { languages } = config;

const useQuestionsAnswersHandlers = () => {
  const [uaQuestion, uaSetQuestion] = useState('');
  const [uaAnswer, uaSetAnswer] = useState('');

  const [enQuestion, enSetQuestion] = useState('');
  const [enAnswer, enSetAnswer] = useState('');

  const createQuestionsAnswers = (values) => ({
    question: [
      {
        lang: languages[0],
        value: values.uaQuestion
      },
      {
        lang: languages[1],
        value: values.enQuestion
      }
    ],
    answer: [
      {
        lang: languages[0],
        value: values.uaAnswer
      },
      {
        lang: languages[1],
        value: values.enAnswer
      }
    ]
  });

  return {
    uaAnswer,
    uaQuestion,
    enAnswer,
    enQuestion,
    uaSetAnswer,
    uaSetQuestion,
    enSetAnswer,
    enSetQuestion,
    languages,
    createQuestionsAnswers
  };
};

export default useQuestionsAnswersHandlers;
