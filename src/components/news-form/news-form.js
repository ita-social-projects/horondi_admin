import React, { useEffect, useMemo } from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import * as Yup from 'yup';
import {
  Paper,
  TextField,
  Tab,
  AppBar,
  Tabs,
  Box,
  Avatar
} from '@material-ui/core';
import { Image } from '@material-ui/icons';
import PropTypes from 'prop-types';
import { useStyles } from './news-form.styles';
import { SaveButton, StandardButton } from '../buttons';
import useNewsHandlers from '../../utils/use-news-handlers';
import TabPanel from '../tab-panel';
import { config } from '../../configs';
import {
  updateArticle,
  addArticle,
  getArticle
} from '../../redux/news/news.actions';
import ImageUploadContainer from '../../containers/image-upload-container';
import Editor from '../editor/editor';
import LoadingBar from '../loading-bar';

const { newsErrorMessages } = config;

const NewsForm = ({ id, editMode }) => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const { loading, newsArticle } = useSelector(({ News }) => ({
    loading: News.newsLoading,
    newsArticle: News.newsArticle
  }));
  const {
    tabsValue,
    checkboxes,
    preferredLanguages,
    handleTabsChange,
    setPreferredLanguages,
    languageCheckboxes,
    createArticle,
    authorPhoto,
    newsImage,
    setNewsImage,
    setAuthorPhoto,
    uaSetAuthor,
    uaSetText,
    uaSetTitle,
    enSetAuthor,
    enSetText,
    enSetTitle,
    uaAuthorName,
    enAuthorName,
    uaTitle,
    enTitle,
    uaText,
    enText
  } = useNewsHandlers();

  const languageTabs =
    preferredLanguages.length > 0
      ? preferredLanguages.map((lang, index) => (
        <Tab label={lang} key={index} />
      ))
      : null;

  useEffect(() => {
    id && dispatch(getArticle(id));
  }, [dispatch, id]);

  useEffect(() => {
    const isEditingReady = newsArticle && editMode;

    setAuthorPhoto(isEditingReady ? newsArticle.author.image.small : '');
    setNewsImage(isEditingReady ? newsArticle.images.primary.medium : '');
    uaSetAuthor(isEditingReady ? newsArticle.author.name[0].value : '');
    enSetAuthor(isEditingReady ? newsArticle.author.name[1].value : '');
    uaSetTitle(isEditingReady ? newsArticle.title[0].value : '');
    enSetTitle(isEditingReady ? newsArticle.title[1].value : '');
    uaSetText(isEditingReady ? newsArticle.text[0].value : '');
    enSetText(isEditingReady ? newsArticle.text[1].value : '');
  }, [
    editMode,
    newsArticle,
    setAuthorPhoto,
    setNewsImage,
    uaSetAuthor,
    enSetAuthor,
    uaSetText,
    uaSetTitle,
    enSetText,
    enSetTitle
  ]);

  useEffect(() => {
    const prefLanguages = [];
    Object.keys(checkboxes).forEach((key) => {
      if (checkboxes[key]) {
        prefLanguages.push(key);
      }
    });
    setPreferredLanguages(prefLanguages);
  }, [checkboxes, setPreferredLanguages]);

  useEffect(() => {
    console.log(newsArticle, id, editMode);
  }, [newsArticle, id, editMode]);

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

  const formik = useFormik({
    validationSchema: formSchema,
    initialValues: {
      authorPhoto,
      newsImage,
      uaAuthorName,
      enAuthorName,
      uaTitle,
      enTitle,
      uaText,
      enText
    },
    onSubmit: () => {
      if (editMode) {
        const newArticle = createArticle(formik.values);
        dispatch(updateArticle({ id, newArticle }));
      } else {
        const article = createArticle(formik.values);
        dispatch(addArticle(article));
      }
    }
  });

  useMemo(() => {
    formik.values.authorPhoto = authorPhoto;
    formik.values.newsImage = newsImage;
    formik.values.uaAuthorName = uaAuthorName;
    formik.values.enAuthorName = enAuthorName;
    formik.values.uaTitle = uaTitle;
    formik.values.enTitle = enTitle;
    formik.values.uaText = uaText;
    formik.values.enText = enText;
  }, [
    authorPhoto,
    newsImage,
    uaAuthorName,
    enAuthorName,
    uaTitle,
    enTitle,
    uaText,
    enText
  ]);

  const handleImageLoad = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();

      if (
        e.target.previousSibling.textContent ===
        config.buttonTitles.AUTHOR_PHOTO
      ) {
        reader.onload = (event) => {
          formik.setFieldValue('authorPhoto', event.target.result);
          setAuthorPhoto(event.target.result);
        };
      } else if (
        e.target.previousSibling.textContent === config.buttonTitles.MAIN_PHOTO
      ) {
        reader.onload = (event) => {
          formik.setFieldValue('newsImage', event.target.result);
          setNewsImage(event.target.result);
        };
      }

      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleGoBack = () => {
    dispatch(push(config.routes.pathToNews));
  };

  if (loading) {
    return <LoadingBar />;
  }

  return (
    <div className={styles.formContainer}>
      <form onSubmit={formik.handleSubmit}>
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
          <ImageUploadContainer
            handler={handleImageLoad}
            buttonLabel={config.buttonTitles.AUTHOR_PHOTO}
          />

          {authorPhoto && (
            <Avatar src={authorPhoto}>
              <Image />
            </Avatar>
          )}
        </Box>
        <Box my={3}>
          <ImageUploadContainer
            handler={handleImageLoad}
            buttonLabel={config.buttonTitles.MAIN_PHOTO}
          />
          {newsImage && (
            <Avatar src={newsImage}>
              <Image />
            </Avatar>
          )}
        </Box>

        {preferredLanguages.length > 0 && (
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
        )}

        {preferredLanguages.length > 0
          ? preferredLanguages.map((lang, index) => (
            <TabPanel key={index} value={tabsValue} index={index}>
              <Paper className={styles.newsItemUpdate}>
                <TextField
                  data-cy={`${lang}AuthorName`}
                  id={`${lang}AuthorName`}
                  className={styles.textField}
                  variant='outlined'
                  label={config.labels.news.name}
                  multiline
                  value={formik.values[`${lang}AuthorName`]}
                  onChange={formik.handleChange}
                />
                <TextField
                  data-cy={`${lang}Title`}
                  id={`${lang}Title`}
                  className={styles.textField}
                  variant='outlined'
                  label={config.labels.news.title}
                  multiline
                  value={formik.values[`${lang}Title`]}
                  onChange={formik.handleChange}
                  required
                />
                <Editor
                  value={formik.values[`${lang}Text`]}
                  placeholder={config.labels.news.text}
                  id={`${lang}Text`}
                  onEditorChange={(value) =>
                    formik.setFieldValue(`${lang}Text`, value)
                  }
                  multiline
                  required
                />
              </Paper>
            </TabPanel>
          ))
          : null}
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

NewsForm.propTypes = {
  id: PropTypes.string.isRequired,
  editMode: PropTypes.bool
};

NewsForm.defaultProps = {
  editMode: false
};

export default NewsForm;
