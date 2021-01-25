import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import {
  AppBar,
  Avatar,
  Box,
  Paper,
  Tab,
  Tabs,
  TextField
} from '@material-ui/core';
import { Image } from '@material-ui/icons';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useStyles } from './news-form.styles';
import { SaveButton, StandardButton } from '../../buttons';
import useNewsHandlers from '../../../utils/use-news-handlers';
import TabPanel from '../../tab-panel';
import { config } from '../../../configs';
import { addArticle, updateArticle } from '../../../redux/news/news.actions';
import ImageUploadContainer from '../../../containers/image-upload-container';
import Editor from '../../editor/editor';

const { MAIN_PHOTO, AUTHOR_PHOTO } = config.buttonTitles;
const {
  NAME_MIN_LENGTH_MESSAGE,
  TITLE_MIN_LENGTH_MESSAGE,
  TEXT_MIN_LENGTH_MESSAGE
} = config.newsErrorMessages;

const NewsForm = ({ id, newsArticle, editMode }) => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const {
    tabsValue,
    checkboxes,
    preferredLanguages,
    handleTabsChange,
    setPreferredLanguages,
    languageCheckboxes,
    createArticle,
    uploadAuthorImage,
    setUploadAuthorImage,
    uploadNewsImage,
    setUploadNewsImage
  } = useNewsHandlers();

  const [authorAvatar, setAuthorAvatar] = useState('');
  const [newsAvatar, setNewsAvatar] = useState('');

  const languageTabs =
    preferredLanguages.length > 0
      ? preferredLanguages.map((lang, index) => (
        <Tab label={lang} key={index} />
      ))
      : null;

  useEffect(() => {
    const prefLanguages = [];
    Object.keys(checkboxes).forEach((key) => {
      if (checkboxes[key]) {
        prefLanguages.push(key);
      }
    });
    setPreferredLanguages(prefLanguages);
  }, [checkboxes, setPreferredLanguages]);

  const selectFormSchema = () => {
    const formObj = preferredLanguages.reduce((reducer, lang) => {
      reducer[`${lang}AuthorName`] = Yup.string()
        .min(6, NAME_MIN_LENGTH_MESSAGE)
        .required(NAME_MIN_LENGTH_MESSAGE);
      reducer[`${lang}Title`] = Yup.string()
        .min(10, TITLE_MIN_LENGTH_MESSAGE)
        .required(TITLE_MIN_LENGTH_MESSAGE);
      reducer[`${lang}Text`] = Yup.string()
        .min(10, TEXT_MIN_LENGTH_MESSAGE)
        .required(TEXT_MIN_LENGTH_MESSAGE);

      return reducer;
    }, {});

    return Yup.object().shape(formObj);
  };

  const formSchema = selectFormSchema();

  const {
    values,
    handleSubmit,
    handleChange,
    setFieldValue,
    touched,
    errors
  } = useFormik({
    validationSchema: formSchema,
    initialValues: {
      authorPhoto: newsArticle.author.image || '',
      newsImage: newsArticle.image || '',
      uaAuthorName: newsArticle.author.name[0].value || '',
      enAuthorName: newsArticle.author.name[1].value || '',
      uaTitle: newsArticle.title[0].value || '',
      enTitle: newsArticle.title[1].value || '',
      uaText: newsArticle.text[0].value || '',
      enText: newsArticle.text[0].value || ''
    },
    onSubmit: () => {
      const newArticle = createArticle(values);
      if (editMode) {
        dispatch(
          updateArticle({
            id,
            newArticle,
            upload: [uploadAuthorImage, uploadNewsImage]
          })
        );
      } else {
        dispatch(
          addArticle({
            article: newArticle,
            upload: [uploadAuthorImage, uploadNewsImage]
          })
        );
      }
    }
  });

  const handleImageLoad = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      if (e.target.previousSibling.textContent === AUTHOR_PHOTO) {
        reader.onload = (event) => {
          setAuthorAvatar(event.target.result);
        };

        setUploadAuthorImage(e.target.files[0]);
      } else if (e.target.previousSibling.textContent === MAIN_PHOTO) {
        reader.onload = (event) => {
          setNewsAvatar(event.target.result);
        };

        setUploadNewsImage(e.target.files[0]);
      }
      reader.readAsDataURL(e.target.files[0]);
    }
  };

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
            values={values}
            errors={errors}
          />
        </div>
        <Box my={3}>
          <div className={styles.imageUploadAvatar}>
            <ImageUploadContainer
              handler={handleImageLoad}
              buttonLabel={AUTHOR_PHOTO}
            />

            {authorAvatar && (
              <Avatar src={authorAvatar}>
                <Image />
              </Avatar>
            )}
          </div>
        </Box>
        <Box my={3}>
          <div className={styles.imageUploadAvatar}>
            <ImageUploadContainer
              handler={handleImageLoad}
              buttonLabel={MAIN_PHOTO}
            />
            {newsAvatar && (
              <Avatar src={newsAvatar}>
                <Image />
              </Avatar>
            )}
          </div>
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
                  label={config.labels.news.authorsName}
                  multiline
                  value={values[`${lang}AuthorName`]}
                  onChange={handleChange}
                  error={
                    touched[`${lang}AuthorName`] &&
                      errors[`${lang}AuthorName`]
                  }
                />

                {touched[`${lang}AuthorName`] &&
                    errors[`${lang}AuthorName`] && (
                  <div className={styles.inputError}>
                    {errors[`${lang}AuthorName`]}
                  </div>
                )}

                <TextField
                  data-cy={`${lang}Title`}
                  id={`${lang}Title`}
                  className={styles.textField}
                  variant='outlined'
                  label={config.labels.news.title}
                  multiline
                  value={values[`${lang}Title`]}
                  onChange={handleChange}
                  error={touched[`${lang}Title`] && errors[`${lang}Title`]}
                />
                {touched[`${lang}Title`] && errors[`${lang}Title`] && (
                  <div className={styles.inputError}>
                    {errors[`${lang}Title`]}
                  </div>
                )}
                <Editor
                  value={values[`${lang}Text`]}
                  placeholder={config.labels.news.text}
                  id={`${lang}Text`}
                  onEditorChange={(value) =>
                    setFieldValue(`${lang}Text`, value)
                  }
                  multiline
                />
                {touched[`${lang}Text`] && errors[`${lang}Text`] && (
                  <div className={styles.inputError}>
                    {errors[`${lang}Text`]}
                  </div>
                )}
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

const valueShape = PropTypes.shape({
  lang: PropTypes.string,
  value: PropTypes.string
});

NewsForm.propTypes = {
  id: PropTypes.string,
  newsArticle: PropTypes.shape({
    author: PropTypes.shape({
      image: PropTypes.string,
      name: PropTypes.arrayOf(valueShape)
    }),
    title: PropTypes.arrayOf(valueShape),
    text: PropTypes.arrayOf(valueShape),
    languages: PropTypes.string,
    date: PropTypes.string,
    image: PropTypes.string
  }),
  editMode: PropTypes.bool
};

NewsForm.defaultProps = {
  id: '',
  newsArticle: {
    author: {
      image: '',
      name: [
        {
          lang: '',
          value: ''
        },
        {
          lang: '',
          value: ''
        }
      ]
    },
    title: [
      {
        lang: '',
        value: ''
      },
      {
        lang: '',
        value: ''
      }
    ],
    text: [
      {
        lang: '',
        value: ''
      },
      {
        lang: '',
        value: ''
      }
    ],
    languages: '',
    date: '',
    image: ''
  },
  editMode: false
};

export default NewsForm;
