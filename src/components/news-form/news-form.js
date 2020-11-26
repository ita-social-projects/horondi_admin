import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { push } from 'react-router-redux';
import PropTypes from 'prop-types';
import { Paper, TextField, Grid, Tab, AppBar, Tabs } from '@material-ui/core';
import useNewsHandlers from '../../utils/use-news-handlers';
import { useStyles } from './news-form.styles';
import { SaveButton, StandardButton } from '../buttons';
import TabPanel from '../tab-panel';

import { config } from '../../configs';
import { updateArticle } from '../../redux/news/news.actions';

const { languages } = config;

const NewsForm = ({ article, id }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const {
    tabsValue,
    checkboxes,
    preferredLanguages,
    handleTabsChange,
    languageCheckboxes,
    setCheckboxes,
    setPreferredLanguages,
    createArticle
  } = useNewsHandlers();

  useEffect(() => {
    setPreferredLanguages(article.languages);
    const checkboxStates = languages.reduce(
      (obj, lang) =>
        article.languages.includes(lang)
          ? { ...obj, [lang]: true }
          : { ...obj, [lang]: false },
      {}
    );
    setCheckboxes(checkboxStates);
  }, [article, setPreferredLanguages, setCheckboxes]);

  useEffect(() => {
    const prefLanguages = [];
    Object.keys(checkboxes).forEach((key) => {
      if (checkboxes[key]) {
        prefLanguages.push(key);
      }
    });
    setPreferredLanguages(prefLanguages);
  }, [checkboxes, setPreferredLanguages]);

  const languageTabs =
    preferredLanguages.length > 0
      ? preferredLanguages.map((lang, index) => <Tab label={lang} key={lang} />)
      : null;

  const { values, handleSubmit, handleChange } = useFormik({
    initialValues: {
      authorPhoto: article.author.image.small || '',
      newsImage: article.images.primary.medium || '',
      ukAuthorName: article.author.name[0].value || '',
      enAuthorName: article.author.name[1].value || '',
      ukTitle: article.title[0].value || '',
      enTitle: article.title[1].value || '',
      ukText: article.text[0].value || '',
      enText: article.text[1].value || ''
    },
    onSubmit: () => {
      const newArticle = createArticle(values);
      dispatch(updateArticle({ id, newArticle }));
    }
  });

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className={classes.controlsBlock}>
          <div>{languageCheckboxes}</div>
          <SaveButton
            className={classes.saveButton}
            data-cy='save'
            type='submit'
            title='Зберегти'
          />
        </div>
        <Grid item xs={12}>
          <Paper className={classes.newsItemUpdate}>
            <TextField
              data-cy='authorPhoto'
              id='authorPhoto'
              className={classes.textField}
              variant='outlined'
              label='Фото автора'
              value={values.authorPhoto}
              onChange={handleChange}
              required
            />
            <TextField
              data-cy='newsImage'
              id='newsImage'
              className={classes.textField}
              variant='outlined'
              label='Головне зображення'
              value={values.newsImage}
              onChange={handleChange}
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
            {languageTabs}
          </Tabs>
        </AppBar>
        {preferredLanguages.map((lang, index) => (
          <TabPanel key={index} value={tabsValue} index={index}>
            <Paper className={classes.newsItemUpdate}>
              <TextField
                data-cy={`${lang}AuthorName`}
                id={`${lang}AuthorName`}
                className={classes.textField}
                variant='outlined'
                label={`Ім'я автора`}
                multiline
                value={values[`${lang}AuthorName`]}
                onChange={handleChange}
                required
              />
              <TextField
                data-cy={`${lang}Title`}
                id={`${lang}Title`}
                className={classes.textField}
                variant='outlined'
                label='Заголовок'
                multiline
                value={values[`${lang}Title`]}
                onChange={handleChange}
                required
              />
              <TextField
                data-cy={`${lang}Text`}
                id={`${lang}Text`}
                className={classes.textField}
                variant='outlined'
                label='Текст'
                multiline
                value={values[`${lang}Text`]}
                onChange={handleChange}
                required
              />
            </Paper>
          </TabPanel>
        ))}
      </form>

      <div className={classes.controlsBlock}>
        <StandardButton
          id='back'
          title={config.buttonTitles.GO_BACK_TITLE}
          variant='outlined'
          onClickHandler={() => dispatch(push(config.routes.pathToNews))}
          data-cy='back-btn'
        />
      </div>
    </div>
  );
};

NewsForm.propTypes = {
  id: PropTypes.string.isRequired,
  article: PropTypes.shape({
    languages: PropTypes.arrayOf.isRequired,
    author: PropTypes.shape({
      name: PropTypes.arrayOf.isRequired,
      image: PropTypes.shape({
        small: PropTypes.string
      }).isRequired
    }),
    title: PropTypes.arrayOf.isRequired,
    text: PropTypes.arrayOf.isRequired,
    images: PropTypes.shape({
      primary: PropTypes.shape({
        medium: PropTypes.string
      }).isRequired
    }).isRequired
  }).isRequired
};

export default NewsForm;
