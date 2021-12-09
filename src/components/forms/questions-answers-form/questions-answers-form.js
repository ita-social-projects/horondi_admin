import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Typography } from '@material-ui/core';
import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

import useQuestionsAnswersHandlers from '../../../utils/use-questions-answers-handlers';
import { useStyles } from '../business-page-form/business-page-form.styles';
import { SaveButton, BackButton } from '../../buttons';
import LoadingBar from '../../loading-bar';

import {
  uaSetQuestionsHandler,
  uaSetAnswersHandler,
  enSetQuestionsHandler,
  enSetAnswersHandler,
  questionsAnswersDispatchHandler
} from '../../../utils/questions-answers-form';

import {
  addQuestionsAnswers,
  getQuestionsAnswersById,
  updateQuestionsAnswers
} from '../../../redux/questions-answers/questions-answers.actions';

import { useCommonStyles } from '../../../pages/common.styles';
import LanguagePanel from '../language-panel';
import { config } from '../../../configs';
import { useUnsavedChangesHandler } from '../../../hooks/form-dialog/use-unsaved-changes-handler';
import useChangedValuesChecker from '../../../hooks/forms/use-changed-values-checker';

const FormQNA = ({ id, editMode }) => {
  const dispatch = useDispatch();
  const { loading, questionsAnswers } = useSelector(({ QuestionsAnswers }) => ({
    loading: QuestionsAnswers.loading,
    questionsAnswers: QuestionsAnswers.currentPage
  }));

  const classes = useStyles();
  const common = useCommonStyles();
  const {
    labels: { questionaAnswersLabel },
    languages
  } = config;

  const { pathToBusinessPages } = config.routes;

  const {
    createQuestionsAnswers,
    uaSetAnswer,
    enSetAnswer,
    uaSetQuestion,
    enSetQuestion,
    uaAnswer,
    enAnswer,
    enQuestion,
    uaQuestion
  } = useQuestionsAnswersHandlers();

  useEffect(() => {
    id && dispatch(getQuestionsAnswersById(id));
  }, [dispatch, id]);

  useEffect(() => {
    const isEditingReady = !!questionsAnswers;

    uaSetQuestion(uaSetQuestionsHandler(isEditingReady, questionsAnswers));
    uaSetAnswer(uaSetAnswersHandler(isEditingReady, questionsAnswers));
    enSetQuestion(enSetQuestionsHandler(isEditingReady, questionsAnswers));
    enSetAnswer(enSetAnswersHandler(isEditingReady, questionsAnswers));
  }, [
    editMode,
    questionsAnswers,
    uaSetAnswer,
    uaSetQuestion,
    enSetAnswer,
    enSetQuestion
  ]);

  const {
    values,
    errors,
    touched,
    handleSubmit,
    handleBlur,
    handleChange,
    setFieldValue
  } = useFormik({
    initialValues: {
      uaQuestion,
      enQuestion,
      uaAnswer,
      enAnswer
    },
    onSubmit: async (data) => {
      const page = createQuestionsAnswers({
        ...data
      });
      questionsAnswersDispatchHandler(
        editMode,
        dispatch,
        updateQuestionsAnswers,
        addQuestionsAnswers,
        { id, page },
        page
      );
    }
  });

  const changed = useChangedValuesChecker(values, errors);
  const unblock = useUnsavedChangesHandler(values);

  useMemo(() => {
    values.uaQuestion = uaQuestion;
    values.enQuestion = enQuestion;
    values.uaAnswer = uaAnswer;
    values.enAnswer = enAnswer;
  }, [uaQuestion, enQuestion, uaAnswer, enAnswer]);

  if (loading) {
    return <LoadingBar />;
  }

  const inputOptions = {
    errors,
    touched,
    handleChange,
    handleBlur,
    values,
    inputs: questionaAnswersLabel,
    setFieldValue
  };

  const eventPreventHandler = (e) => {
    e.preventDefault();
  };

  return (
    <div className={classes.container}>
      <div className={classes.buttonContainer}>
        <Grid container spacing={2} className={classes.fixedButtons}>
          <Grid item className={classes.button}>
            <BackButton pathBack={pathToBusinessPages} />
          </Grid>
          <Grid item className={classes.button}>
            <SaveButton
              id='save'
              type='submit'
              title='Зберегти'
              data-cy='save-btn'
              onClickHandler={handleSubmit}
              unblockFunction={unblock}
              values={{}}
              errors={errors}
              {...(id ? { disabled: !changed } : {})}
            />
          </Grid>
        </Grid>
      </div>
      <div className={common.adminHeader}>
        <Typography
          variant='h1'
          className={common.materialTitle}
          data-cy='add-header'
        >
          {config.titles.questionsAnswersTitles.addQuestionsAnswersTitle}
        </Typography>
      </div>

      <form onSubmit={(e) => eventPreventHandler(e)}>
        {languages.map((lang) => (
          <LanguagePanel lang={lang} inputOptions={inputOptions} key={lang} />
        ))}
      </form>
    </div>
  );
};

FormQNA.propTypes = {
  editMode: PropTypes.bool,
  id: PropTypes.string
};

FormQNA.defaultProps = {
  editMode: false,
  id: null
};

export default withRouter(FormQNA);
