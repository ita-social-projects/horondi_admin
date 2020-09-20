import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Paper, TextField, Grid, Tab, AppBar, Tabs } from '@material-ui/core';
import { useFormik } from 'formik';
import PropTypes from 'prop-types';

import useBusinessHandlers from '../../../utils/use-business-handlers';
import Editor from '../../../components/editor';
import { useStyles } from './business-page-form.styles';
import { SaveButton } from '../../../components/buttons';
import TabPanel from '../../../components/tab-panel';
import LoadingBar from '../../../components/loading-bar';

import {
  addBusinessPage,
  updateBusinessPage
} from '../../../redux/business-pages/business-pages.actions';

const BusinessPageForm = ({ editMode, id }) => {
  const dispatch = useDispatch();
  const { loading, businessPage } = useSelector(({ BusinessPages }) => ({
    loading: BusinessPages.loading,
    businessPage: BusinessPages.currentPage
  }));
  const [shouldValidate, setShouldValidate] = useState(false);

  const classes = useStyles();

  const {
    tabsValue,
    handleTabsChange,
    createBusinessPage,
    ukSetText,
    enSetText,
    ukSetTitle,
    enSetTitle,
    ukText,
    enText,
    enTitle,
    ukTitle,
    code,
    setCode,
    files,
    setFiles,
    languages
  } = useBusinessHandlers();

  useEffect(() => {
    if (businessPage !== null) {
      setCode(businessPage.code);

      ukSetText(businessPage.text[0].value || '');
      ukSetTitle(businessPage.title[0].value || '');

      enSetText(businessPage.text[1].value || '');
      enSetTitle(businessPage.title[1].value || '');
    }
  }, [
    code,
    businessPage,
    ukSetText,
    ukSetTitle,
    enSetText,
    enSetTitle,
    setCode
  ]);

  const checkValidation = () => {
    const requiredValidationArray = [code, ukTitle, enTitle, ukText, enText];
    return requiredValidationArray.every((field) => field.trim());
  };

  const formik = useFormik({
    initialValues: {
      code,
      ukText,
      ukTitle,
      enTitle,
      enText
    },
    onSubmit: (values) => {
      if (!checkValidation()) {
        setShouldValidate(true);
        return;
      }

      const page = createBusinessPage({ ...values, enText, ukText });

      editMode
        ? dispatch(updateBusinessPage({ id, page }))
        : dispatch(addBusinessPage(page));
    }
  });

  const languageTabs = languages.map((lang) => <Tab label={lang} key={lang} />);

  if (loading) {
    return <LoadingBar />;
  }

  return (
    <div className={classes.container}>
      <form onSubmit={formik.handleSubmit}>
        <div className={classes.controlsBlock}>
          <SaveButton
            className={classes.saveButton}
            id='save'
            type='submit'
            title='Зберегти'
          />
        </div>
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
                required
                error={!code && shouldValidate}
                helperText='Це поле є обов‘язковим'
              />
            </Paper>
          </Grid>
          <AppBar position='static'>
            <Tabs
              className={classes.tabs}
              value={tabsValue}
              onChange={handleTabsChange}
              aria-label='simple tabs example'
            >
              {languageTabs}
            </Tabs>
          </AppBar>
          <TabPanel value={tabsValue} index={0}>
            <Paper className={classes.businessPageAdd}>
              <TextField
                id='ukTitle'
                className={classes.textField}
                variant='outlined'
                label='Заголовок uk'
                multiline
                value={formik.values.ukTitle}
                onChange={formik.handleChange}
                required
                error={!ukTitle && shouldValidate}
                helperText='Це поле є обов‘язковим'
              />
              <Editor
                value={ukText}
                placeholder='Текст'
                onEditorChange={(value) => ukSetText(value)}
                files={files}
                setFiles={setFiles}
              />
            </Paper>
          </TabPanel>
          <TabPanel value={tabsValue} index={1}>
            <Paper className={classes.businessPageAdd}>
              <TextField
                id='enTitle'
                className={classes.textField}
                variant='outlined'
                label='Заголовок en'
                multiline
                value={formik.values.enTitle}
                onChange={formik.handleChange}
                required
                error={!enTitle && shouldValidate}
                helperText='Це поле є обов‘язковим'
              />
              <Editor
                value={enText}
                placeholder='Текст'
                onEditorChange={(value) => enSetText(value)}
                setFiles={setFiles}
              />
            </Paper>
          </TabPanel>
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

export default BusinessPageForm;
