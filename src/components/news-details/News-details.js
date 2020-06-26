import React, { useState, useEffect } from 'react';
import { Paper, TextField, FormControl } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { useStyles } from './News-details-style';
import { SaveButton } from '../buttons';
import wrapWithAdminService from '../wrappers';
import newsService from '../../services/News-service';

import {
  setSnackBarStatus,
  setSnackBarSeverity,
  setSnackBarMessage,
  setNewsItem
} from '../../actions';

const NewsDetails = (props) => {
  const classes = useStyles();

  const [authorPhoto, setAuthorPhoto] = useState('');
  const [newsImage, setNewsImage] = useState('');
  const [newsVideo, setNewsVideo] = useState('no video');

  const [ukAuthorName, ukSetAuthor] = useState('');
  const [ukText, ukSetText] = useState('');
  const [ukTitle, ukSetTitle] = useState('');

  const [enAuthorName, enSetAuthor] = useState('');
  const [enText, enSetText] = useState('');
  const [enTitle, enSetTitle] = useState('');

  const {
    setSnackBarStatus,
    setSnackBarSeverity,
    setSnackBarMessage,
    setNewsItem,
    newsItem,
    match,
    history
  } = props;

  const { id } = match.params;

  useEffect(() => {
    newsService.getNewsItemById(id).then((res) => {
      const { getNewsById } = res.data;
      setNewsItem(getNewsById);

      setAuthorPhoto(getNewsById.author.image.large);
      setNewsImage(getNewsById.images[0].primary.large);
      setNewsVideo(getNewsById.video);

      ukSetAuthor(getNewsById.author.name[0].value);
      ukSetText(getNewsById.text[0].value);
      ukSetTitle(getNewsById.title[0].value);

      enSetAuthor(getNewsById.author.name[1].value);
      enSetText(getNewsById.text[1].value);
      enSetTitle(getNewsById.title[1].value);
      console.log(getNewsById);
    });
  }, [newsService, id, setNewsItem]);

  const newsSaveHandler = async (e) => {
    e.preventDefault();

    // setSnackBarSeverity('success');
    // setSnackBarMessage(`'${title}' succesfully edited!`);
    // setSnackBarStatus(true);
    // history.push(`/news`);
  };

  const authorPhotoHandler = (e) => {
    setAuthorPhoto(e.target.value);
  };
  const newsImageHandler = (e) => {
    setNewsImage(e.target.value);
  };
  const newsVideoHandler = (e) => {
    setNewsVideo(e.target.value);
  };

  const ukAuthorHandler = (e) => {
    ukSetAuthor(e.target.value);
  };
  const ukTextHandler = (e) => {
    ukSetText(e.target.value);
  };
  const ukTitleHandler = (e) => {
    ukSetTitle(e.target.value);
  };

  const enAuthorHandler = (e) => {
    enSetAuthor(e.target.value);
  };
  const enTextHandler = (e) => {
    enSetText(e.target.value);
  };
  const enTitleHandler = (e) => {
    enSetTitle(e.target.value);
  };

  return (
    <form onSubmit={newsSaveHandler}>
      <FormControl className={classes.newsAdd}>
        <Paper className={classes.newsItemAdd}>
          <TextField
            id='authorPhoto'
            className={classes.textfield}
            variant='outlined'
            label='Author Photo'
            multiline
            value={authorPhoto}
            onChange={authorPhotoHandler}
            required
          />
          <TextField
            id='newsImage'
            className={classes.textfield}
            variant='outlined'
            label='News Image'
            multiline
            value={newsImage}
            onChange={newsImageHandler}
            required
          />
          <TextField
            id='newsVideo'
            className={classes.textfield}
            variant='outlined'
            label='Video Link'
            multiline
            value={newsVideo}
            onChange={newsVideoHandler}
            required
          />
        </Paper>

        <Paper className={classes.newsItemAdd}>
          <TextField
            id='ukAuthorName'
            className={classes.textfield}
            variant='outlined'
            label='UK Author'
            multiline
            value={ukAuthorName}
            onChange={ukAuthorHandler}
            required
          />
          <TextField
            id='ukText'
            className={classes.textfield}
            variant='outlined'
            label='UK Text'
            multiline
            value={ukText}
            onChange={ukTextHandler}
            required
          />
          <TextField
            id='ukTitle'
            className={classes.textfield}
            variant='outlined'
            label='UK Title'
            multiline
            value={ukTitle}
            onChange={ukTitleHandler}
            required
          />
        </Paper>

        <Paper className={classes.newsItemAdd}>
          <TextField
            id='enAuthorName'
            className={classes.textfield}
            variant='outlined'
            label='EN Author'
            multiline
            value={enAuthorName}
            onChange={enAuthorHandler}
            required
          />
          <TextField
            id='enText'
            className={classes.textfield}
            variant='outlined'
            label='EN Text'
            multiline
            value={enText}
            onChange={enTextHandler}
            required
          />
          <TextField
            id='enTitle'
            className={classes.textfield}
            variant='outlined'
            label='EN Title'
            multiline
            value={enTitle}
            onChange={enTitleHandler}
            required
          />
        </Paper>
      </FormControl>
      <SaveButton
        id='save'
        type='submit'
        title='Save'
        className={classes.saveButton}
      />
    </form>
  );
};

const mapStateToProps = ({ newsState: { newsItem } }) => ({
  newsItem
});
const mapDispatchToProps = {
  setSnackBarStatus,
  setSnackBarSeverity,
  setSnackBarMessage,
  setNewsItem
};

export default wrapWithAdminService()(
  connect(mapStateToProps, mapDispatchToProps)(withRouter(NewsDetails))
);
