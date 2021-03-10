import React from 'react';
import { Typography } from '@material-ui/core';

import { emailQuestionsErrorMessages } from '../configs/error-messages';
import { formConstants } from '../configs';

const _ = require('lodash');

const { notRequired } = formConstants;

export const handleEmailQuestionDetail = (renderData) => {
  _.map(renderData, (item) => (
    <Typography key={item.title} variant='body1'>
      <span>{item.title}</span> {item.value}
    </Typography>
  ));
};

export const handleHelperText = (answerValue, shouldValidate) =>
  !answerValue && shouldValidate
    ? emailQuestionsErrorMessages.ANSWER_INPUT_MESSAGE
    : notRequired;
