import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { Pagination } from '@material-ui/lab';
import { Button, Typography } from '@material-ui/core';

import { useStyles } from './email-questions-list.styles';
import { config } from '../../configs';
import {
  getAllEmailQuestions,
  setEmailQuestionsCurrentPage,
  deleteEmailQuestion,
  moveEmailQuestionsToSpam
} from '../../redux/email-questions/email-questions.actions';

import { closeDialog } from '../../redux/dialog-window/dialog-window.actions';
import useSuccessSnackbar from '../../utils/use-success-snackbar';
import TableContainerRow from '../../containers/table-container-row';
import TableContainerGenerator from '../../containers/table-container-generator';
import LoadingBar from '../../components/loading-bar';
import getTime from '../../utils/getTime';
import EmailQuestionsFilter from './email-question-filter';

const { emailQuestionStatuses } = config;
const { routes } = config.app;
const {
  EMAIL_QUESTION_REMOVE_MESSAGE,
  EMAIL_QUESTIONS_MOVE_TO_SPAM_MESSAGE
} = config.messages;

const { pathToEmailAnswer } = routes;
const tableTitles = config.tableHeadRowTitles.emailQuestions;

const EmailQuestionsList = () => {
  const styles = useStyles();
  const { openSuccessSnackbar } = useSuccessSnackbar();
  const {
    list,
    loading,
    pagesCount,
    currentPage,
    questionsPerPage,
    adminId
  } = useSelector(({ EmailQuestions, Auth }) => ({
    list: EmailQuestions.list,
    loading: EmailQuestions.loading,
    pagesCount: EmailQuestions.pagination.pagesCount,
    currentPage: EmailQuestions.pagination.currentPage,
    questionsPerPage: EmailQuestions.pagination.questionsPerPage,
    adminId: Auth.adminId
  }));

  const dispatch = useDispatch();

  const [filter, setFilter] = useState([]);
  const [questionsToSpam, setQuestionsToSpam] = useState([]);

  useEffect(() => {
    dispatch(
      getAllEmailQuestions({
        filter,
        skip: currentPage * questionsPerPage
      })
    );
  }, [dispatch, currentPage, filter]);

  const questionDeleteHandler = (id, e) => {
    e.stopPropagation();
    const removeBusinessPage = () => {
      dispatch(closeDialog());
      dispatch(deleteEmailQuestion(id));
    };
    openSuccessSnackbar(
      removeBusinessPage,
      EMAIL_QUESTION_REMOVE_MESSAGE,
      '',
      'Видалити запитання'
    );
  };

  const changePaginationHandler = (e, value) =>
    dispatch(setEmailQuestionsCurrentPage(value));

  const filterChangeHandler = (id) => {
    if (id === 'ALL') {
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

    const possibleQuestion = questionsToSpam.find((item) => item === id);
    if (possibleQuestion) {
      setQuestionsToSpam(questionsToSpam.filter((item) => item !== id));
    } else {
      setQuestionsToSpam([...questionsToSpam, id]);
    }
  };

  const makeQuestionsAsSpam = () => {
    const moveToSpam = () => {
      dispatch(closeDialog());
      dispatch(moveEmailQuestionsToSpam({ questionsToSpam, adminId }));
    };
    openSuccessSnackbar(
      moveToSpam,
      EMAIL_QUESTIONS_MOVE_TO_SPAM_MESSAGE,
      '',
      'У СПАМ'
    );
    console.log('questionsToSpam', questionsToSpam);
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
            qA={questionToShow + answerToShow}
            date={getTime(question.date)}
            status={emailQuestionStatuses[question.status]}
            showAvatar={false}
            showEdit={false}
            showCheckbox
            checkboxChangeHandler={checkboxChangeHandler}
            deleteHandler={(e) => questionDeleteHandler(question._id, e)}
            clickHandler={() =>
              dispatch(push(`/email-answer/${question._id}`))
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
        <Typography variant='h1' className={styles.contactsTitle}>
          Запитання & Відповіді
        </Typography>
        <div className={styles.operations}>
          <EmailQuestionsFilter
            filterItems={filter}
            changeHandler={filterChangeHandler}
          />
          <Button
            className={styles.spamBtn}
            variant='contained'
            onClick={makeQuestionsAsSpam}
            disabled={!questionsToSpam.length}
          >
            Перемістити у СПАМ
          </Button>
        </div>
      </div>
      <div>
        <TableContainerGenerator
          id='businessPageTable'
          tableTitles={tableTitles}
          tableItems={questions}
        />
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
