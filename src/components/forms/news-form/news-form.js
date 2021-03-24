import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { Avatar, Box } from '@material-ui/core';
import { Image } from '@material-ui/icons';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useStyles } from './news-form.styles';
import { SaveButton, StandardButton } from '../../buttons';
import useNewsHandlers from '../../../utils/use-news-handlers';
import { config } from '../../../configs';
import { addArticle, updateArticle } from '../../../redux/news/news.actions';
import ImageUploadContainer from '../../../containers/image-upload-container';
import LanguagePanel from '../language-panel';
import {
  useFormikInitialValues,
  pushPreferredLanguages
} from '../../../utils/news-form';

const {
  MAIN_PHOTO,
  AUTHOR_PHOTO,
  SAVE_TITLE,
  GO_BACK_TITLE
} = config.buttonTitles;
const {
  NAME_MIN_LENGTH_MESSAGE,
  TITLE_MIN_LENGTH_MESSAGE,
  TEXT_MIN_LENGTH_MESSAGE
} = config.newsErrorMessages;
const { IMG_URL } = config;
const { authorName, title, text } = config.labels.news;

const NewsForm = ({ id, newsArticle, editMode }) => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const {
    checkboxes,
    preferredLanguages,
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

  useEffect(() => {
    const prefLanguages = [];
    pushPreferredLanguages(checkboxes, prefLanguages);
    setPreferredLanguages(prefLanguages);
  }, [checkboxes, setPreferredLanguages]);

  const selectFormSchema = () => {
    const formObj = preferredLanguages.reduce((reducer, lang) => {
      reducer[`${lang}AuthorName`] = Yup.string()
        .min(2, NAME_MIN_LENGTH_MESSAGE)
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

  const { values, handleSubmit, handleChange, touched, errors } = useFormik({
    validationSchema: formSchema,
    initialValues: useFormikInitialValues(newsArticle),
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

  const inputs = [
    { label: authorName, name: 'authorName' },
    { label: title, name: 'title' },
    { label: text, name: 'text', isEditor: true }
  ];

  const inputOptions = {
    errors,
    touched,
    handleChange,
    values,
    inputs
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
            title={SAVE_TITLE}
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
        {preferredLanguages.length > 0
          ? preferredLanguages.map((lang) => (
            <LanguagePanel
              lang={lang}
              inputOptions={inputOptions}
              key={lang}
            />
          ))
          : null}
      </form>

      <div className={styles.controlsBlock}>
        <StandardButton
          id='back-btn'
          title={GO_BACK_TITLE}
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
