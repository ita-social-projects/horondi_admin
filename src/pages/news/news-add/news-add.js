import React, { useEffect } from 'react';
import { TextField, Paper, Grid, Tabs, Tab, AppBar } from '@material-ui/core';

import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import TabPanel from '../../../components/tab-panel';
import { SaveButton } from '../../../components/buttons';
import LoadingBar from '../../../components/loading-bar';
import useNewsHandlers from '../../../utils/use-news-handlers';
import { useStyles } from './news-add.styles';
import { addArticle } from '../../../redux/news/news.actions';
import { config } from '../../../configs';

const { languages } = config;
const { loginErrorMessages } = config;

const NewsAdd = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const loading = useSelector(({ News }) => News.newsLoading);
  const {
    tabsValue,
    checkboxes,
    preferredLanguages,
    setPreferredLanguages,
    languageCheckboxes,
    handleTabsChange,
    createArticle
  } = useNewsHandlers();

  useEffect(() => {
    const prefLanguages = [];
    Object.keys(checkboxes).forEach((key) => {
      if (checkboxes[key]) {
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

  const formikValues = langValues !== null ? Object.assign(...langValues) : {};

  const formSchema = Yup.object().shape({
    authorPhoto: Yup.string()
      .min(8, loginErrorMessages.PASSWORD_MIN_LENGTH_MESSAGE)
      .required(loginErrorMessages.ENTER_PASSWORD_MESSAGE),
    newsImage: Yup.string()
      .max(8, loginErrorMessages.PASSWORD_MIN_LENGTH_MESSAGE)
      .required(loginErrorMessages.ENTER_PASSWORD_MESSAGE),
    ukAuthorName: Yup.string().max(
      8,
      loginErrorMessages.PASSWORD_MIN_LENGTH_MESSAGE
    ),
    enAuthorName: Yup.string().max(
      8,
      loginErrorMessages.PASSWORD_MIN_LENGTH_MESSAGE
    )
  });

  const { values, handleChange, handleSubmit, errors, touched } = useFormik({
    validationSchema: formSchema,
    initialValues: {
      ...formikValues,
      authorPhoto: '',
      newsImage: ''
    },
    onSubmit: (values) => {
      const article = createArticle(values);
      dispatch(addArticle(article));
    }
  });

  const TabPanels =
    preferredLanguages.length > 0
      ? preferredLanguages.map((lang, index) => (
        <TabPanel key={index} value={tabsValue} index={index}>
          <Paper className={classes.newsItemAdd}>
            <TextField
              data-cy={`${lang}AuthorName`}
              id={`${lang}AuthorName`}
              className={classes.textfield}
              variant='outlined'
              label={`Ім'я автора`}
              error={
                touched[`${lang}AuthorName`] && !!errors[`${lang}AuthorName`]
              }
              multiline
              value={values[`${lang}AuthorName`]}
              onChange={handleChange}
              required
            />
            <TextField
              data-cy={`${lang}Title`}
              id={`${lang}Title`}
              className={classes.textfield}
              variant='outlined'
              label='Заголовок'
              multiline
              value={values[`${lang}Title`]}
              onChange={handleChange}
              required
            />
            <TextField
              data-cy={`${lang}Text`}
              id={`${lang}Text`}
              className={classes.textfield}
              variant='outlined'
              label='Текст'
              multiline
              value={values[`${lang}Text`]}
              onChange={handleChange}
              required
            />
          </Paper>
        </TabPanel>
      ))
      : null;

  const languageTabs =
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
      <form onSubmit={handleSubmit}>
        <div className={classes.controlsBlock}>
          <div>{languageCheckboxes}</div>
          <SaveButton
            className={classes.saveButton}
            data-cy='save'
            type='submit'
            title='Зберегти'
          />
        </div>
        <Grid item xs={12}>
          <Paper className={classes.newsItemAdd}>
            <TextField
              data-cy='authorPhoto'
              id='authorPhoto'
              className={classes.textfield}
              variant='outlined'
              label='Фото автора'
              error={touched.authorPhoto && !!errors.authorPhoto}
              value={values.authorPhoto}
              onChange={handleChange}
              required
            />
            {touched.authorPhoto && errors.authorPhoto && (
              <div className={classes.inputError}>{errors.authorPhoto}</div>
            )}
            <TextField
              data-cy='newsImage'
              id='newsImage'
              className={classes.textfield}
              variant='outlined'
              label='Головне зображення'
              value={values.newsImage}
              onChange={handleChange}
              required
            />
            {touched.newsImage && errors.newsImage && (
              <div className={classes.inputError}>{errors.newsImage}</div>
            )}
          </Paper>
        </Grid>
        {preferredLanguages.length > 0 ? (
          <div>
            <AppBar position='static'>
              <Tabs
                className={classes.tabs}
                value={tabsValue}
                onChange={handleTabsChange}
                aria-label='tabs'
              >
                {languageTabs}
              </Tabs>
            </AppBar>
            {TabPanels}
          </div>
        ) : null}
      </form>
    </div>
  );
};

export default NewsAdd;
