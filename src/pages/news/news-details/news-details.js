import React, { useEffect, useState } from 'react';
import {
  Paper,
  TextField,
  Grid,
  Tab,
  AppBar,
  Tabs,
  FormControlLabel,
  Checkbox
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import { Formik } from 'formik';
import TabPanel from '../../../components/tab-panel';
import { useStyles } from './news-details.styles';
import { config } from '../../../configs';
import useNewsHandlers from '../../../utils/use-news-handlers';
import { SaveButton } from '../../../components/buttons';
import LoadingBar from '../../../components/loading-bar';
import { getArticle, updateArticle } from '../../../redux/news/news.actions';

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

const { languages } = config;
const NewsDetails = ({ match }) => {
  const dispatch = useDispatch();
  const preferredLanguages = ['uk'];
  const checkboxStates = languages.map((lang) => {
    if (preferredLanguages.includes(lang)) {
      return { [lang]: true };
    }
    return { [lang]: false };
  });
  const { loading, newsArticle } = useSelector(({ News }) => ({
    loading: News.newsLoading,
    newsArticle: News.newsArticle
  }));
  const classes = useStyles();
  const {
    authorPhoto,
    newsImage,
    ukAuthorName,
    ukText,
    ukTitle,
    enAuthorName,
    enText,
    enTitle,
    setAuthorPhoto,
    setNewsImage,
    ukSetAuthor,
    ukSetText,
    ukSetTitle,
    enSetAuthor,
    enSetText,
    enSetTitle
  } = useNewsHandlers();
  const { id } = match.params;
  const [value, setValue] = useState(0);
  const [checkboxes, setCheckboxes] = useState(
    Object.assign(...checkboxStates)
  );
  console.log(checkboxes);
  useEffect(() => {
    dispatch(getArticle(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (newsArticle !== null) {
      setAuthorPhoto(newsArticle.author.image.small);
      setNewsImage(newsArticle.images.primary.medium);

      ukSetAuthor(newsArticle.author.name[0].value || '');
      ukSetText(newsArticle.text[0].value || '');
      ukSetTitle(newsArticle.title[0].value || '');

      enSetAuthor(newsArticle.author.name[1].value || '');
      enSetText(newsArticle.text[1].value || '');
      enSetTitle(newsArticle.title[1].value || '');
    }
  }, [
    newsArticle,
    setAuthorPhoto,
    setNewsImage,
    ukSetAuthor,
    ukSetText,
    ukSetTitle,
    enSetAuthor,
    enSetText,
    enSetTitle
  ]);

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
    <div className={classes.detailsContainer}>
      {newsArticle !== null ? (
        <Formik
          initialValues={{
            authorPhoto,
            newsImage,
            ukAuthorName,
            ukText,
            ukTitle,
            enAuthorName,
            enTitle,
            enText,
            name: ''
          }}
          onSubmit={(values, actions) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              actions.setSubmitting(false);
            }, 1000);
          }}
        >
          {(props) => (
            <form onSubmit={props.handleSubmit}>
              <div className={classes.controlsBlock}>
                <div>{languageCheckboxes}</div>
                <SaveButton
                  className={classes.saveButton}
                  id='save'
                  type='submit'
                  title='Зберегти'
                />
              </div>
              <Grid item xs={12}>
                <Paper className={classes.newsItemUpdate}>
                  <TextField
                    id='authorPhoto'
                    className={classes.textField}
                    variant='outlined'
                    label='Фото автора'
                    value={props.values.authorPhoto}
                    onChange={props.handleChange}
                    required
                  />
                  <TextField
                    id='newsImage'
                    className={classes.textField}
                    variant='outlined'
                    label='Головне зображення'
                    value={props.values.newsImage}
                    onChange={props.handleChange}
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
              {preferredLanguages.map((lang, index) => (
                <TabPanel key={index} value={value} index={index}>
                  <Paper className={classes.newsItemUpdate}>
                    <TextField
                      id={`${lang}AuthorName`}
                      className={classes.textField}
                      variant='outlined'
                      label={`Автор ${lang}`}
                      multiline
                      value={props.values[`${lang}AuthorName`]}
                      onChange={props.handleChange}
                      required
                    />
                    <TextField
                      id={`${lang}Title`}
                      className={classes.textField}
                      variant='outlined'
                      label={`Заголовок ${lang}`}
                      multiline
                      value={props.values[`${lang}Title`]}
                      onChange={props.handleChange}
                      required
                    />
                    <TextField
                      id={`${lang}Text`}
                      className={classes.textField}
                      variant='outlined'
                      label={`Текст ${lang}`}
                      multiline
                      value={props.values[`${lang}Text`]}
                      onChange={props.handleChange}
                      required
                    />
                  </Paper>
                </TabPanel>
              ))}
            </form>
          )}
        </Formik>
      ) : null}
    </div>
  );
};

NewsDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    })
  }).isRequired
};

export default withRouter(NewsDetails);
