import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Accordion, AccordionSummary, Typography } from '@material-ui/core';

import { useCommonStyles } from '../common.styles';
import { config } from '../../configs';
import {
  getAllEmailQuestions,
  deleteEmailQuestions
} from '../../redux/email-questions/email-questions.actions';

import { useStyles } from './email-questions-list.styles';
import { useStyles as us2 } from './email-questions-item/email-questions-item.styles';
import { closeDialog } from '../../redux/dialog-window/dialog-window.actions';
import useSuccessSnackbar from '../../utils/use-success-snackbar';
import LoadingBar from '../../components/loading-bar';
import EmailQuestionsFilter from './email-question-filter';
import EmailQuestionsOperationsButtons from './operations-buttons';
import EmailQuestionItem from './email-questions-item';

const { titles, messages } = config;
const { EMAIL_QUESTION_REMOVE_MESSAGE, EMAIL_QUESTION_SPAM_DETAILS } = messages;

const EmailQuestionsList = () => {
  const styles = useStyles();
  const classes = us2();
  const commonStyles = useCommonStyles();

  const { openSuccessSnackbar } = useSuccessSnackbar();
  const {
    list,
    loading,
    pagesCount,
    currentPage,
    questionsPerPage
  } = useSelector(({ EmailQuestions }) => ({
    list: EmailQuestions.list,
    loading: EmailQuestions.loading,
    pagesCount: EmailQuestions.pagination.pagesCount,
    currentPage: EmailQuestions.pagination.currentPage,
    questionsPerPage: EmailQuestions.pagination.questionsPerPage
  }));

  const dispatch = useDispatch();

  const [filter, setFilter] = useState(['ALL']);
  const [questionsToOperate, setQuestionsToOperate] = useState([]);

  useEffect(() => {
    dispatch(
      getAllEmailQuestions({
        filter: filter.slice(1),
        skip: currentPage * questionsPerPage
      })
    );
  }, [dispatch, currentPage, filter, questionsPerPage]);

  const questionDeleteHandler = (id, e) => {
    e.stopPropagation();
    const removeQuestion = () => {
      dispatch(closeDialog());
      dispatch(deleteEmailQuestions([id]));
    };
    openSuccessSnackbar(removeQuestion, EMAIL_QUESTION_REMOVE_MESSAGE);
  };

  const filterChangeHandler = (id) => {
    if (id === 'ALL') {
      setFilter([id]);
      return;
    }

    const possibleFilter = filter.find((item) => item === id);
    if (possibleFilter) {
      setFilter(filter.filter((item) => item !== id));
    } else {
      setFilter([...filter, id]);
    }
  };

  const checkboxChangeHandler = (e, id) => {
    e.stopPropagation();

    const possibleQuestion = questionsToOperate.find((item) => item === id);
    if (possibleQuestion) {
      setQuestionsToOperate(questionsToOperate.filter((item) => item !== id));
    } else {
      setQuestionsToOperate([...questionsToOperate, id]);
    }
  };

  const questions =
    list !== undefined
      ? list.map((question) => (
        <EmailQuestionItem
          key={question._id}
          question={question}
          checkboxChangeHandler={checkboxChangeHandler}
          deleteHandler={(e) => questionDeleteHandler(question._id, e)}
        />
      ))
      : null;

  if (loading) {
    return <LoadingBar />;
  }

  return (
    <div className={commonStyles.container}>
      <div
        className={commonStyles.adminHeader}
        style={{ flexDirection: 'column', alignItems: 'flex-start' }}
      >
        <Typography variant='h1' className={commonStyles.materialTitle}>
          {titles.emailQuestionsTitles.mainPageTitle}
        </Typography>
        <div className={styles.operations}>
          <EmailQuestionsFilter
            filterItems={filter}
            filterChangeHandler={filterChangeHandler}
          />
          <EmailQuestionsOperationsButtons
            questionsToOperate={questionsToOperate}
            setQuestionsToOperate={setQuestionsToOperate}
          />
        </div>
      </div>
      <div className={styles.tableList}>
        {questions?.length ? (
          <>
            <Accordion>
              <AccordionSummary>
                <div className={classes.column}>
                  <Typography className={classes.heading}>Номер</Typography>
                </div>
                <div className={classes.column}>
                  <Typography className={classes.heading}>Ігор</Typography>
                </div>
                <div className={classes.column}>
                  <Typography className={classes.heading}>
                    igor@gmail.com
                  </Typography>
                </div>
                <div className={classes.column}>
                  <Typography className={classes.heading}>
                    Q: Як купити новий товар
                  </Typography>
                </div>
                <div className={classes.column}>
                  <Typography className={classes.heading}>
                    17:17 09/09/21
                  </Typography>
                </div>
                <div className={classes.column}>
                  <Typography className={classes.heading}>
                    Очікує відповідь
                  </Typography>
                </div>
                <div className={classes.column}>
                  <Typography className={classes.heading}>Видалити</Typography>
                </div>
              </AccordionSummary>
            </Accordion>
            {questions}
          </>
        ) : (
          <Typography variant='h1' className={commonStyles.materialTitle}>
            {messages.EMPTY_LIST}
          </Typography>
        )}
      </div>
    </div>
  );
};

export default EmailQuestionsList;
