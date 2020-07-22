import React, { useEffect } from 'react';
import { Paper, TextField, FormControl, Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import { useStyles } from './news-details.styles';
import { SaveButton } from '../../../components/buttons';
import { config } from '../../../configs';
import useNewsHandlers from '../../../utils/use-news-handlers';

import LoadingBar from '../../../components/loading-bar';
import { getNewsItem, updateNewsItem } from '../../../redux/news/news.actions';

const { languages } = config;
const NewsDetails = ({ match }) => {
  const dispatch = useDispatch();
  const { loading, newsItem } = useSelector(({ News }) => ({
    loading: News.loading,
    newsItem: News.newsItem
  }));
  const classes = useStyles();

  const {
    authorPhoto,
    newsImage,
    newsVideo,
    ukAuthorName,
    ukText,
    ukTitle,
    enAuthorName,
    enText,
    enTitle,
    setAuthorPhoto,
    setNewsImage,
    setNewsVideo,
    ukSetAuthor,
    ukSetText,
    ukSetTitle,
    enSetAuthor,
    enSetText,
    enSetTitle
  } = useNewsHandlers();

  const { id } = match.params;
  useEffect(() => {
    dispatch(getNewsItem(id));

    setAuthorPhoto(newsItem.author.image.small);
    setNewsImage(newsItem.images.primary.medium);
    setNewsVideo(newsItem.video);

    ukSetAuthor(newsItem.author.name[0].value);
    ukSetText(newsItem.text[0].value);
    ukSetTitle(newsItem.title[0].value);

    enSetAuthor(newsItem.author.name[1].value);
    enSetText(newsItem.text[1].value);
    enSetTitle(newsItem.title[1].value);
  }, [
    newsItem,
    dispatch,
    id,
    setAuthorPhoto,
    setNewsImage,
    setNewsVideo,
    ukSetAuthor,
    ukSetText,
    ukSetTitle,
    enSetAuthor,
    enSetText,
    enSetTitle
  ]);

  const newsSaveHandler = async (e) => {
    e.preventDefault();
    const newNewsItem = {
      video: newsVideo,
      author: {
        name: [
          {
            lang: languages[0],
            value: ukAuthorName
          },
          {
            lang: languages[1],
            value: enAuthorName
          }
        ],
        image: {
          small: authorPhoto
        }
      },
      title: [
        {
          lang: languages[0],
          value: ukTitle
        },
        {
          lang: languages[1],
          value: enTitle
        }
      ],
      text: [
        {
          lang: languages[0],
          value: ukText
        },
        {
          lang: languages[1],
          value: enText
        }
      ],
      images: {
        primary: {
          medium: newsImage
        }
      }
    };
    dispatch(updateNewsItem({ id, newNewsItem }));
  };

  if (loading) {
    return <LoadingBar />;
  }

  return (
    <div className={classes.detailsContainer}>
      <form className={classes.form} onSubmit={newsSaveHandler}>
        <FormControl className={classes.newsDetails}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Paper className={classes.newsItemUpdate}>
                <TextField
                  id='authorPhoto'
                  className={classes.textField}
                  variant='outlined'
                  label='Фото автора'
                  multiline
                  InputLabelProps={{
                    classes: {
                      root: classes.inputLabel,
                      shrink: 'shrink'
                    }
                  }}
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
                  InputLabelProps={{
                    classes: {
                      root: classes.inputLabel,
                      shrink: 'shrink'
                    }
                  }}
                  value={newsImage}
                  onChange={(e) => setNewsImage(e.target.value)}
                  required
                />
                <TextField
                  id='newsVideo'
                  className={classes.textField}
                  variant='outlined'
                  label='Посилання на відео'
                  multiline
                  InputLabelProps={{
                    classes: {
                      root: classes.inputLabel,
                      shrink: 'shrink'
                    }
                  }}
                  value={newsVideo}
                  onChange={(e) => setNewsVideo(e.target.value)}
                  required
                />
              </Paper>
            </Grid>

            <Grid item xs={6}>
              <Paper className={classes.newsItemUpdate}>
                <TextField
                  id='ukAuthorName'
                  className={classes.textField}
                  variant='outlined'
                  label='Автор (укр.)'
                  multiline
                  InputLabelProps={{
                    classes: {
                      root: classes.inputLabel,
                      shrink: 'shrink'
                    }
                  }}
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
                  InputLabelProps={{
                    classes: {
                      root: classes.inputLabel,
                      shrink: 'shrink'
                    }
                  }}
                  value={ukTitle}
                  onChange={(e) => ukSetTitle(e.target.value)}
                  required
                />
                <TextField
                  id='ukText'
                  className={classes.textField}
                  variant='outlined'
                  label='Текст (укр.)'
                  multiline
                  InputLabelProps={{
                    classes: {
                      root: classes.inputLabel,
                      shrink: 'shrink'
                    }
                  }}
                  value={ukText}
                  onChange={(e) => ukSetText(e.target.value)}
                  required
                />
              </Paper>
            </Grid>

            <Grid item xs={6}>
              <Paper className={classes.newsItemUpdate}>
                <TextField
                  id='enAuthorName'
                  className={classes.textField}
                  variant='outlined'
                  label='Автор (англ.)'
                  multiline
                  InputLabelProps={{
                    classes: {
                      root: classes.inputLabel,
                      shrink: 'shrink'
                    }
                  }}
                  value={enAuthorName}
                  onChange={(e) => enSetAuthor(e.target.value)}
                  required
                />
                <TextField
                  id='enTitle'
                  className={classes.textField}
                  variant='outlined'
                  label='Заголовок (англ.)'
                  multiline
                  InputLabelProps={{
                    classes: {
                      root: classes.inputLabel,
                      shrink: 'shrink'
                    }
                  }}
                  value={enTitle}
                  onChange={(e) => enSetTitle(e.target.value)}
                  required
                />
                <TextField
                  id='enText'
                  className={classes.textField}
                  variant='outlined'
                  label='Текст (англ.)'
                  multiline
                  InputLabelProps={{
                    classes: {
                      root: classes.inputLabel,
                      shrink: 'shrink'
                    }
                  }}
                  value={enText}
                  onChange={(e) => enSetText(e.target.value)}
                  required
                />
              </Paper>
            </Grid>
          </Grid>
        </FormControl>
        <SaveButton
          id='save'
          type='submit'
          title='Зберегти'
          className={classes.saveButton}
        />
      </form>
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
