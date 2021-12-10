import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { Link } from 'react-router-dom';
import { Button, Typography } from '@material-ui/core';

import { useCommonStyles } from '../common.styles';
import { config } from '../../configs';
import {
  getAllBusinessPages,
  deleteBusinessPage
} from '../../redux/business-pages/business-pages.actions';

import {
  getAllQuestionsAnswers,
  deleteQuestionsAnswers
} from '../../redux/questions-answers/questions-answers.actions';

import { closeDialog } from '../../redux/dialog-window/dialog-window.actions';
import useSuccessSnackbar from '../../utils/use-success-snackbar';
import TableContainerRow from '../../containers/table-container-row';
import TableContainerGenerator from '../../containers/table-container-generator';
import LoadingBar from '../../components/loading-bar';

const { REMOVE_BUSINESS_PAGE } = config.messages;
const { REMOVE_QUESTIONS_ANSWERS } = config.messages;
const { CREATE_BUSINESS_PAGE } = config.buttonTitles;
const { CREATE_ANSWERS_QUESTIONS } = config.buttonTitles;

const { pathToAddBusinessPage } = config.routes;
const { pathToAddQuestionsAnswers } = config.routes;
const tableTitles = config.tableHeadRowTitles.businessPages;
const questionsAnswersTableTitles = config.tableHeadRowTitles.questionsAnswers;

const BusinessPageList = () => {
  const commonStyles = useCommonStyles();

  const { openSuccessSnackbar } = useSuccessSnackbar();

  const { list, loading, listQuestions } = useSelector(
    ({ BusinessPages, QuestionsAnswers }) => ({
      list: BusinessPages.list,
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

  const pageDeleteHandler = (id) => {
    const removeBusinessPage = () => {
      dispatch(closeDialog());
      dispatch(deleteBusinessPage(id));
    };
    openSuccessSnackbar(removeBusinessPage, REMOVE_BUSINESS_PAGE);
  };

  const pageDeleteHandlerQuestionsAndAnswers = (id) => {
    const removeQuestionsAnswers = () => {
      dispatch(closeDialog());
      dispatch(deleteQuestionsAnswers(id));
    };
    openSuccessSnackbar(removeQuestionsAnswers, REMOVE_QUESTIONS_ANSWERS);
  };

  const businessPages =
    list !== undefined
      ? list.map((page, index) => (
          <TableContainerRow
            key={page._id}
            id={page._id}
            index={index + 1}
            code={page.code}
            title={page.title[0].value}
            showAvatar={false}
            deleteHandler={() => pageDeleteHandler(page._id)}
            editHandler={() => {
              dispatch(push(`/business-pages/${page._id}`));
            }}
          />
        ))
      : null;

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
              dispatch(push(`/business-pages/questions-answers/${item._id}`));
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
          {config.titles.businessPageTitles.mainPageTitle}
        </Typography>
        <Button
          id='add-business-page'
          component={Link}
          to={pathToAddBusinessPage}
          variant='contained'
          color='primary'
          data-cy='add-business-page'
        >
          {CREATE_BUSINESS_PAGE}
        </Button>
      </div>
      <TableContainerGenerator
        id='businessPageTable'
        tableTitles={tableTitles}
        tableItems={businessPages}
      />
      <hr />
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
