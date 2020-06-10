import React, { useState } from 'react';
import { FormControl, Paper, TextField } from '@material-ui/core';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { useStyles } from './News-add-page-style';
import { SaveButton } from '../buttons';
import wrapWithAdminService from '../wrappers';

import {
  setSnackBarStatus,
  setSnackBarSeverity,
  setSnackBarMessage
} from '../../actions';

const NewsAddPage = (props) => {
  const classes = useStyles();

  const {
    adminService,
    history,
    setSnackBarStatus,
    setSnackBarSeverity,
    setSnackBarMessage
  } = props;

  const { newsService } = adminService;

  const [author, setAuthor] = useState('');
  const [authorPhoto, setAuthorPhoto] = useState('');
  const [newsImage, setNewsImage] = useState('');
  const [newsVideo, setNewsVideo] = useState('');
  const [text, setText] = useState('');
  const [title, setTitle] = useState('');

  const newsSaveHandler = async (e) => {
    e.preventDefault();
    const newNewsItem = {
      author: e.target.author.value,
      authorPhoto: e.target.authorPhoto.value,
      newsImage: e.target.newsImage.value,
      newsVideo: e.target.newsVideo.value,
      text: e.target.text.value,
      title: e.target.title.value
    };

    const res = await newsService.postNewsItem(newNewsItem);
    setSnackBarSeverity('success');
    setSnackBarMessage(`"${res.title}" succesfully saved!`);
    setSnackBarStatus(true);
    setAuthor('');
    setAuthorPhoto('');
    setNewsImage('');
    setNewsVideo('');
    setText('');
    setTitle('');
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
  const newsOptions = [
    {
      id: 'author',
      className: classes.textfield,
      variant: 'outlined',
      label: 'Author',
      author,
      handler: authorHandler,
      required: true
    },
    {
      id: 'authorPhoto',
      className: classes.textfield,
      variant: 'outlined',
      label: 'Author Photo',
      authorPhoto,
      handler: authorPhotoHandler,
      required: true
    },
    {
      id: 'newsImage',
      className: classes.textfield,
      variant: 'outlined',
      label: 'News Image',
      newsImage,
      handler: newsImageHandler,
      required: true
    },
    {
      id: 'newsVideo',
      className: classes.textfield,
      variant: 'outlined',
      label: 'Video Link',
      newsVideo,
      handler: newsVideoHandler
    },
    {
      id: 'text',
      className: classes.textfield,
      variant: 'outlined',
      label: 'Text',
      text,
      handler: textHandler,
      required: true
    },
    {
      id: 'title',
      className: classes.textfield,
      variant: 'outlined',
      label: 'Title',
      title,
      handler: titleHandler,
      required: true
    }
  ];

  const newsInputs = newsOptions.map(
    ({ id, className, variant, label, value, handler, required }) => (
      <TextField
        id={id}
        key={id}
        className={className}
        variant={variant}
        label={label}
        value={value}
        onChange={() => handler}
        required={required}
        multiline
      />
    )
  );

  return (
    <form onSubmit={newsSaveHandler}>
      <FormControl>
        <Paper className={classes.brandAdd}>
          {newsInputs}
          <SaveButton id='save' type='submit' title='Save' />
        </Paper>
      </FormControl>
    </form>
  );
};

const mapDispatchToProps = {
  setSnackBarStatus,
  setSnackBarSeverity,
  setSnackBarMessage
};

export default wrapWithAdminService()(
  connect(null, mapDispatchToProps)(withRouter(NewsAddPage))
);
