import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';

import { useStyles } from './email-questions-list.styles';
import { config } from '../../configs';
import {
  getAllEmailQuestions,
  deleteEmailQuestion
} from '../../redux/email-questions/email-questions.actions';

import { closeDialog } from '../../redux/dialog-window/dialog-window.actions';
import useSuccessSnackbar from '../../utils/use-success-snackbar';
import TableContainerRow from '../../containers/table-container-row';
import TableContainerGenerator from '../../containers/table-container-generator';
import LoadingBar from '../../components/loading-bar';
import getTime from '../../utils/getTime';
import { loginAdmin } from '../../redux/auth/auth.operations';

const { emailQuestionStatuses } = config;
const { routes } = config.app;
const { EMAIL_QUESTION_REMOVE_MESSAGE } = config.messages;

const { pathToEmailAnswer } = routes;
const tableTitles = config.tableHeadRowTitles.emailQuestions;

const EmailQuestionsList = () => {
  const classes = useStyles();
  const { openSuccessSnackbar } = useSuccessSnackbar();
  const { list, loading, questionsCount } = useSelector(
    ({ EmailQuestions }) => ({
      list: EmailQuestions.list,
      loading: EmailQuestions.loading,
      questionsCount: EmailQuestions.questionsCount
    })
  );

  const dispatch = useDispatch();

  const [filter, setFilter] = useState([]);
  const [skip, setSkio] = useState(0);

  useEffect(() => {
    dispatch(getAllEmailQuestions({ filter, skip }));
  }, [dispatch]);

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
    <div className={classes.container}>
      <div className={classes.tableNav}>
        {/*  <Button
          id='add-business-page'
          component={Link}
          to={pathToAddBusinessPage}
          variant='contained'
          color='primary'
        >
          {CREATE_BUSINESS_PAGE}
        </Button> */}
      </div>
      <div>
        <TableContainerGenerator
          id='businessPageTable'
          tableTitles={tableTitles}
          tableItems={questions}
        />
      </div>
    </div>
  );
};

export default EmailQuestionsList;
