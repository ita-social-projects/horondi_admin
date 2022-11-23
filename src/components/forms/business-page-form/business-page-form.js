import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Paper, TextField, Grid, Typography } from '@material-ui/core';
import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

import * as Yup from 'yup';
import useBusinessHandlers from '../../../utils/use-business-handlers';
import { useStyles } from './business-page-form.styles';
import { SaveButton } from '../../buttons';
import LoadingBar from '../../loading-bar';

import {
  businessPageDispatchHandler,
  indexFinder
} from '../../../utils/business-page-form';

import {
  addBusinessPage,
  getBusinessPageByCode,
  updateBusinessPage
} from '../../../redux/business-pages/business-pages.actions';

import { useCommonStyles } from '../../../pages/common.styles';
import LanguagePanel from '../language-panel';
import { config } from '../../../configs';
import { useUnsavedChangesHandler } from '../../../hooks/form-dialog/use-unsaved-changes-handler';
import useChangedValuesChecker from '../../../hooks/forms/use-changed-values-checker';

const BusinessPageForm = ({ editMode, codePath }) => {
  const dispatch = useDispatch();
  const { loading, businessPage } = useSelector(({ BusinessPages }) => ({
    loading: BusinessPages.loading,
    businessPage: BusinessPages.currentPage
  }));

  const classes = useStyles();
  const common = useCommonStyles();
  const {
    labels: { businessPageLabel },
    languages,
    businessPageErrorMessages: {
      ENTER_CODE_ERROR_MESSAGE,
      ENTER_TITLE_ERROR_MESSAGE,
      ENTER_TEXT_ERROR_MESSAGE,
      MIN_TEXT_LENGTH_MESSAGE
    },
    commonErrorMessages: {
      UA_NAME_MESSAGE,
      EN_NAME_MESSAGE,
      MIN_LENGTH_MESSAGE
    }
  } = config;

  const {
    createBusinessPage,
    createBusinessTextTranslationFields,

    files,
    setFiles
  } = useBusinessHandlers();

  useEffect(() => {
    codePath && dispatch(getBusinessPageByCode(codePath));
  }, [dispatch, codePath]);

  const formSchema = Yup.object().shape({
    code: Yup.string()
      .matches(config.formRegExp.pageCode, ENTER_CODE_ERROR_MESSAGE)
      .required(ENTER_CODE_ERROR_MESSAGE),
    uaTitle: Yup.string()
      .min(2, MIN_LENGTH_MESSAGE)
      .matches(config.formRegExp.uaNameCreation, EN_NAME_MESSAGE)
      .required(ENTER_TITLE_ERROR_MESSAGE),
    enTitle: Yup.string()
      .min(2, MIN_LENGTH_MESSAGE)
      .matches(config.formRegExp.enNameCreation, UA_NAME_MESSAGE)
      .required(ENTER_TITLE_ERROR_MESSAGE),
    enText: Yup.string()
      .min(17, MIN_TEXT_LENGTH_MESSAGE)
      .matches(config.formRegExp.enDescription, EN_NAME_MESSAGE)
      .required(ENTER_TEXT_ERROR_MESSAGE),
    uaText: Yup.string()
      .min(17, MIN_TEXT_LENGTH_MESSAGE)
      .required(ENTER_TEXT_ERROR_MESSAGE)
  });

  const initial = useMemo(
    () => ({
      code: businessPage ? businessPage.code : '',
      uaTitle: businessPage ? businessPage.translations.ua.title : '',
      enTitle: businessPage ? businessPage.translations.en.title : '',
      uaText: businessPage ? businessPage.translations.ua.text : '',
      enText: businessPage ? businessPage.translations.en.text : ''
    }),
    [businessPage]
  );

  const {
    values,
    errors,
    touched,
    handleSubmit,
    handleBlur,
    handleChange,
    setFieldValue
  } = useFormik({
    initialValues: initial,
    validationSchema: formSchema,
    enableReinitialize: true,
    onSubmit: async () => {
      const uniqueFiles = files.filter((file, i) => {
        const { name, size } = file;
        return indexFinder(i, files, name, size);
      });

      const newUaText = values.uaText.replace(/src="data:image.*?"/g, 'src=""');
      const newEnText = values.enText.replace(/src="data:image.*?"/g, 'src=""');

      const page = createBusinessPage(values);

      const businessTextTranslationFields = createBusinessTextTranslationFields(
        {
          ...values,
          uaText: newUaText,
          enText: newEnText
        }
      );

      businessPageDispatchHandler(
        editMode,
        dispatch,
        updateBusinessPage,
        addBusinessPage,
        {
          id: businessPage._id,
          page,
          businessTextTranslationFields,
          files: uniqueFiles
        },
        { page, files: uniqueFiles }
      );
    }
  });

  const changed = useChangedValuesChecker(values, errors);
  const unblock = useUnsavedChangesHandler(values);

  if (loading) {
    return <LoadingBar />;
  }

  businessPageLabel[1].setFiles = setFiles;

  const inputOptions = {
    errors,
    touched,
    handleChange,
    handleBlur,
    values,
    inputs: businessPageLabel,
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
            <SaveButton
              id='save'
              type='submit'
              title='Зберегти'
              data-cy='save-btn'
              onClickHandler={handleSubmit}
              unblockFunction={unblock}
              values={{
                code: values.code,
                uaTitle: values.uaTitle,
                enTitle: values.enTitle
              }}
              errors={errors}
              {...(businessPage?._id ? { disabled: !changed } : {})}
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
          {config.titles.businessPageTitles.editBusinessPageTitle}
        </Typography>
      </div>

      <form onSubmit={(e) => eventPreventHandler(e)}>
        <Grid item xs={12}>
          <Paper className={classes.businessPageForm}>
            <TextField
              id='code'
              className={classes.textField}
              variant='outlined'
              label='Код сторінки'
              value={values.code}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.code && !!errors.code}
              data-cy='page-code'
            />
          </Paper>
          {touched.code && errors.code && (
            <div data-cy='code-error' className={classes.errorMessage}>
              {errors.code}
            </div>
          )}
        </Grid>
        {languages.map((lang) => (
          <LanguagePanel lang={lang} inputOptions={inputOptions} key={lang} />
        ))}
      </form>
    </div>
  );
};

BusinessPageForm.propTypes = {
  editMode: PropTypes.bool,
  id: PropTypes.string,
  codePath: PropTypes.string
};

BusinessPageForm.defaultProps = {
  editMode: false,
  id: null,
  codePath: null
};

export default withRouter(BusinessPageForm);
