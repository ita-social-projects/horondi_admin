import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Paper, TextField, Grid, Typography } from '@material-ui/core';
import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

import * as Yup from 'yup';
import useBusinessHandlers from '../../../utils/use-business-handlers';
import { useStyles } from './business-page-form.styles';
import { SaveButton, BackButton } from '../../buttons';
import LoadingBar from '../../loading-bar';

import {
  setCodeHandler,
  uaSetTitleHandler,
  uaSetTextHandler,
  enSetTitleHandler,
  enSetTextHandler,
  businessPageDispatchHandler,
  indexFinder
} from '../../../utils/business-page-form';

import {
  addBusinessPage,
  getBusinessPageById,
  updateBusinessPage
} from '../../../redux/business-pages/business-pages.actions';

import { useCommonStyles } from '../../../pages/common.styles';
import LanguagePanel from '../language-panel';
import { config } from '../../../configs';
import { checkInitialValue } from '../../../utils/check-initial-values';

const BusinessPageForm = ({ id, editMode }) => {
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
      ENTER_TITLE_ERROR_MESSAGE
    }
  } = config;

  const { pathToBusinessPages } = config.routes;

  const {
    createBusinessPage,
    uaSetText,
    enSetText,
    uaSetTitle,
    enSetTitle,
    uaText,
    enText,
    enTitle,
    uaTitle,
    code,
    setCode,
    files,
    setFiles
  } = useBusinessHandlers();

  useEffect(() => {
    id && dispatch(getBusinessPageById(id));
  }, [dispatch, id]);

  useEffect(() => {
    const isEditingReady = businessPage && editMode;

    setCode(setCodeHandler(isEditingReady, businessPage));
    uaSetTitle(uaSetTitleHandler(isEditingReady, businessPage));
    uaSetText(uaSetTextHandler(isEditingReady, businessPage));
    enSetTitle(enSetTitleHandler(isEditingReady, businessPage));
    enSetText(enSetTextHandler(isEditingReady, businessPage));
  }, [
    code,
    setCode,
    editMode,
    businessPage,
    uaSetText,
    uaSetTitle,
    enSetText,
    enSetTitle
  ]);

  const formSchema = Yup.object().shape({
    code: Yup.string().required(ENTER_CODE_ERROR_MESSAGE),
    uaTitle: Yup.string().required(ENTER_TITLE_ERROR_MESSAGE),
    enTitle: Yup.string().required(ENTER_TITLE_ERROR_MESSAGE)
  });

  const { values, errors, touched, handleSubmit, handleBlur, handleChange } =
    useFormik({
      initialValues: {
        code,
        uaTitle,
        enTitle,
        uaText,
        enText
      },
      validationSchema: formSchema,
      onSubmit: async () => {
        const uniqueFiles = files.filter((file, i) => {
          const { name, size } = file;
          return indexFinder(i, files, name, size);
        });

        const newUaText = values.uaText.replace(
          /src="data:image.*?"/g,
          'src=""'
        );
        const newEnText = values.enText.replace(
          /src="data:image.*?"/g,
          'src=""'
        );

        const page = createBusinessPage({
          ...values,
          uaText: newUaText,
          enText: newEnText
        });

        businessPageDispatchHandler(
          editMode,
          dispatch,
          updateBusinessPage,
          addBusinessPage,
          { id, page, files: uniqueFiles },
          { page, files: uniqueFiles }
        );
      }
    });

  useMemo(() => {
    values.code = code;
    values.uaTitle = uaTitle;
    values.enTitle = enTitle;
    values.uaText = uaText;
    values.enText = enText;
  }, [code, uaTitle, enTitle, uaText, enText]);

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
    inputs: businessPageLabel
  };

  const valueEquality = checkInitialValue(
    { code, enText, enTitle, uaText, uaTitle },
    values
  );

  const eventPreventHandler = (e) => {
    e.preventDefault();
  };

  return (
    <div className={common.container}>
      <div className={common.adminHeader}>
        <Typography
          variant='h1'
          className={common.materialTitle}
          data-cy='add-header'
        >
          {config.titles.businessPageTitles.addBusinessPageTitle}
        </Typography>
      </div>
      <form onSubmit={(e) => eventPreventHandler(e)}>
        <div>
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
        </div>
        <div className={classes.controlsBlock}>
          <BackButton initial={!valueEquality} pathBack={pathToBusinessPages} />
          <SaveButton
            className={classes.controlButton}
            id='save'
            type='submit'
            title='Зберегти'
            data-cy='save-btn'
            onClickHandler={handleSubmit}
            values={{
              code: values.code,
              uaTitle: values.uaTitle,
              enTitle: values.enTitle
            }}
            errors={errors}
          />
        </div>
      </form>
    </div>
  );
};

BusinessPageForm.propTypes = {
  editMode: PropTypes.bool,
  id: PropTypes.string
};

BusinessPageForm.defaultProps = {
  editMode: false,
  id: null
};

export default withRouter(BusinessPageForm);
