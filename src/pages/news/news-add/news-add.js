import React, { useEffect } from 'react';
import {
  TextField,
  Paper,
  Grid,
  Tabs,
  Tab,
  AppBar,
  Avatar,
  Box
} from '@material-ui/core';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { Image } from '@material-ui/icons';
import { push } from 'connected-react-router';
import TabPanel from '../../../components/tab-panel';
import { SaveButton, StandardButton } from '../../../components/buttons';
import LoadingBar from '../../../components/loading-bar';
import useNewsHandlers from '../../../utils/use-news-handlers';
import { useStyles } from './news-add.styles';
import { addArticle } from '../../../redux/news/news.actions';
import { config } from '../../../configs';
import ImageUploadContainer from '../../../containers/image-upload-container';
import Editor from '../../../components/editor';

const { languages } = config;
const { newsErrorMessages } = config;

const NewsAdd = () => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const loading = useSelector(({ News }) => News.newsLoading);
  const {
    tabsValue,
    checkboxes,
    preferredLanguages,
    setPreferredLanguages,
    languageCheckboxes,
    handleTabsChange,
    createArticle,
    setAuthorPhoto,
    setNewsImage,
    newsImage,
    authorPhoto
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

  const handleGoBack = () => {
    dispatch(push(config.routes.pathToNews));
  };

  const formSchema = Yup.object().shape({
    uaAuthorName: Yup.string()
      .min(6, newsErrorMessages.NAME_MIN_LENGTH_MESSAGE)
      .max(100, newsErrorMessages.NAME_MAX_LENGTH_MESSAGE),
    enAuthorName: Yup.string()
      .min(6, newsErrorMessages.NAME_MIN_LENGTH_MESSAGE)
      .max(100, newsErrorMessages.NAME_MAX_LENGTH_MESSAGE),
    uaTitle: Yup.string()
      .min(10, newsErrorMessages.TITLE_MIN_LENGTH_MESSAGE)
      .max(100, newsErrorMessages.TITLE_MAX_LENGTH_MESSAGE),
    enTitle: Yup.string()
      .min(10, newsErrorMessages.TITLE_MIN_LENGTH_MESSAGE)
      .max(100, newsErrorMessages.TITLE_MAX_LENGTH_MESSAGE)
  });

  const {
    values,
    handleChange,
    handleSubmit,
    setFieldValue,
    errors,
    touched
  } = useFormik({
    validationSchema: formSchema,
    initialValues: {
      ...formikValues,
      authorPhoto: '',
      newsImage: ''
    },
    onSubmit: () => {
      const article = createArticle(values);
      dispatch(addArticle(article));
    }
  });

  const TabPanels =
    preferredLanguages.length > 0
      ? preferredLanguages.map((lang, index) => (
        <TabPanel key={index} value={tabsValue} index={index}>
          <Paper className={styles.newsItemAdd}>
            <TextField
              data-cy={`${lang}AuthorName`}
              id={`${lang}AuthorName`}
              className={styles.textfield}
              variant='outlined'
              label={config.labels.news.name}
              error={
                touched[`${lang}AuthorName`] && !!errors[`${lang}AuthorName`]
              }
              multiline
              value={values[`${lang}AuthorName`]}
              onChange={handleChange}
              required
            />
            {touched[`${lang}AuthorName`] && errors[`${lang}AuthorName`] && (
              <div className={styles.inputError}>
                {errors[`${lang}AuthorName`]}
              </div>
            )}
            <TextField
              data-cy={`${lang}Title`}
              id={`${lang}Title`}
              className={styles.textfield}
              variant='outlined'
              label={config.labels.news.title}
              multiline
              error={touched[`${lang}Title`] && !!errors[`${lang}Title`]}
              value={values[`${lang}Title`]}
              onChange={handleChange}
              required
            />
            {touched[`${lang}Title`] && errors[`${lang}Title`] && (
              <div className={styles.inputError}>
                {errors[`${lang}Title`]}
              </div>
            )}
            <Editor
              value={values[`${lang}Text`]}
              label={config.labels.news.text}
              id={`${lang}Text`}
              onEditorChange={(value) => setFieldValue(`${lang}Text`, value)}
              multiline
              required
            />
            {touched[`${lang}Text`] && errors[`${lang}Text`] && (
              <div className={styles.inputError}>{errors[`${lang}Text`]}</div>
            )}
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

  const handleAuthorImageLoad = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFieldValue('authorPhoto', event.target.result);
        setAuthorPhoto(event.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleNewsImageLoad = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFieldValue('newsImage', event.target.result);
        setNewsImage(event.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  if (loading) {
    return <LoadingBar />;
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <div className={styles.controlsBlock}>
          <div>{languageCheckboxes}</div>
          <SaveButton
            className={styles.saveButton}
            data-cy='save'
            type='submit'
            title={config.buttonTitles.SAVE_TITLE}
          />
        </div>
        <Box my={3}>
          <Grid container spacing={1}>
            <Grid item>
              <ImageUploadContainer
                handler={handleAuthorImageLoad}
                buttonLabel={config.buttonTitles.AUTHOR_PHOTO}
              />
              {authorPhoto && (
                <Avatar src={authorPhoto}>
                  <Image />
                </Avatar>
              )}
            </Grid>
          </Grid>
        </Box>
        <Box my={3}>
          <Grid container spacing={1}>
            <Grid item>
              <ImageUploadContainer
                handler={handleNewsImageLoad}
                buttonLabel={config.buttonTitles.MAIN_PHOTO}
              />
              {newsImage && (
                <Avatar src={newsImage}>
                  <Image />
                </Avatar>
              )}
            </Grid>
          </Grid>
        </Box>
        <div className={styles.controlsBlock}>
          <StandardButton
            id='back-btn'
            title={config.buttonTitles.GO_BACK_TITLE}
            variant='outlined'
            onClickHandler={handleGoBack}
            data-cy='back-btn'
          />
        </div>
        {preferredLanguages.length > 0 ? (
          <div>
            <AppBar position='static'>
              <Tabs
                className={styles.tabs}
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
