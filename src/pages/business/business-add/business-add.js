import React, { useEffect } from 'react';
import { TextField, Paper, Grid, Tabs, Tab, AppBar } from '@material-ui/core';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import Editor from '../../../components/editor';
import TabPanel from '../../../components/tab-panel';
import { SaveButton } from '../../../components/buttons';
import LoadingBar from '../../../components/loading-bar';
import useBusinessHandlers from '../../../utils/use-business-handlers';
import { useStyles } from './business-add.styles';

import { addBusinessPage } from '../../../redux/businessPages/businessPages.actions';
import { config } from '../../../configs';

const { languages } = config;

const NewsAdd = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const loading = useSelector(({ BusinessPages }) => BusinessPages.loading);
  const {
    tabsValue,
    checkboxes,
    preferredLanguages,
    setPreferredLanguages,
    languageCheckboxes,
    handleTabsChange,
    createBusinessPage,
    ukSetText,
    enSetText,
    ukText,
    enText
  } = useBusinessHandlers();

  useEffect(() => {
    const prefLanguages = [];
    Object.keys(checkboxes).forEach((key) => {
      if (checkboxes[key] === true) {
        prefLanguages.push(key);
      }
    });
    setPreferredLanguages(prefLanguages);
  }, [checkboxes, setPreferredLanguages]);

  const langValues = languages.map((lang) => ({
    [`${lang}AuthorName`]: '',
    [`${lang}Title`]: '',
    [`${lang}Text`]: ''
  }));

  const formikValues =
    langValues !== null ? Object.assign(...langValues) : null;
  const formik = useFormik({
    initialValues: {
      ...formikValues,
      authorPhoto: '',
      newsImage: ''
    },
    onSubmit: (values) => {
      const article = createBusinessPage({ ...values, enText, ukText });
      dispatch(addBusinessPage(article));
    }
  });

  const LanguageTabs =
    preferredLanguages.length > 0
      ? preferredLanguages.map((lang, index) => (
        <Tab label={lang} key={index} />
      ))
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
              <Paper className={classes.newsItemAdd}>
                <TextField
                  id='authorPhoto'
                  className={classes.textfield}
                  variant='outlined'
                  label='Фото автора'
                  value={formik.values.authorPhoto}
                  onChange={formik.handleChange}
                  required
                />
                <TextField
                  id='newsImage'
                  className={classes.textfield}
                  variant='outlined'
                  label='Головне зображення'
                  value={formik.values.newsImage}
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
                {LanguageTabs}
              </Tabs>
            </AppBar>
            <TabPanel value={tabsValue} index={0}>
              <Paper className={classes.newsItemAdd}>
                <TextField
                  id='ukAuthorName'
                  className={classes.textfield}
                  variant='outlined'
                  label='Автор uk'
                  multiline
                  value={formik.values.ukAuthorName}
                  onChange={formik.handleChange}
                  required
                />
                <TextField
                  id='ukTitle'
                  className={classes.textfield}
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
                />
              </Paper>
            </TabPanel>
            <TabPanel value={tabsValue} index={1}>
              <Paper className={classes.newsItemAdd}>
                <TextField
                  id='enAuthorName'
                  className={classes.textfield}
                  variant='outlined'
                  label='Автор en'
                  multiline
                  value={formik.values.enAuthorName}
                  onChange={formik.handleChange}
                  required
                />
                <TextField
                  id='enTitle'
                  className={classes.textfield}
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
                />
              </Paper>
            </TabPanel>
          </div>
        ) : null}
      </form>
    </div>
  );
};

export default NewsAdd;
