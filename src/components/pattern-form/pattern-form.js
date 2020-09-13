import React, from 'react';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Paper, TextField, Grid, Tab, AppBar, Tabs } from '@material-ui/core';
import usePatternHandlers from '../../utils/use-pattern-handlers';
import { useStyles } from './pattern-form.styles';
import { SaveButton } from '../buttons';
import TabPanel from '../tab-panel';

import { config } from '../../configs';
import { updatePattern } from '../../redux/pattern/pattern.actions';

const { languages } = config;

const NewsForm = ({ pattern, id }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const {
    tabsValue,

    handleTabsChange,

    createPattern
  } = usePatternHandlers();

  const languageTabs =
    languages.length > 0
      ? languages.map((lang, index) => <Tab label={lang} key={lang} />)
      : null;

  const { values, handleSubmit, handleChange } = useFormik({
    initialValues: {
      patternImage: pattern.images.thumbnail || '',
      ukName: pattern.name[0].value || '',
      enName: pattern.name[1].value || '',
      ukDescription: pattern.description[0].value || '',
      enDescription: pattern.description[1].value || '',
      material: pattern.material,
      available: pattern.available || ''
    },
    onSubmit: () => {
      const newPattern = createPattern(values);
      dispatch(updatePattern({ id, newPattern }));
    }
  });

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className={classes.controlsBlock}>
          <h2>hello</h2>
          {/* <div>{languageCheckboxes}</div> */}
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
        {languages.map((lang, index) => (
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
    </div>
  );
};

NewsForm.propTypes = {
  id: PropTypes.string.isRequired,
  pattern: PropTypes.shape({
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
