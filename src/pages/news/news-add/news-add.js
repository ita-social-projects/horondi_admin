import React, { useState } from 'react';
import {
  TextField,
  Paper,
  Grid,
  Tabs,
  Tab,
  AppBar,
  FormControlLabel
} from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useStyles } from './news-add.styles';
import TabPanel from '../../../components/tab-panel';
import { SaveButton } from '../../../components/buttons';
import LoadingBar from '../../../components/loading-bar';
import { addArticle } from '../../../redux/news/news.actions';
import { config } from '../../../configs';

const { languages } = config;
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

const NewsAdd = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const loading = useSelector(({ News }) => News.newsLoading);

  const preferredLanguages = [];
  const checkboxStates = languages.map((lang) => ({ [lang]: false }));
  const [checkboxes, setCheckboxes] = useState(
    Object.assign(...checkboxStates)
  );
  const [value, setValue] = useState(0);

  for (const [key, value] of Object.entries(checkboxes)) {
    if (value === true) {
      preferredLanguages.push(key);
    }
  }

  const handleTabsChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChange = (event) => {
    setCheckboxes({ ...checkboxes, [event.target.name]: event.target.checked });
  };

  const languageCheckboxes = languages.map((lang, index) => (
    <FormControlLabel
      key={index}
      control={
        <Checkbox
          checked={checkboxes[`${lang}`]}
          onChange={handleChange}
          name={`${lang}`}
          color='primary'
        />
      }
      label={lang}
    />
  ));

  const langValues = languages.map((lang) => ({
    [`${lang}AuthorName`]: '',
    [`${lang}Title`]: '',
    [`${lang}Text`]: ''
  }));

  const formikValues =
    langValues !== null ? Object.assign(...langValues) : null;
  const formik = useFormik({
    initialValues: {
      ...formikValues,
      authorPhoto: '',
      newsImage: ''
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      const news = {
        author: {
          name: [
            {
              lang: languages[0],
              value: values.ukAuthorName || null
            },
            {
              lang: languages[1],
              value: values.enAuthorName || null
            }
          ],
          image: {
            small: values.authorPhoto
          }
        },
        title: [
          {
            lang: languages[0],
            value: values.ukTitle || null
          },
          {
            lang: languages[1],
            value: values.enTitle || null
          }
        ],
        text: [
          {
            lang: languages[0],
            value: values.ukText || null
          },
          {
            lang: languages[1],
            value: values.enText || null
          }
        ],
        images: {
          primary: {
            medium: values.newsImage
          }
        },
        date: new Date().toISOString()
      };
      dispatch(addArticle(news));
    }
  });

  const TabPanels =
    preferredLanguages.length > 0
      ? preferredLanguages.map((lang, index) => (
        <TabPanel key={index} value={value} index={index}>
          <Paper className={classes.newsItemAdd}>
            <TextField
              id={`${lang}AuthorName`}
              className={classes.textfield}
              variant='outlined'
              label={`Автор ${lang}`}
              multiline
              value={formik.values.uaAuthorName}
              onChange={formik.handleChange}
              required
            />
            <TextField
              id={`${lang}Title`}
              className={classes.textfield}
              variant='outlined'
              label={`Заголовок ${lang}`}
              multiline
              value={formik.values[`${lang}Title`]}
              onChange={formik.handleChange}
              required
            />
            <TextField
              id={`${lang}Text`}
              className={classes.textfield}
              variant='outlined'
              label={`Текст ${lang}`}
              multiline
              value={formik.values[`${lang}Text`]}
              onChange={formik.handleChange}
              required
            />
          </Paper>
        </TabPanel>
      ))
      : null;

  const LanguageTabs =
    preferredLanguages.length > 0
      ? preferredLanguages.map((lang, index) => (
        <Tab label={lang} key={index} {...a11yProps(index)} />
      ))
      : null;

  if (loading) {
    return <LoadingBar />;
  }

  return (
    <div className={classes.container}>
      <form onSubmit={formik.handleSubmit}>
        <div className={classes.controlsBlock}>
          <div>{languageCheckboxes}</div>
          <SaveButton
            className={classes.saveButton}
            id='save'
            type='submit'
            title='Зберегти'
          />
        </div>
        {preferredLanguages.length > 0 ? (
          <div>
            <Grid item xs={12}>
              <Paper className={classes.newsItemAdd}>
                <TextField
                  id='authorPhoto'
                  className={classes.textfield}
                  variant='outlined'
                  label='Фото автора'
                  value={formik.values.authorPhoto}
                  onChange={formik.handleChange}
                  required
                />
                <TextField
                  id='newsImage'
                  className={classes.textfield}
                  variant='outlined'
                  label='Головне зображення'
                  value={formik.values.newsImage}
                  onChange={formik.handleChange}
                  required
                />
              </Paper>
            </Grid>
            <AppBar position='static'>
              <Tabs
                className={classes.tabs}
                value={value}
                onChange={handleTabsChange}
                aria-label='simple tabs example'
              >
                {LanguageTabs}
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
