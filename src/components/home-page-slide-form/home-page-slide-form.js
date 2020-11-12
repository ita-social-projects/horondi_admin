import React from 'react';
import { useDispatch } from 'react-redux';
import { AppBar, Button, Grid, Paper, Tab, Tabs, TextField, Typography } from '@material-ui/core';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import { useStyles } from './home-page-slide-form.styles';
import { config } from '../../configs';
import useHomePageSlideHandlers from '../../utils/use-home-page-slide-handlers';
import CheckboxOptions from '../checkbox-options';
import ImageUploadContainer from '../../containers/image-upload-container';
import TabPanel from '../tab-panel';
import { SaveButton } from '../buttons';
import { addSlide, updateSlide } from '../../redux/home-page-slides/home-page-slides.actions';

const { languages } = config;

const {
  SLIDE_VALIDATION_ERROR,
} = config.homePageSlideErrorMessages;
const {preview}=config.titles.homePageSliderTitle
const HomePageSlideForm=({ slide, id, slideOrder }) =>{
  const styles = useStyles();
  const dispatch = useDispatch();
  const {discoverMoreTitle,discoverMoreSymbol} = config.titles.homePageSliderTitle;
  const {
    slideImage,
    setSlideImage,
    tabsValue,
    handleTabsChange,
    createSlide,
    upload,
    setUpload,
  } = useHomePageSlideHandlers();

  const languageTabs =
    languages.length > 0
      ? languages.map((lang) => <Tab label={lang} data-cy={lang} key={lang} />)
      : null;

  const slideValidationSchema = Yup.object().shape({
    enDescription: Yup.string()
      .min(2, SLIDE_VALIDATION_ERROR),
    enTitle: Yup.string()
      .min(2, SLIDE_VALIDATION_ERROR),
    ukDescription: Yup.string()
      .min(2, SLIDE_VALIDATION_ERROR),
    ukTitle: Yup.string()
      .min(2, SLIDE_VALIDATION_ERROR),
    link: Yup.string()
      .min(2, SLIDE_VALIDATION_ERROR)
  });

  const {
    values,
    handleSubmit,
    handleChange,
    touched,
    errors,
    setFieldValue
  } = useFormik({
    validationSchema: slideValidationSchema,
    initialValues: {
      slideImage: slide.images.large || '',
      ukTitle: slide.title[0].value || '',
      enTitle: slide.title[1].value || '',
      ukDescription: slide.description[0].value || '',
      enDescription: slide.description[1].value || '',
      link: slide.link || '',
      show: slide.show || false,
      order:slide.order||slideOrder
    },

    onSubmit: () => {
      (()=>{
        if(values.show&&slide.show){
          values.order = slide.order
          return
        }
        if(values.show){
          values.order = slideOrder
          return
        }
        if(!values.show){
          values.order = 0
        }
      })()
      const newSlide = createSlide(values);

      if(id&&upload.name){
        dispatch(updateSlide({id,slide:newSlide,upload}))
        return
      }
      if(id){
        dispatch(updateSlide({id,slide:newSlide}))
        return
      }
      dispatch(addSlide({ slide: newSlide, upload }));
    }
  });
  console.log(values, slide)
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
  const tabPanelField = (language, textField)=>(
    <TextField
      data-cy={`${language}${textField}`}
      id={`${language}${textField}`}
      className={styles.textField}
      variant='outlined'
      label={config.labels.homePageSlide.title}
      multiline
      value={values[`${language}${textField}`]}
      onChange={handleChange}
      error={touched[`${language}${textField}`] && !!errors[`${language}${textField}`]}
    /> )

  const handleImageLoad = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFieldValue('slideImage', event.target.result);
        setSlideImage(event.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
      setUpload(e.target.files[0]);
    }
  };

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit}>
        <CheckboxOptions options={checkboxes} />

        <Grid item xs={12}>
          <Paper className={styles.slideItemUpdate}>
            <span className={styles.imageUpload}>
              {config.labels.homePageSlide.image}
            </span>
            <ImageUploadContainer
              handler={handleImageLoad}
              srcForAvatar={
                slideImage ||`${config.IMG_URL}${slide.images.large}`
              }
              fileName={upload.name || slide.images.large}
            />
            <TextField
              data-cy='link'
              id='link'
              className={styles.textField}
              variant='outlined'
              label={config.labels.homePageSlide.link}
              value={values.link}
              onChange={handleChange}
              error={touched.link && !!errors.link}
            />
            {touched.link && errors.link && (
              <div data-cy='slide-error' className={styles.inputError}>
                {errors.link}
              </div>
            )}
          </Paper>
        </Grid>
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
        {languages.map((lang, index) => (
          <TabPanel key={`${lang}${index}`} value={tabsValue} index={index}>
            <Paper className={styles.slideItemUpdate}>
              {tabPanelField(lang, 'Title')}
              {touched[`${lang}Title`] && errors[`${lang}Title`] && (
                <div
                  data-cy={`${lang}Title-error`}
                  className={styles.inputError}
                >
                  {errors[`${lang}Name`]}
                </div>
              )}
              {tabPanelField(lang, 'Description')}
              {touched[`${lang}Description`] && errors[`${lang}Description`] && (
                <div
                  data-cy={`${lang}Description-error`}
                  className={styles.inputError}
                >
                  {errors[`${lang}Description`]}
                </div>
              )}
            </Paper>
          </TabPanel>
        ))}

        <Button
          id='contactsBack'
          component={Link}
          to={config.routes.pathToHomePageSlides}
          variant='outlined'
          color='primary'
          className={styles.formButton}
          data-cy='goBackButton'
        >
          {config.buttonTitles.GO_BACK_TITLE}
        </Button>
        <SaveButton
          className={styles.formButton}
          data-cy='save'
          type='submit'
          title={config.buttonTitles.CREATE_SLIDE_TITLE}
        />
      </form>
      <Typography variant='h1' className={styles.slideTitle}>
        {preview}
      </Typography>
      <Paper
        elevation={5}
        className={styles.slideWrapper}
      >
        <Avatar variant='square'
          className={styles.square}
          src={
            slideImage ||`${config.IMG_URL}${slide.images.large}`
          }
          color='primary'
        >
          <ImageIcon className={styles.slideIcon} />
        </Avatar>
        <div className={styles.slideContent}>
          <div className={styles.mainContent}>
            <h3 className={styles.mainContentTitle}>{values.ukTitle}</h3>
            <p className={styles.mainContentDescription}>{values.ukDescription}</p>
          </div>
          <p className={styles.discoverMore}> {discoverMoreTitle}
            <span>{discoverMoreSymbol}</span></p>
        </div>
      </Paper>
    </div>
  );
}

const valueShape = PropTypes.shape({
  value: PropTypes.string
});
HomePageSlideForm.propTypes = {
  id: PropTypes.string,
  slideOrder:PropTypes.number,
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
    ukTitle: PropTypes.string,
    enTitle: PropTypes.string,
    ukDescription: PropTypes.string,
    enDescription: PropTypes.string,
    link: PropTypes.string
  }),
  errors: PropTypes.shape({
    slideImage: PropTypes.string,
    ukTitle: PropTypes.string,
    enTitle: PropTypes.string,
    ukDescription: PropTypes.string,
    enDescription: PropTypes.string,
    link: PropTypes.string
  }),
  touched: PropTypes.shape({
    slideImage: PropTypes.string,
    ukTitle: PropTypes.string,
    enTitle: PropTypes.string,
    ukDescription: PropTypes.string,
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
  slideOrder:0,
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
