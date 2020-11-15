import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { Pagination } from '@material-ui/lab';
import { Typography } from '@material-ui/core';
import ReactHtmlParser from 'react-html-parser';

import { useStyles } from './email-questions-list.styles';
import { config } from '../../configs';
import {
  getAllEmailQuestions,
  setEmailQuestionsCurrentPage,
  deleteEmailQuestions,
  setEmailQuestionLoading
} from '../../redux/email-questions/email-questions.actions';

import { closeDialog } from '../../redux/dialog-window/dialog-window.actions';
import useSuccessSnackbar from '../../utils/use-success-snackbar';
import TableContainerRow from '../../containers/table-container-row';
import TableContainerGenerator from '../../containers/table-container-generator';
import LoadingBar from '../../components/loading-bar';
import getTime from '../../utils/getTime';
import EmailQuestionsFilter from './email-question-filter';
import EmailQuestionsOperationsButtons from './operations-buttons';

const { labels, titles, messages, tableHeadRowTitles, buttonTitles } = config;
const { EMAIL_QUESTION_REMOVE_MESSAGE, EMAIL_QUESTION_SPAM_DETAILS } = messages;

const tableTitles = tableHeadRowTitles.emailQuestions;

const EmailQuestionsList = () => {
  const styles = useStyles();
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

  const [filter, setFilter] = useState([]);
  const [questionsToOperate, setQuestionsToOperate] = useState([]);

  useEffect(() => {
    dispatch(
      getAllEmailQuestions({
        filter,
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
    openSuccessSnackbar(
      removeQuestion,
      EMAIL_QUESTION_REMOVE_MESSAGE,
      '',
      buttonTitles.REMOVE_EMAIL_QUESTION
    );
  };

  const changePaginationHandler = (e, value) =>
    dispatch(setEmailQuestionsCurrentPage(value));

  const questionClickHandler = (id, status) => {
    if (status === labels.emailQuestionsLabels.en.SPAM) {
      const handler = () => dispatch(closeDialog());

      openSuccessSnackbar(
        handler,
        messages.ERROR,
        EMAIL_QUESTION_SPAM_DETAILS,
        buttonTitles.UNDERSTAND,
        false
      );
    } else {
      dispatch(setEmailQuestionLoading(true));
      dispatch(push(`/email-answer/${id}`));
    }
  };

  const filterChangeHandler = (id) => {
    if (id === 'all') {
      setFilter([]);
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
      ? list.map((question) => {
        const { answer } = question;

        const questionToShow = `<b>Q:</b> ${question.text}`;
        const answerToShow =
            answer && answer.text ? `<br> <b>A:</b> ${answer.text}` : '';

        return (
          <TableContainerRow
            key={question._id}
            id={question._id}
            senderName={question.senderName}
            email={question.email}
            qA={ReactHtmlParser(questionToShow + answerToShow)}
            date={getTime(question.date)}
            status={labels.emailQuestionsLabels.ua[question.status]}
            showAvatar={false}
            showEdit={false}
            showCheckbox
            checkboxChangeHandler={checkboxChangeHandler}
            deleteHandler={(e) => questionDeleteHandler(question._id, e)}
            clickHandler={() =>
              questionClickHandler(question._id, question.status)
            }
          />
        );
      })
      : null;

  if (loading) {
    return <LoadingBar />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.tableNav}>
        <Typography variant='h1' className={styles.title}>
          {titles.emailQuestionsTitles.mainPageTitle}
        </Typography>
        <div className={styles.operations}>
          <EmailQuestionsFilter
            filterItems={filter}
            changeHandler={filterChangeHandler}
          />
          <EmailQuestionsOperationsButtons
            questionsToOperate={questionsToOperate}
            setQuestionsToOperate={setQuestionsToOperate}
          />
        </div>
      </div>
      <div className={styles.tableList}>
        {questions.length ? (
          <TableContainerGenerator
            tableTitles={tableTitles}
            tableItems={questions}
          />
        ) : (
          <h3 className={styles.emptyList}>{messages.EMPTY_LIST}</h3>
        )}
      </div>
      <div className={styles.paginationDiv}>
        <Pagination
          count={pagesCount}
          variant='outlined'
          shape='rounded'
          page={currentPage + 1}
          onChange={changePaginationHandler}
        />
      </div>
    </div>
  );
};

export default EmailQuestionsList;
