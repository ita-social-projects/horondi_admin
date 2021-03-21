import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { Grid, Paper } from '@material-ui/core';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useStyles } from './news-form.styles';
import { SaveButton, BackButton } from '../../buttons';
import useNewsHandlers from '../../../utils/use-news-handlers';
import { config } from '../../../configs';
import { addArticle, updateArticle } from '../../../redux/news/news.actions';
import ImageUploadPreviewContainer from '../../../containers/image-upload-container/image-upload-previewContainer';
import LanguagePanel from '../language-panel';

const map = require('lodash/map');

const { languages } = config;
const { MAIN_PHOTO, AUTHOR_PHOTO, SAVE_TITLE } = config.buttonTitles;
const {
  NAME_MIN_LENGTH_MESSAGE,
  TITLE_MIN_LENGTH_MESSAGE,
  TEXT_MIN_LENGTH_MESSAGE
} = config.newsErrorMessages;
const { imagePrefix } = config;
const { authorName, title, text } = config.labels.news;
const imageUploadNewsInputsId = {
  authorImageInput: 'authorImageInput',
  newsImageInput: 'newsImageInput'
};

const NewsForm = ({ id, newsArticle, editMode }) => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const {
    createArticle,
    uploadAuthorImage,
    setUploadAuthorImage,
    uploadNewsImage,
    setUploadNewsImage
  } = useNewsHandlers();

  useEffect(() => {
    if (newsArticle.author.image) {
      setUploadAuthorImage(`${imagePrefix}${newsArticle.author.image}`);
    }
    if (newsArticle.image.constructorImg) {
      setUploadNewsImage(`${imagePrefix}${newsArticle.image.constructorImg}`);
    }
  }, [dispatch, newsArticle]);

  const selectFormSchema = () => {
    const formObj = languages.reduce((reducer, lang) => {
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
    initialValues: {
      authorPhoto: newsArticle.author.image || '',
      newsImage: newsArticle.image || '',
      uaAuthorName: newsArticle.author.name[0].value || '',
      enAuthorName: newsArticle.author.name[1].value || '',
      uaTitle: newsArticle.title[0].value || '',
      enTitle: newsArticle.title[1].value || '',
      uaText: newsArticle.text[0].value || '',
      enText: newsArticle.text[1].value || ''
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
          setUploadAuthorImage(event.target.result);
        };

        setUploadAuthorImage(e.target.files[0]);
      } else if (e.target.previousSibling.textContent === MAIN_PHOTO) {
        reader.onload = (event) => {
          setUploadNewsImage(event.target.result);
        };

        setUploadNewsImage(e.target.files[0]);
      }
      reader.readAsDataURL(e.target.files[0]);
    }
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

  const navButtons = (
    <>
      <BackButton />
      <SaveButton
        className={styles.saveButton}
        data-cy='save'
        type='submit'
        title={SAVE_TITLE}
      />
    </>
  );

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {navButtons}
        <Grid item xs={12}>
          <Paper className={styles.inputBlock}>
            <div className={styles.imageUploadBlock}>
              <div>
                <span className={styles.imageUpload}>
                  {config.labels.news.avatarText}
                </span>

                <div className={styles.imageUploadAvatar}>
                  <ImageUploadPreviewContainer
                    handler={handleImageLoad}
                    src={uploadAuthorImage}
                    id={imageUploadNewsInputsId.authorImageInput}
                  />
                  {touched.uploadAuthorImage && errors.uploadAuthorImage && (
                    <div className={styles.inputError}>
                      {errors.uploadAuthorImage}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <span className={styles.imageUpload}>
                  {config.labels.news.mainImgText}
                </span>

                <div className={styles.imageUploadAvatar}>
                  <ImageUploadPreviewContainer
                    handler={handleImageLoad}
                    src={uploadNewsImage}
                    id={imageUploadNewsInputsId.newsImageInput}
                  />
                  {touched.patternConstructorImage &&
                    errors.patternConstructorImage && (
                    <div className={styles.inputError}>
                      {errors.patternConstructorImage}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Paper>
        </Grid>
        {map(languages, (lang) => (
          <LanguagePanel lang={lang} inputOptions={inputOptions} key={lang} />
        ))}
        {navButtons}
      </form>
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
