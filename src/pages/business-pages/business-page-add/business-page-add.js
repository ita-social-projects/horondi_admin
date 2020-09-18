import React, { useEffect } from 'react';
import {
  TextField,
  Paper,
  Grid,
  Tabs,
  Tab,
  AppBar,
  FormControlLabel,
  Checkbox
} from '@material-ui/core';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import Editor from '../../../components/editor';
import TabPanel from '../../../components/tab-panel';
import { SaveButton } from '../../../components/buttons';
import LoadingBar from '../../../components/loading-bar';
import useBusinessHandlers from '../../../utils/use-business-handlers';
import { useStyles } from './business-page-add.styles';

import { addBusinessPage } from '../../../redux/business-pages/business-pages.actions';
import { config } from '../../../configs';

const { languages } = config;

const BusinessPageAdd = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const loading = useSelector(({ BusinessPages }) => BusinessPages.loading);
  const {
    tabsValue,
    checkboxes,
    preferredLanguages,
    setPreferredLanguages,
    languages,
    handleTabsChange,
    createBusinessPage,
    ukSetText,
    enSetText,
    ukText,
    enText,
    files,
    setFiles,
    handleCheckboxChange
  } = useBusinessHandlers();

  useEffect(() => {
    const prefLanguages = [];
    Object.keys(checkboxes).filter(
      (key) => checkboxes[key] && prefLanguages.push(key)
    );

    setPreferredLanguages(prefLanguages);
  }, [checkboxes, setPreferredLanguages]);

  const langValues = languages.map((lang) => ({
    [`${lang}Title`]: '',
    [`${lang}Text`]: ''
  }));

  const formikValues = Object.assign(...langValues);

  const formik = useFormik({
    initialValues: {
      ...formikValues,
      code: ''
    },
    onSubmit: (values) => {
      const page = createBusinessPage({ ...values, enText, ukText });
      dispatch(addBusinessPage(page));
    }
  });

  const languageCheckboxes = languages.map((lang) => (
    <FormControlLabel
      key={lang}
      control={
        <Checkbox
          checked={checkboxes[lang]}
          onChange={handleCheckboxChange}
          name={lang}
          color='primary'
        />
      }
      label={lang}
    />
  ));

  const languageTabs =
    preferredLanguages.length > 0
      ? preferredLanguages.map((lang) => <Tab label={lang} key={lang} />)
      : null;

  if (loading) {
    return <LoadingBar />;
  }

  return (
    <div className={classes.container}>
      <form onSubmit={formik.handleSubmit}>
        <div className={classes.controlsBlock}>
          <div>{languageCheckboxes}</div>
          <SaveButton
            className={classes.saveButton}
            id='save'
            type='submit'
            title='Зберегти'
          />
        </div>
        {preferredLanguages.length > 0 ? (
          <div>
            <Grid item xs={12}>
              <Paper className={classes.businessPageAdd}>
                <TextField
                  id='code'
                  className={classes.textField}
                  variant='outlined'
                  label='Код сторінки'
                  value={formik.values.businessPageCode}
                  onChange={formik.handleChange}
                  required
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
        ) : null}
      </form>
    </div>
  );
};

export default BusinessPageAdd;
