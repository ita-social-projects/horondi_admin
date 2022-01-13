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
import { useFormikInitialValues } from '../../../utils/news-form';
import { setMapImageHandler as imageHandler } from '../../../utils/contacts-form';
import { useUnsavedChangesHandler } from '../../../hooks/form-dialog/use-unsaved-changes-handler';
import useChangedValuesChecker from '../../../hooks/forms/use-changed-values-checker';

const map = require('lodash/map');

const { languages } = config;
const { SAVE_TITLE } = config.buttonTitles;
const {
  NAME_MIN_LENGTH_MESSAGE,
  TITLE_MIN_LENGTH_MESSAGE,
  TEXT_MIN_LENGTH_MESSAGE
} = config.newsErrorMessages;
const { ERROR_MESSAGE } = config.commonErrorMessages;
const { imagePrefix } = config;
const { authorName, title, text } = config.labels.news;
const {
  imageUploadNewsInputsId: { authorImageInput, newsImageInput },
  valueKeys: { authorPhoto, newsImage },
  inputNames: { authorNameInput, titleInput, textInput }
} = config;
const { pathToNews } = config.routes;

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
      setUploadAuthorImage({
        name: newsArticle.image,
        imageUrl: `${imagePrefix}${newsArticle.author.image}`
      });
    }
    if (newsArticle.image) {
      setUploadNewsImage({
        name: newsArticle.image,
        imageUrl: `${imagePrefix}${newsArticle.image}`
      });
    }
  }, [dispatch, newsArticle]);

  const selectFormSchema = () => {
    const formObj = languages.reduce((reducer, lang) => {
      reducer[`${lang}Text`] = Yup.string()
        .min(17, TEXT_MIN_LENGTH_MESSAGE)
        .required(ERROR_MESSAGE);
      reducer[`${lang}AuthorName`] = Yup.string()
        .min(2, NAME_MIN_LENGTH_MESSAGE)
        .matches(
          config.formRegExp[`${lang}NameCreation`],
          config.newsErrorMessages[
            `NOT_${lang.toUpperCase()}_AUTHOR_NAME_MESSAGE`
          ]
        )
        .required(ERROR_MESSAGE);
      reducer[`${lang}Title`] = Yup.string()
        .min(10, TITLE_MIN_LENGTH_MESSAGE)
        .matches(
          config.formRegExp[`${lang}NameCreation`],
          config.newsErrorMessages[`NOT_${lang.toUpperCase()}_TITLE_MESSAGE`]
        )
        .required(ERROR_MESSAGE);
      return reducer;
    }, {});

    return Yup.object().shape(formObj);
  };

  const formSchema = selectFormSchema();

  const {
    values,
    handleSubmit,
    handleChange,
    handleBlur,
    touched,
    errors,
    setFieldValue
  } = useFormik({
    validationSchema: formSchema,
    initialValues: useFormikInitialValues(newsArticle),
    onSubmit: () => {
      const newArticle = createArticle(values);
      if (editMode) {
        dispatch(
          updateArticle({
            id,
            newArticle,
            upload: [values.authorPhoto, values.newsImage]
          })
        );
      } else {
        dispatch(
          addArticle({
            article: newArticle,
            upload: [values.authorPhoto, values.newsImage]
          })
        );
      }
    }
  });

  const changed = useChangedValuesChecker(values, errors);
  const unblock = useUnsavedChangesHandler(values);

  const handleLoadAuthorImage = (files) => {
    imageHandler(files, setUploadAuthorImage, values, authorPhoto);
  };

  const handleLoadNewsImage = (files) => {
    imageHandler(files, setUploadNewsImage, values, newsImage);
  };

  const inputs = [
    { label: authorName, name: authorNameInput },
    { label: title, name: titleInput },
    { label: text, name: textInput, isEditor: true }
  ];

  const inputOptions = {
    errors,
    touched,
    handleChange,
    handleBlur,
    values,
    inputs,
    setFieldValue
  };

  const eventPreventHandler = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <form onSubmit={(e) => eventPreventHandler(e)}>
        <div className={styles.buttonContainer}>
          <Grid container spacing={2} className={styles.fixedButtons}>
            <Grid item className={styles.button}>
              <BackButton pathBack={pathToNews} />
            </Grid>
            <Grid item className={styles.button}>
              <SaveButton
                data-cy='save'
                type='submit'
                onClickHandler={handleSubmit}
                title={SAVE_TITLE}
                {...(id ? { disabled: !changed } : {})}
                unblockFunction={unblock}
                values={values}
                errors={errors}
              />
            </Grid>
          </Grid>
        </div>
        <Grid item xs={12}>
          <Paper className={styles.newsItemUpdate}>
            <div className={styles.imageUploadBlock}>
              <div>
                <span className={styles.imageUpload}>
                  {config.labels.news.avatarText}
                </span>

                <div className={styles.imageUploadAvatar}>
                  <ImageUploadPreviewContainer
                    handler={handleLoadAuthorImage}
                    src={uploadAuthorImage.imageUrl}
                    id={authorImageInput}
                  />
                  {touched.authorPhoto && errors.authorPhoto && (
                    <div className={styles.inputError}>
                      {errors.authorPhoto}
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
                    handler={handleLoadNewsImage}
                    src={uploadNewsImage.imageUrl}
                    id={newsImageInput}
                  />
                  {touched.newsImage && errors.newsImage && (
                    <div className={styles.inputError}>{errors.newsImage}</div>
                  )}
                </div>
              </div>
            </div>
          </Paper>
        </Grid>
        {map(languages, (lang) => (
          <LanguagePanel lang={lang} inputOptions={inputOptions} key={lang} />
        ))}
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
    languages: PropTypes.arrayOf(PropTypes.string),
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
    languages: [],
    date: '',
    image: ''
  },
  editMode: false
};

export default NewsForm;
