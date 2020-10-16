import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { Typography, TextField } from '@material-ui/core';
import { push } from 'connected-react-router';

import { useStyles } from './email-question-details.styles';
import { SaveButton, StandardButton } from '../../../components/buttons';
import LoadingBar from '../../../components/loading-bar';
import {
  getEmailQuestionById,
  answerToEmailQuestion
} from '../../../redux/email-questions/email-questions.actions';
import { config } from '../../../configs';
import getTime from '../../../utils/getTime';

const { emailQuestionStatuses } = config;

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
  }, [dispatch]);

  const onAnsweringQuestion = () => {
    if (answerValue) {
      dispatch(
        answerToEmailQuestion({ questionId: id, adminId, text: answerValue })
      );
      dispatch(push(config.routes.pathToEmailQuestions));
    } else {
      setShouldValidate(true);
    }
  };

  const customerRenderData = useMemo(
    () =>
      question
        ? [
          { title: 'Дата запитання:', value: getTime(question.date) },
          { title: 'Статус:', value: emailQuestionStatuses[question.status] },
          { title: 'Відправник:', value: question.senderName },
          { title: 'Email:', value: question.email },
          { title: 'Запитання:', value: question.text }
        ]
        : [],
    [question]
  );

  const adminRenderData = useMemo(
    () =>
      question && question.answer
        ? [
          { title: 'Дата відповіді:', value: getTime(question.answer.date) },
          {
            title: 'Адмін:',
            value: `${question.answer.admin.firstName} ${question.answer.admin.lastName}`
          },
          { title: 'Відповідь:', value: question.answer.text }
        ]
        : [],
    [question]
  );

  return (
    <div className={styles.container}>
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

              {question.status === 'PENDING' && (
                <TextField
                  id='filled-full-width'
                  label='Label'
                  style={{ margin: 8 }}
                  placeholder='Відповідь ...'
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
                      ? 'Введіть текст для відповіді'
                      : ''
                  }
                />
              )}
            </div>
          </div>
          <div className={styles.controlsBlock}>
            <Link to={config.routes.pathToEmailQuestions}>
              <StandardButton
                className={styles.controlButton}
                id='back'
                title='Назад'
                variant='outlined'
                onClickHandler={() => {}}
              />
            </Link>
            {question.status === 'PENDING' && (
              <SaveButton
                className={styles.controlButton}
                id='save'
                type='submit'
                title='Відповісти'
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
