import { useState } from 'react';
import { config } from '../configs';

const { languages } = config;

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

export default createQuestionsAnswers;
