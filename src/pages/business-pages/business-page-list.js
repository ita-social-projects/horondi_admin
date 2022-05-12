import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { Link } from 'react-router-dom';
import { Button, Typography } from '@material-ui/core';

import { useCommonStyles } from '../common.styles';
import { config } from '../../configs';
import { getAllBusinessPages } from '../../redux/business-pages/business-pages.actions';

import {
  getAllQuestionsAnswers,
  deleteQuestionsAnswers
} from '../../redux/questions-answers/questions-answers.actions';

import { closeDialog } from '../../redux/dialog-window/dialog-window.actions';
import useSuccessSnackbar from '../../utils/use-success-snackbar';
import TableContainerRow from '../../containers/table-container-row';
import TableContainerGenerator from '../../containers/table-container-generator';
import LoadingBar from '../../components/loading-bar';

const { REMOVE_QUESTIONS_ANSWERS } = config.messages;
const { CREATE_ANSWERS_QUESTIONS } = config.buttonTitles;
const { pathToAddQuestionsAnswers } = config.routes;
const questionsAnswersTableTitles = config.tableHeadRowTitles.questionsAnswers;

const BusinessPageList = () => {
  const commonStyles = useCommonStyles();

  const { openSuccessSnackbar } = useSuccessSnackbar();

  const { loading, listQuestions } = useSelector(
    ({ BusinessPages, QuestionsAnswers }) => ({
      loading: BusinessPages.loading,
      listQuestions: QuestionsAnswers.listQuestions.items
    })
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllQuestionsAnswers());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllBusinessPages());
  }, [dispatch]);

  const pageDeleteHandlerQuestionsAndAnswers = (id) => {
    const removeQuestionsAnswers = () => {
      dispatch(closeDialog());
      dispatch(deleteQuestionsAnswers(id));
    };
    openSuccessSnackbar(removeQuestionsAnswers, REMOVE_QUESTIONS_ANSWERS);
  };

  const questionsAnswers =
    listQuestions !== undefined
      ? listQuestions.map((item, index) => (
          <TableContainerRow
            key={item._id}
            id={item._id}
            index={index + 1}
            title={item.question[0].value}
            showAvatar={false}
            deleteHandler={() => pageDeleteHandlerQuestionsAndAnswers(item._id)}
            editHandler={() => {
              dispatch(
                push(`/questions-answers-list/questions-answers/${item._id}`)
              );
            }}
          />
        ))
      : null;

  if (loading) {
    return <LoadingBar />;
  }

  return (
    <div className={commonStyles.container}>
      <div className={commonStyles.adminHeader}>
        <Typography
          variant='h1'
          className={commonStyles.materialTitle}
          data-cy='main-header'
        >
          {config.titles.questionsAnswersTitles.mainQuestionsAnswersTitle}
        </Typography>
        <Button
          id='add-questions-answers'
          component={Link}
          to={pathToAddQuestionsAnswers}
          variant='contained'
          color='primary'
          data-cy='add-questions-answers'
        >
          {CREATE_ANSWERS_QUESTIONS}
        </Button>
      </div>
      <TableContainerGenerator
        id='questionsAnswersTable'
        tableTitles={questionsAnswersTableTitles}
        tableItems={questionsAnswers}
      />
    </div>
  );
};

export default BusinessPageList;
