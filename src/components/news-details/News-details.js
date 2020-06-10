import React, { useState, useEffect } from 'react';
import { Paper, TextField } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { useStyles } from './News-details-style';
import { SaveButton } from '../buttons';
import wrapWithAdminService from '../wrappers';

import {
  setSnackBarStatus,
  setSnackBarSeverity,
  setSnackBarMessage,
  setNewsItem
} from '../../actions';

const NewsDetails = (props) => {
  const classes = useStyles();

  const [author, setAuthor] = useState('');
  const [authorPhoto, setAuthorPhoto] = useState('');
  const [newsImage, setNewsImage] = useState('');
  const [newsVideo, setNewsVideo] = useState('no video');
  const [text, setText] = useState('');
  const [title, setTitle] = useState('');

  const {
    adminService,
    setSnackBarStatus,
    setSnackBarSeverity,
    setSnackBarMessage,
    setNewsItem,
    newsItem,
    match,
    history
  } = props;

  const { id } = match.params;
  const { newsService } = adminService;

  useEffect(() => {
    newsService.getNewsItemById(id).then((res) => {
      setNewsItem(res);
      setAuthor(res.author);
      setAuthorPhoto(res.authorPhoto);
      setNewsImage(res.newsImage);
      if (res.newsVideo) {
        setNewsVideo(res.newsVideo);
      }
      setText(res.text);
      setTitle(res.title);
    });
  }, [newsService, id, setNewsItem]);

  const newsSaveHandler = async (e) => {
    e.preventDefault();

    const newNewsItem = { ...newsItem };

    newNewsItem.author = author;
    newNewsItem.authorPhoto = authorPhoto;
    newNewsItem.newsImage = newsImage;
    newNewsItem.newsVideo = newsVideo;
    newNewsItem.text = text;
    newNewsItem.title = title;

    await newsService.putNewsItem(newNewsItem);

    setSnackBarSeverity('success');
    setSnackBarMessage(`'${title}' succesfully edited!`);
    setSnackBarStatus(true);
    history.push(`/news`);
  };

  const authorHandler = (e) => {
    setAuthor(e.target.value);
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
  const textHandler = (e) => {
    setText(e.target.value);
  };
  const titleHandler = (e) => {
    setTitle(e.target.value);
  };

  return (
    <form onSubmit={newsSaveHandler}>
      <Paper className={classes.brandAdd}>
        <TextField
          id='author'
          className={classes.textfield}
          variant='outlined'
          label='Author'
          value={author}
          onChange={authorHandler}
          required
        />
        <TextField
          id='authorPhoto'
          className={classes.textfield}
          variant='outlined'
          label='Avatar name'
          value={authorPhoto}
          onChange={authorPhotoHandler}
          required
        />
        <TextField
          id='newsImage'
          className={classes.textfield}
          variant='outlined'
          label='Image name'
          value={newsImage}
          onChange={newsImageHandler}
          required
        />
        <TextField
          id='newsVideo'
          className={classes.textfield}
          variant='outlined'
          label='Video link'
          value={newsVideo}
          onChange={newsVideoHandler}
        />
        <TextField
          id='title'
          className={classes.textfield}
          variant='outlined'
          label='Title'
          value={title}
          onChange={titleHandler}
          required
        />
        <TextField
          id='text'
          className={classes.textfield}
          variant='outlined'
          label='text'
          multiline
          value={text}
          onChange={textHandler}
          required
        />
        <SaveButton id='save' type='submit' title='Save' />
      </Paper>
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
