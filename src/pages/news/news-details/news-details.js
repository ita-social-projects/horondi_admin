import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import { Paper, TextField, Grid, Tab, AppBar, Tabs } from '@material-ui/core';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import useNewsHandlers from '../../../utils/use-news-handlers';
import { useStyles } from './news-details.styles';
import { SaveButton } from '../../../components/buttons';
import TabPanel from '../../../components/tab-panel';
import LoadingBar from '../../../components/loading-bar';

import { getArticle, updateArticle } from '../../../redux/news/news.actions';

import { config } from '../../../configs';

const { languages } = config;

const NewsDetails = ({ match }) => {
  const { id } = match.params;

  const dispatch = useDispatch();
  const { loading, newsArticle } = useSelector(({ News }) => ({
    loading: News.newsLoading,
    newsArticle: News.newsArticle
  }));
  const classes = useStyles();
  const {
    authorPhoto,
    checkboxes,
    tabsValue,
    newsImage,
    ukAuthorName,
    ukText,
    ukTitle,
    enAuthorName,
    enText,
    enTitle,
    preferredLanguages,
    setAuthorPhoto,
    setNewsImage,
    ukSetAuthor,
    ukSetText,
    ukSetTitle,
    enSetAuthor,
    enSetText,
    enSetTitle,
    setPreferredLanguages,
    setCheckboxes,
    handleTabsChange,
    languageCheckboxes,
    createArticle
  } = useNewsHandlers();

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
      setPreferredLanguages(newsArticle.languages);

      const checkboxStates = languages.reduce(
        (obj, lang) =>
          newsArticle.languages.includes(lang)
            ? { ...obj, [lang]: true }
            : { ...obj, [lang]: false },
        {}
      );
      setCheckboxes(checkboxStates);
    }
  }, [
    setCheckboxes,
    newsArticle,
    setAuthorPhoto,
    setNewsImage,
    ukSetAuthor,
    ukSetText,
    ukSetTitle,
    enSetAuthor,
    enSetText,
    enSetTitle,
    setPreferredLanguages
  ]);

  useEffect(() => {
    const prefLanguages = [];
    Object.keys(checkboxes).forEach((key) => {
      if (checkboxes[key] === true) {
        prefLanguages.push(key);
      }
    });
    setPreferredLanguages(prefLanguages);
  }, [checkboxes, setPreferredLanguages]);

  const LanguageTabs =
    preferredLanguages.length > 0
      ? preferredLanguages.map((lang, index) => (
        <Tab label={lang} key={index} />
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
            enText
          }}
          onSubmit={(values, actions) => {
            const newArticle = createArticle(values);
            dispatch(updateArticle({ id, newArticle }));
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
                  value={tabsValue}
                  onChange={handleTabsChange}
                  aria-label='simple tabs example'
                >
                  {LanguageTabs}
                </Tabs>
              </AppBar>
              {preferredLanguages.map((lang, index) => (
                <TabPanel key={index} value={tabsValue} index={index}>
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
  handleSubmit: PropTypes.func,
  values: PropTypes.shape({
    authorPhoto: PropTypes.string,
    newsImage: PropTypes.string
  }),
  handleChange: PropTypes.func,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    })
  }).isRequired
};

NewsDetails.defaultProps = {
  values: {},
  handleChange: () => {},
  handleSubmit: () => {}
};

export default withRouter(NewsDetails);
