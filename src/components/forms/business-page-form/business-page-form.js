import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Paper,
  TextField,
  Grid,
  Tab,
  Tabs,
  Typography
} from '@material-ui/core';
import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

import * as Yup from 'yup';
import useBusinessHandlers from '../../../utils/use-business-handlers';
import Editor from '../../editor';
import { useStyles } from './business-page-form.styles';
import { SaveButton, BackButton } from '../../buttons';
import TabPanel from '../../tab-panel';
import LoadingBar from '../../loading-bar';

import {
  setCodeHandler,
  uaSetTitleHandler,
  uaSetTextHandler,
  enSetTitleHandler,
  enSetTextHandler,
  helperTextHandler,
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

const BusinessPageForm = ({ id, editMode }) => {
  const dispatch = useDispatch();
  const { loading, businessPage } = useSelector(({ BusinessPages }) => ({
    loading: BusinessPages.loading,
    businessPage: BusinessPages.currentPage
  }));
  const [shouldValidate, setShouldValidate] = useState(false);

  const classes = useStyles();
  const common = useCommonStyles();
  const {
    labels: { businessPageLabel },
    languages
  } = config;
  // const labels = config.labels.businessPage;

  const {
    tabsValue,
    handleTabsChange,
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
    // languages
  } = useBusinessHandlers();

  const { editorField } = config.formRegExp;

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

  const checkValidation = (values) => {
    const requiredValidationArray = [...Object.values(values)];
    const editorFields = [uaText, enText];

    return (
      requiredValidationArray.every((field) => field.trim()) &&
      editorFields.every((field) => !editorField.test(field) || field)
    );
  };
  console.log(enText);
  const isEnTextAndValidate =
    (editorField.test(enText) || !enText) && shouldValidate;

  const enterTitleMessage = 'Введіть заголовок';
  const enterUniqueIdMessage = 'Введіть унікальний ідентифікатор для сторінки';
  const enterTextMessage = 'Введіть текст для сторінки';
  // const enTitleErrorValue = labels[0].errorLabel[tabsValue].value;

  const formSchema = Yup.object().shape({
    code: Yup.string().required(enterUniqueIdMessage),
    uaTitle: Yup.string().required(enterTitleMessage),
    enTitle: Yup.string().required(enterTitleMessage),
    uaText: Yup.string().required(enterTitleMessage),
    enText: Yup.string().required(enterTitleMessage)
  });

  const formik = useFormik({
    initialValues: {
      code,
      uaTitle,
      enTitle,
      uaText,
      enText
    },
    validationSchema: formSchema,
    onSubmit: async (values) => {
      if (!checkValidation(values)) {
        setShouldValidate(true);
        return;
      }

      const uniqueFiles = files.filter((file, i) => {
        const { name, size } = file;
        return indexFinder(i, files, name, size);
      });

      const newUaText = values.uaText.replace(/src="data:image.*?"/g, 'src=""');
      const newEnText = values.enText.replace(/src="data:image.*?"/g, 'src=""');

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
    formik.values.code = code;
    formik.values.uaTitle = uaTitle;
    formik.values.enTitle = enTitle;
    formik.values.enText = enText;
    formik.values.uaText = uaText;
  }, [code, uaTitle, enTitle, enText, uaText]);

  const languageTabs = languages.map((lang) => (
    <Tab label={lang} key={lang} data-cy={lang} />
  ));

  if (loading) {
    return <LoadingBar />;
  }

  // const isEnTitleAndValidate = !formik.values.enTitle && shouldValidate;
  // const isUaTitleAndValidate = !formik.values.uaTitle && shouldValidate;
  const isCodeAndValidate = !formik.values.code && shouldValidate;

  businessPageLabel[1].setFiles = setFiles;

  console.log(formik.errors);

  const inputOptions = {
    errors: formik.errors,
    touched: formik.touched,
    handleChange: formik.handleChange,
    values: formik.values,
    inputs: businessPageLabel
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
      <form onSubmit={formik.handleSubmit}>
        <div>
          <Grid item xs={12}>
            <Paper className={classes.businessPageForm}>
              <TextField
                id='code'
                className={classes.textField}
                variant='outlined'
                label='Код сторінки'
                value={formik.values.code}
                onChange={formik.handleChange}
                error={isCodeAndValidate}
                helperText={helperTextHandler(
                  isCodeAndValidate,
                  enterUniqueIdMessage
                )}
                data-cy='page-code'
              />
            </Paper>
          </Grid>
          <Paper className={classes.tabField}>
            {languages.map((lang) => (
              <LanguagePanel
                lang={lang}
                inputOptions={inputOptions}
                key={lang}
              />
            ))}
            {isEnTextAndValidate && (
              <div className={classes.errorMessage} data-cy='editor-error'>
                {enterTextMessage}
              </div>
            )}
            {/* <Tabs */}
            {/*  className={common.tabs} */}
            {/*  value={tabsValue} */}
            {/*  onChange={handleTabsChange} */}
            {/*  aria-label='simple tabs example' */}
            {/* > */}
            {/*  {languageTabs} */}
            {/* </Tabs> */}
            {/* <TabPanel value={tabsValue} index={0}> */}
            {/*  <Paper className={classes.businessPageForm}> */}
            {/*    <TextField */}
            {/*      id='uaTitle' */}
            {/*      className={classes.textField} */}
            {/*      variant='outlined' */}
            {/*      label={config.labels.lableTitle.ua} */}
            {/*      multiline */}
            {/*      value={formik.values.uaTitle} */}
            {/*      onChange={formik.handleChange} */}
            {/*      error={isUaTitleAndValidate} */}
            {/*      helperText={helperTextHandler( */}
            {/*        isUaTitleAndValidate, */}
            {/*        enterTitleMessage */}
            {/*      )} */}
            {/*      data-cy='page-header-ua' */}
            {/*    /> */}
            {/*    <Editor */}
            {/*      value={uaText} */}
            {/*      placeholder='Текст' */}
            {/*      onEditorChange={(value) => uaSetText(value)} */}
            {/*      setFiles={setFiles} */}
            {/*      data-cy='page-editor' */}
            {/*    /> */}
            {/*    {(editorField.test(uaText) || !uaText) && shouldValidate && ( */}
            {/*      <div className={classes.errorMessage} data-cy='editor-error'> */}
            {/*        Введіть текст для сторінки */}
            {/*      </div> */}
            {/*    )} */}
            {/*  </Paper> */}
            {/* </TabPanel> */}
            {/* <TabPanel value={tabsValue} index={1}> */}
            {/*  <Paper className={classes.businessPageForm}> */}
            {/*    <TextField */}
            {/*      id='enTitle' */}
            {/*      className={classes.textField} */}
            {/*      variant='outlined' */}
            {/*      label={config.labels.lableTitle.en} */}
            {/*      multiline */}
            {/*      value={formik.values.enTitle} */}
            {/*      onChange={formik.handleChange} */}
            {/*      error={isEnTitleAndValidate} */}
            {/*      helperText={helperTextHandler( */}
            {/*        isEnTitleAndValidate, */}
            {/*        enTitleErrorValue */}
            {/*      )} */}
            {/*      data-cy='page-header-en' */}
            {/*    /> */}
            {/*    <Editor */}
            {/*      value={enText} */}
            {/*      placeholder={labels[1].label[tabsValue].value} */}
            {/*      onEditorChange={(value) => enSetText(value)} */}
            {/*      setFiles={setFiles} */}
            {/*    /> */}
            {/*    {isEnTextAndValidate && ( */}
            {/*      <div className={classes.errorMessage} data-cy='editor-error'> */}
            {/*        {labels[1].errorLabel[tabsValue].value} */}
            {/*      </div> */}
            {/*    )} */}
            {/*  </Paper> */}
            {/* </TabPanel> */}
          </Paper>
        </div>
        <div className={classes.controlsBlock}>
          <BackButton />
          <SaveButton
            className={classes.controlButton}
            id='save'
            type='submit'
            title='Зберегти'
            data-cy='save-btn'
            values={formik.values}
            errors={formik.errors}
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
