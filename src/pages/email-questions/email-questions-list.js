import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { Typography } from '@material-ui/core';
import ReactHtmlParser from 'react-html-parser';
import NavFilterByDate from '../../components/filter-search-sort/filter-by-date';
import NavSearch from '../../components/filter-search-sort/nav-search';
import NavClearFilters from '../../components/filter-search-sort/nav-clear-filters';
import { useStyles } from './email-questions-list.styles';
import { useCommonStyles } from '../common.styles';
import { config } from '../../configs';
import {
  getAllEmailQuestions,
  deleteEmailQuestions,
  setEmailQuestionLoading,
  answerToEmailQuestion
} from '../../redux/email-questions/email-questions.actions';

import useQuestionFilter from '../../hooks/filters/use-email-questions-filter';

import { closeDialog } from '../../redux/dialog-window/dialog-window.actions';
import useSuccessSnackbar from '../../utils/use-success-snackbar';
import TableContainerCollapsableRow from '../../containers/table-container-collapsable-row';
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
  const { list, loading, pagesCount, currentPage, questionsPerPage, filters } =
    useSelector(({ EmailQuestions }) => ({
      list: EmailQuestions.list,
      loading: EmailQuestions.loading,
      pagesCount: EmailQuestions.pagination.pagesCount,
      currentPage: EmailQuestions.pagination.currentPage,
      questionsPerPage: EmailQuestions.pagination.questionsPerPage,
      filters: EmailQuestions.filters
    }));

  const dispatch = useDispatch();
  const { filterByDateOptions, searchOptions, clearOptions, filterByStatus } =
    useQuestionFilter();
  const [filter, setFilter] = useState(['ALL']);
  const [questionsToOperate, setQuestionsToOperate] = useState([]);

  useEffect(() => {
    dispatch(
      getAllEmailQuestions({
        // filter: filter.slice(1),
        filter: {
          date: { dateFrom: filters.dateFrom, dateTo: filters.dateTo },
          filter: filterByStatus.filters.slice(1),
          search: filters.search
        },
        skip: currentPage * questionsPerPage
      })
    );
  }, [
    dispatch,
    currentPage,
    filters,
    filterByStatus.filters,
    questionsPerPage
  ]);

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

  // functionality concerning answering questions
  const [answerValue, setAnswerValue] = useState('');
  const [shouldValidate, setShouldValidate] = useState(false);

  const { question, adminId } = useSelector(({ EmailQuestions, Auth }) => ({
    adminId: Auth.adminId,
    question: EmailQuestions.currentQuestion
  }));

  // useEffect(() => {
  //   dispatch(getEmailQuestionById(id));
  // }, [dispatch, id]);

  const onAnsweringQuestion = (id) => {
    if (answerValue) {
      dispatch(
        answerToEmailQuestion({ questionId: id, adminId, text: answerValue })
      );
    } else {
      setShouldValidate(true);
    }
  };

  const filterChangeHandler = (id) => {
    console.log('ID ... filters filter', id, filterByStatus.filters);
    if (id === 'ALL') {
      filterByStatus.setFiltersFilter([id]);
      return;
    }

    const possibleFilter = filterByStatus.filters.find((item) => item === id);
    if (possibleFilter) {
      filterByStatus.setFiltersFilter(
        filterByStatus.filters.filter((item) => item !== id)
      );
    } else {
      filterByStatus.setFiltersFilter([...filterByStatus.filters, id]);
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
            <TableContainerCollapsableRow
              key={question._id}
              id={question._id}
              date={ReactHtmlParser(getTime(question.date, true))}
              senderName={question.senderName}
              email={question.email}
              qA={ReactHtmlParser(questionToShow + answerToShow)}
              status={labels.emailQuestionsLabels.ua[question.status]}
              showAvatar={false}
              showEdit={false}
              showCheckbox
              showCollapse
              collapsable
              shouldValidate
              answerValue={answerValue}
              setAnswerValue={setAnswerValue}
              checkboxChangeHandler={checkboxChangeHandler}
              deleteHandler={(e) => questionDeleteHandler(question._id, e)}
              onAnswer={onAnsweringQuestion}
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
          <NavFilterByDate filterByDateOptions={filterByDateOptions || {}} />
          <EmailQuestionsFilter
            filterItems={filterByStatus.filters}
            filterChangeHandler={filterChangeHandler}
          />

          <NavSearch searchOptions={searchOptions} />
          <NavClearFilters clearOptions={clearOptions} />
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
