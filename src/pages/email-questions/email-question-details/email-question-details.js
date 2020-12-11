import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Typography, TextField } from '@material-ui/core';
import { push } from 'connected-react-router';

import { useStyles } from './email-question-details.styles';
import { BackButton, SaveButton } from '../../../components/buttons';
import LoadingBar from '../../../components/loading-bar';
import {
  getEmailQuestionById,
  answerToEmailQuestion
} from '../../../redux/email-questions/email-questions.actions';
import { config } from '../../../configs';
import getTime from '../../../utils/getTime';
import { emailQuestionsErrorMessages } from '../../../configs/error-messages';
import buttonTitles from '../../../configs/button-titles';

const { labels, titles, detailTitles, routes } = config;

const EmailQuestionDetails = ({ id }) => {
  const dispatch = useDispatch();
  const { question, adminId } = useSelector(({ EmailQuestions, Auth }) => ({
    adminId: Auth.adminId,
    question: EmailQuestions.currentQuestion
  }));

  const [answerValue, setAnswerValue] = useState('');
  const [shouldValidate, setShouldValidate] = useState(false);

  const styles = useStyles();

  useEffect(() => {
    dispatch(getEmailQuestionById(id));
  }, [dispatch, id]);

  const onAnsweringQuestion = () => {
    if (answerValue) {
      dispatch(
        answerToEmailQuestion({ questionId: id, adminId, text: answerValue })
      );
      dispatch(push(routes.pathToEmailQuestions));
    } else {
      setShouldValidate(true);
    }
  };

  const customerRenderData = useMemo(
    () =>
      question
        ? [
          {
            title: detailTitles.emailQuestions.customer.date,
            value: getTime(question.date)
          },
          {
            title: detailTitles.emailQuestions.customer.status,
            value: labels.emailQuestionsLabels.ua[question.status]
          },
          {
            title: detailTitles.emailQuestions.customer.sender,
            value: question.senderName
          },
          {
            title: detailTitles.emailQuestions.customer.email,
            value: question.email
          },
          {
            title: detailTitles.emailQuestions.customer.question,
            value: question.text
          }
        ]
        : [],
    [question]
  );

  const adminRenderData = useMemo(
    () =>
      question && question.answer
        ? [
          {
            title: detailTitles.emailQuestions.admin.date,
            value: getTime(question.answer.date)
          },
          {
            title: detailTitles.emailQuestions.admin.admin,
            value: `${question.answer.admin.firstName} ${question.answer.admin.lastName}`
          },
          {
            title: detailTitles.emailQuestions.admin.answer,
            value: question.answer.text
          }
        ]
        : [],
    [question]
  );

  return (
    <div className={styles.container}>
      <Typography variant='h2' className={styles.title}>
        {titles.emailQuestionsTitles.detailPageTitle}
      </Typography>
      {question ? (
        <>
          <div className={styles.data}>
            <div className={styles.customer}>
              {customerRenderData.map((item) => (
                <Typography key={item.title} variant='body1'>
                  <span>{item.title}</span> {item.value}
                </Typography>
              ))}
            </div>
            <div className={styles.admin}>
              {adminRenderData.map((item) => (
                <Typography key={item.title} variant='body1'>
                  <span>{item.title}</span> {item.value}
                </Typography>
              ))}

              {question.status === labels.emailQuestionsLabels.en.PENDING && (
                <TextField
                  id='filled-full-width'
                  label='Label'
                  style={{ margin: 8 }}
                  placeholder={labels.emailQuestionsLabels.placeholder}
                  fullWidth
                  multiline
                  rows={10}
                  margin='normal'
                  InputLabelProps={{
                    shrink: true
                  }}
                  value={answerValue}
                  onChange={({ target: { value } }) => setAnswerValue(value)}
                  variant='filled'
                  error={!answerValue && shouldValidate}
                  helperText={
                    !answerValue && shouldValidate
                      ? emailQuestionsErrorMessages.ANSWER_INPUT_MESSAGE
                      : ''
                  }
                />
              )}
            </div>
          </div>
          <div className={styles.controlsBlock}>
            <BackButton />
            {question.status === labels.emailQuestionsLabels.en.PENDING && (
              <SaveButton
                className={styles.controlButton}
                id='save'
                type='submit'
                title={buttonTitles.ANSWER}
                onClickHandler={onAnsweringQuestion}
              />
            )}
          </div>
        </>
      ) : (
        <LoadingBar />
      )}
    </div>
  );
};

EmailQuestionDetails.propTypes = {
  id: PropTypes.string
};

EmailQuestionDetails.defaultProps = {
  id: null
};

export default withRouter(EmailQuestionDetails);
