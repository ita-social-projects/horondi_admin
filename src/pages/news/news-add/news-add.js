import React, { useState } from 'react';
import { FormControl, Paper, TextField, Grid } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { useDispatch, useSelector } from 'react-redux';
import { useStyles } from './news-add.styles';
import { SaveButton } from '../../../components/buttons';
import { addArticle } from '../../../redux/news/news.actions';
import LoadingBar from '../../../components/loading-bar';
import Editor from '../../../components/editor';
import { config } from '../../../configs';
import useNewsHandlers from '../../../utils/use-news-handlers';

const { languages } = config;

const NewsAdd = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const loading = useSelector(({ News }) => News.newsLoading);

  const [language, setLanguage] = useState('');

  const {
    authorPhoto,
    newsImage,
    ukAuthorName,
    ukTitle,
    setAuthorPhoto,
    setNewsImage,
    ukSetAuthor,
    ukSetTitle,
    content,
    onEditorChange,
    onFilesChange
  } = useNewsHandlers();

  const newsSaveHandler = async (e) => {
    e.preventDefault();
    const news = {
      author: {
        name: [
          {
            lang: language,
            value: e.target.ukAuthorName.value
          }
        ],
        image: {
          small: e.target.authorPhoto.value
        }
      },
      title: [
        {
          lang: language,
          value: e.target.ukTitle.value
        }
      ],
      text: [
        {
          lang: language,
          value: content
        }
      ],
      images: {
        primary: {
          medium: e.target.newsImage.value
        }
      },
      date: new Date().toISOString()
    };
    dispatch(addArticle(news));
  };

  const languagesOptions = languages.map((lang, index) => (
    <MenuItem key={index} value={lang}>
      {lang}
    </MenuItem>
  ));

  if (loading) {
    return <LoadingBar />;
  }

  return (
    <div className={classes.container}>
      <form onSubmit={newsSaveHandler}>
        <div className={classes.controlsBlock}>
          <FormControl className={classes.formControl}>
            <InputLabel id='demo-simple-select-label'>Мова</InputLabel>
            <Select
              className={classes.select}
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              required
            >
              {languagesOptions}
            </Select>
          </FormControl>

          <SaveButton
            className={classes.saveButton}
            id='save'
            type='submit'
            title='Зберегти'
          />
        </div>

        <FormControl className={classes.newsAdd}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Paper className={classes.newsItemAdd}>
                <TextField
                  id='authorPhoto'
                  className={classes.textField}
                  variant='outlined'
                  label='Фото автора'
                  multiline
                  value={authorPhoto}
                  onChange={(e) => setAuthorPhoto(e.target.value)}
                  required
                />
                <TextField
                  id='newsImage'
                  className={classes.textField}
                  variant='outlined'
                  label='Головне зображення'
                  multiline
                  value={newsImage}
                  onChange={(e) => setNewsImage(e.target.value)}
                  required
                />
                <TextField
                  id='ukAuthorName'
                  className={classes.textField}
                  variant='outlined'
                  label='Автор (укр.)'
                  multiline
                  value={ukAuthorName}
                  onChange={(e) => ukSetAuthor(e.target.value)}
                  required
                />
                <TextField
                  id='ukTitle'
                  className={classes.textField}
                  variant='outlined'
                  label='Заголовок (укр.)'
                  multiline
                  value={ukTitle}
                  onChange={(e) => ukSetTitle(e.target.value)}
                  required
                />
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Editor
                value={content}
                placeholder='Текст'
                onEditorChange={onEditorChange}
                onFilesChange={onFilesChange}
              />
            </Grid>
          </Grid>
        </FormControl>
      </form>
    </div>
  );
};

export default NewsAdd;
