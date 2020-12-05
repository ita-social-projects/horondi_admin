import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import PropTypes from 'prop-types';
import {
  Paper,
  TextField,
  Grid,
  Tab,
  AppBar,
  Tabs,
  Box,
  Avatar
} from '@material-ui/core';
import { Image } from '@material-ui/icons';
import { useStyles } from './news-form.styles';
import useNewsHandlers from '../../utils/use-news-handlers';
import { SaveButton, StandardButton } from '../buttons';
import TabPanel from '../tab-panel';
import { config } from '../../configs';
import { updateArticle } from '../../redux/news/news.actions';
import ImageUploadContainer from '../../containers/image-upload-container';
import Editor from '../editor/editor';

const { languages } = config;

const NewsForm = ({ article, id }) => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const {
    tabsValue,
    checkboxes,
    preferredLanguages,
    handleTabsChange,
    languageCheckboxes,
    setCheckboxes,
    setPreferredLanguages,
    createArticle,
    authorPhoto,
    setAuthorPhoto,
    newsImage,
    setNewsImage
  } = useNewsHandlers();

  useEffect(() => {
    setPreferredLanguages(article.languages);
    const checkboxStates = languages.reduce(
      (obj, lang) =>
        article.languages.includes(lang)
          ? { ...obj, [lang]: true }
          : { ...obj, [lang]: false },
      {}
    );
    setCheckboxes(checkboxStates);
  }, [article, setPreferredLanguages, setCheckboxes]);

  useEffect(() => {
    const prefLanguages = [];
    Object.keys(checkboxes).forEach((key) => {
      if (checkboxes[key]) {
        prefLanguages.push(key);
      }
    });
    setPreferredLanguages(prefLanguages);
  }, [checkboxes, setPreferredLanguages]);

  const languageTabs =
    preferredLanguages.length > 0
      ? preferredLanguages.map((lang, index) => <Tab label={lang} key={lang} />)
      : null;

  const { values, handleSubmit, handleChange, setFieldValue } = useFormik({
    initialValues: {
      authorPhoto: article.author.image.small || '',
      newsImage: article.images.primary.medium || '',
      uaAuthorName: article.author.name[0].value || '',
      enAuthorName: article.author.name[1].value || '',
      uaTitle: article.title[0].value || '',
      enTitle: article.title[1].value || '',
      uaText: article.text[0].value || '',
      enText: article.text[1].value || ''
    },
    onSubmit: () => {
      const newArticle = createArticle(values);
      dispatch(updateArticle({ id, newArticle }));
    }
  });

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

    const handleGoBack = () => {
      dispatch(push(config.routes.pathToNews));
    };

    return (
      <div>
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
          <AppBar position='static'>
            <Tabs
              className={styles.tabs}
              value={tabsValue}
              onChange={handleTabsChange}
              aria-label='simple tabs example'
            >
              {languageTabs}
            </Tabs>
          </AppBar>
          {preferredLanguages.map((lang, index) => (
            <TabPanel key={index} value={tabsValue} index={index}>
              <Paper className={styles.newsItemUpdate}>
                <TextField
                  data-cy={`${lang}AuthorName`}
                  id={`${lang}AuthorName`}
                  className={styles.textField}
                  variant='outlined'
                  label={config.labels.news.name}
                  multiline
                  value={values[`${lang}AuthorName`]}
                  onChange={handleChange}
                  required
                />
                <TextField
                  data-cy={`${lang}Title`}
                  id={`${lang}Title`}
                  className={styles.textField}
                  variant='outlined'
                  label={config.labels.news.title}
                  multiline
                  value={values[`${lang}Title`]}
                  onChange={handleChange}
                  required
                />
                <Editor
                  value={values[`${lang}Text`]}
                  placeholder={config.labels.news.text}
                  id={`${lang}Text`}
                  onEditorChange={(value) =>
                    setFieldValue(`${lang}Text`, value)
                  }
                  multiline
                  required
                />
              </Paper>
            </TabPanel>
          ))}
        </form>

        <div className={styles.controlsBlock}>
          <StandardButton
            id='back-btn'
            title={config.buttonTitles.GO_BACK_TITLE}
            variant='outlined'
            onClickHandler={handleGoBack}
            data-cy='back-btn'
          />
        </div>
      </div>
    );
  };
};

NewsForm.propTypes = {
  id: PropTypes.string.isRequired,
  article: PropTypes.shape({
    languages: PropTypes.arrayOf.isRequired,
    author: PropTypes.shape({
      name: PropTypes.arrayOf.isRequired,
      image: PropTypes.shape({
        small: PropTypes.string
      }).isRequired
    }),
    title: PropTypes.arrayOf.isRequired,
    text: PropTypes.arrayOf.isRequired,
    images: PropTypes.shape({
      primary: PropTypes.shape({
        medium: PropTypes.string
      }).isRequired
    }).isRequired
  }).isRequired
};

export default NewsForm;
