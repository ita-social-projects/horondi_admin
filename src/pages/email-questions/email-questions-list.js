import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { Typography } from '@material-ui/core';
import ReactHtmlParser from 'react-html-parser';

import { useStyles } from './email-questions-list.styles';
import { useCommonStyles } from '../common.styles';
import { config } from '../../configs';
import {
  getAllEmailQuestions,
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
import { answerTextHandler } from '../../utils/email-question-list';

const { labels, titles, messages, tableHeadRowTitles } = config;
const { EMAIL_QUESTION_REMOVE_MESSAGE, EMAIL_QUESTION_SPAM_DETAILS } = messages;

const tableTitles = tableHeadRowTitles.emailQuestions;

const EmailQuestionsList = () => {
  const styles = useStyles();
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

  const questionClickHandler = (id, status) => {
    if (status === labels.emailQuestionsLabels.en.SPAM) {
      const handler = () => dispatch(closeDialog());

      openSuccessSnackbar(handler, EMAIL_QUESTION_SPAM_DETAILS, messages.ERROR);
    } else {
      dispatch(setEmailQuestionLoading(true));
      dispatch(push(`/email-answer/${id}`));
    }
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
      ? list.map((question) => {
        const { answer } = question;

        const questionToShow = `<b>Q:</b> ${question.text}`;
        const answerToShow = answerTextHandler(answer);

        return (
          <TableContainerRow
            key={question._id}
            id={question._id}
            senderName={question.senderName}
            email={question.email}
            qA={ReactHtmlParser(questionToShow + answerToShow)}
            date={ReactHtmlParser(getTime(question.date, true))}
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
          <TableContainerGenerator
            pagination
            count={pagesCount}
            tableTitles={tableTitles}
            tableItems={questions}
          />
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
