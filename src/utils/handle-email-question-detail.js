import React from 'react';
import { Typography } from '@material-ui/core';

import { emailQuestionsErrorMessages } from '../configs/error-messages';

export const handleEmailQuestionDetail = (renderData) => {
  renderData.map((item) => (
    <Typography key={item.title} variant='body1'>
      <span>{item.title}</span> {item.value}
    </Typography>
  ));
};

export const handleHelperText = (answerValue, shouldValidate) => !answerValue && shouldValidate
  ? emailQuestionsErrorMessages.ANSWER_INPUT_MESSAGE
  : '';
