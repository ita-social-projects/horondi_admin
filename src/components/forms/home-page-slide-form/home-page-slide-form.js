import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Grid, Paper, TextField, Typography } from '@material-ui/core';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import { useStyles } from './home-page-slide-form.styles';
import { config } from '../../../configs';
import useHomePageSlideHandlers from '../../../utils/use-home-page-slide-handlers';
import CheckboxOptions from '../../checkbox-options';
import ImageUploadContainer from '../../../containers/image-upload-container';
import { BackButton, SaveButton } from '../../buttons';
import {
  addSlide,
  updateSlide
} from '../../../redux/home-page-slides/home-page-slides.actions';
import LanguagePanel from '../language-panel';
import { getHomePageSlidesInitialValues } from '../../../utils/home-page-slides';
import { useUnsavedChangesHandler } from '../../../hooks/form-dialog/use-unsaved-changes-handler';
import { setMapImageHandler as imageHandler } from '../../../utils/contacts-form';

const { languages } = config;
const { imagePrefix } = config;

const {
  NOT_EN_DESCRIPTION_MESSAGE,
  NOT_EN_NAME_MESSAGE,
  NOT_UA_NAME_MESSAGE,
  NOT_UA_DESCRIPTION_MESSAGE
} = config.homePageSlideErrorMessages;
const { MIN_LENGTH_MESSAGE, ERROR_MESSAGE } = config.commonErrorMessages;
const { preview } = config.titles.homePageSliderTitle;
const HomePageSlideForm = ({ slide, id, slideOrder }) => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const { discoverMoreTitle, discoverMoreSymbol } =
    config.titles.homePageSliderTitle;
  const {
    slideImage,
    createSlide,
    upload,
    uploadImage,
    setUploadImage,
    setSlideImage,
    setUpload
  } = useHomePageSlideHandlers();

  const { pathToHomePageSlides } = config.routes;

  const {
    imageUploadSlideInputsId: { imageInput }
  } = config;

  useEffect(() => {
    if (slide.images.large) {
      setUploadImage({
        imgUrl: `${imagePrefix}${slide.images.large}`
      });
    }
  }, [dispatch, slide]);

  const slideValidationSchema = Yup.object().shape({
    enDescription: Yup.string()
      .min(2, MIN_LENGTH_MESSAGE)
      .matches(config.formRegExp.enDescription, NOT_EN_DESCRIPTION_MESSAGE)
      .required(ERROR_MESSAGE),
    enTitle: Yup.string()
      .min(2, MIN_LENGTH_MESSAGE)
      .matches(config.formRegExp.enNameCreation, NOT_EN_NAME_MESSAGE)
      .required(ERROR_MESSAGE),
    uaDescription: Yup.string()
      .min(2, MIN_LENGTH_MESSAGE)
      .matches(config.formRegExp.uaDescription, NOT_UA_DESCRIPTION_MESSAGE)
      .required(ERROR_MESSAGE),
    uaTitle: Yup.string()
      .min(2, MIN_LENGTH_MESSAGE)
      .matches(config.formRegExp.uaNameCreation, NOT_UA_NAME_MESSAGE)
      .required(ERROR_MESSAGE),
    link: Yup.string().min(2, MIN_LENGTH_MESSAGE).required(ERROR_MESSAGE)
  });

  const {
    values,
    handleSubmit,
    handleChange,
    touched,
    errors,
    setFieldValue,
    handleBlur
  } = useFormik({
    validationSchema: slideValidationSchema,
    initialValues: getHomePageSlidesInitialValues(slide, slideOrder),

    onSubmit: () => {
      (() => {
        if (values.show && slide.show) {
          values.order = slide.order;
          return;
        }
        if (values.show) {
          values.order = slideOrder;
          return;
        }
        if (!values.show) {
          values.order = 0;
        }
      })();
      const newSlide = createSlide(values);

      if (id && upload.name) {
        dispatch(updateSlide({ id, slide: newSlide, upload }));
        return;
      }
      if (id) {
        dispatch(updateSlide({ id, slide: newSlide }));
        return;
      }
      dispatch(addSlide({ slide: newSlide, upload }));
    }
  });

  const unblock = useUnsavedChangesHandler(values);

  const checkboxes = [
    {
      id: 'show',
      dataCy: 'show',
      value: values.show,
      checked: values.show,
      color: 'primary',
      label: config.labels.homePageSlide.show,
      handler: () => setFieldValue('show', !values.show)
    }
  ];

  const handleImageLoad = (files) => {
    if (files && files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFieldValue('slideImage', event.target.result);
        setSlideImage(event.target.result);
      };
      reader.readAsDataURL(files[0]);
      setUpload(files[0]);
    }

    imageHandler(files, setUploadImage, values, slideImage);
  };

  const inputs = [
    { label: config.labels.homePageSlide.title, name: 'title' },
    { label: config.labels.homePageSlide.description, name: 'description' }
  ];
  const inputOptions = {
    errors,
    touched,
    handleChange,
    values,
    inputs,
    handleBlur
  };

  const eventPreventHandler = (e) => {
    e.preventDefault();
  };
  const buttonTitle = slide._id
    ? config.buttonTitles.SAVE_TITLE
    : config.buttonTitles.CREATE_SLIDE_TITLE;
  return (
    <div className={styles.formContainer}>
      <form onSubmit={(e) => eventPreventHandler(e)}>
        <div className={styles.buttonContainer}>
          <Grid container spacing={2} className={styles.fixedButtons}>
            <Grid item className={styles.button}>
              <BackButton pathBack={pathToHomePageSlides} />
            </Grid>
            <Grid item className={styles.button}>
              <SaveButton
                data-cy='save'
                onClickHandler={handleSubmit}
                type='submit'
                title={buttonTitle}
                values={values}
                errors={errors}
                unblockFunction={unblock}
              />
            </Grid>
          </Grid>
        </div>
        <div>
          <CheckboxOptions options={checkboxes} />
        </div>
        <Grid item xs={12}>
          <Paper className={styles.slideItemUpdate}>
            <span className={styles.imageUpload}>
              {config.labels.homePageSlide.image}
            </span>
            <div className={styles.imageUploadAvatar}>
              <ImageUploadContainer
                handler={handleImageLoad}
                src={uploadImage.imageUrl}
                id={imageInput}
              />
            </div>
            <TextField
              data-cy='link'
              id='link'
              className={styles.textField}
              variant='outlined'
              label={config.labels.homePageSlide.link}
              value={values.link}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.link && !!errors.link}
            />
            {touched.link && errors.link && (
              <div data-cy='slide-error' className={styles.inputError}>
                {errors.link}
              </div>
            )}
          </Paper>
        </Grid>
        {languages.map((lang, index) => (
          <LanguagePanel lang={lang} inputOptions={inputOptions} key={lang} />
        ))}
      </form>
      <Typography variant='h1' className={styles.slideTitle}>
        {preview}
      </Typography>
      <Paper elevation={5} className={styles.slideWrapper}>
        <Avatar
          variant='square'
          className={styles.square}
          src={slideImage || `${config.IMG_URL}${slide.images.large}`}
          color='primary'
        >
          <ImageIcon className={styles.slideIcon} />
        </Avatar>
        <div className={styles.slideContent}>
          <div className={styles.mainContent}>
            <h3 className={styles.mainContentTitle}>{values.uaTitle}</h3>
            <p className={styles.mainContentDescription}>
              {values.uaDescription}
            </p>
          </div>
          <p className={styles.discoverMore}>
            {' '}
            {discoverMoreTitle}
            <span>{discoverMoreSymbol}</span>
          </p>
        </div>
      </Paper>
    </div>
  );
};

const valueShape = PropTypes.shape({
  value: PropTypes.string
});
HomePageSlideForm.propTypes = {
  id: PropTypes.string,
  slideOrder: PropTypes.number,
  slide: PropTypes.shape({
    _id: PropTypes.string,
    show: PropTypes.bool,
    description: PropTypes.arrayOf(valueShape),
    images: PropTypes.shape({
      large: PropTypes.string
    }),
    link: PropTypes.string,
    order: PropTypes.number,
    title: PropTypes.arrayOf(valueShape)
  }),
  values: PropTypes.shape({
    slideImage: PropTypes.string,
    uaTitle: PropTypes.string,
    enTitle: PropTypes.string,
    uaDescription: PropTypes.string,
    enDescription: PropTypes.string,
    link: PropTypes.string
  }),
  errors: PropTypes.shape({
    slideImage: PropTypes.string,
    uaTitle: PropTypes.string,
    enTitle: PropTypes.string,
    uaDescription: PropTypes.string,
    enDescription: PropTypes.string,
    link: PropTypes.string
  }),
  touched: PropTypes.shape({
    slideImage: PropTypes.string,
    uaTitle: PropTypes.string,
    enTitle: PropTypes.string,
    uaDescription: PropTypes.string,
    enDescription: PropTypes.string,
    link: PropTypes.string
  }),
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string
    })
  })
};
HomePageSlideForm.defaultProps = {
  id: '',
  slideOrder: 0,
  match: {},
  values: {},
  errors: {},
  touched: {},
  slide: {
    _id: '',
    title: [
      {
        value: ''
      },
      {
        value: ''
      }
    ],
    description: [
      {
        value: ''
      },
      {
        value: ''
      }
    ],
    images: {
      thumbnail: ''
    },
    link: '',
    show: false
  }
};

export default HomePageSlideForm;
