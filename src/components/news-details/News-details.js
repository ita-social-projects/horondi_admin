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

  useEffect(() => {
    newsService.getNewsItemById(id).then((res) => {
      setAuthorPhoto();
      setNewsImage();
      setNewsVideo();

      ukSetAuthor();
      ukSetText();
      ukSetTitle();

      enSetAuthor();
      enSetText();
      enSetTitle();
    });
    // newsService.getNewsItemById(id).then((res) => {
    //   setNewsItem(res);
    //   setAuthor(res.author);
    //   setAuthorPhoto(res.authorPhoto);
    //   setNewsImage(res.newsImage);
    //   if (res.newsVideo) {
    //     setNewsVideo(res.newsVideo);
    //   }
    //   setText(res.text);
    //   setTitle(res.title);
    // });
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

  const entertaimentOptions = [
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
    }
  ];

  const ukNewsOptions = [
    {
      id: 'ukAuthorName',
      className: classes.textfield,
      variant: 'outlined',
      label: 'Author',
      ukAuthorName,
      handler: ukAuthorHandler
    },
    {
      id: 'ukText',
      className: classes.textfield,
      variant: 'outlined',
      label: 'Text',
      ukText,
      handler: ukTextHandler,
      required: true
    },
    {
      id: 'ukTitle',
      className: classes.textfield,
      variant: 'outlined',
      label: 'Title',
      ukTitle,
      handler: ukTitleHandler,
      required: true
    }
  ];

  const enNewsOptions = [
    {
      id: 'enAuthorName',
      className: classes.textfield,
      variant: 'outlined',
      label: 'Author',
      enAuthorName,
      handler: enAuthorHandler
    },
    {
      id: 'enText',
      className: classes.textfield,
      variant: 'outlined',
      label: 'Text',
      enText,
      handler: enTextHandler,
      required: true
    },
    {
      id: 'enTitle',
      className: classes.textfield,
      variant: 'outlined',
      label: 'Title',
      enTitle,
      handler: enTitleHandler,
      required: true
    }
  ];

  const entertaimentInputs = entertaimentOptions.map(
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

  const ukNewsInputs = ukNewsOptions.map(
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

  const enNewsInputs = enNewsOptions.map(
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
      <FormControl className={classes.newsAdd}>
        <Paper className={classes.newsItemAdd}>{entertaimentInputs}</Paper>
        <Paper className={classes.newsItemAdd}>{ukNewsInputs}</Paper>
        <Paper className={classes.newsItemAdd}>{enNewsInputs}</Paper>
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
