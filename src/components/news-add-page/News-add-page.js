import React, { useState } from 'react';
import { FormControl, Paper, TextField } from '@material-ui/core';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { useStyles } from './News-add-page-style';
import { SaveButton } from '../buttons';
import wrapWithAdminService from '../wrappers';
import newsService from '../../services/News-service';

import { config } from '../../config';

import {
  setSnackBarStatus,
  setSnackBarSeverity,
  setSnackBarMessage
} from '../../actions';

const {languages} = config.app;

const NewsAddPage = (props) => {
  const classes = useStyles();

  const {
    history,
    setSnackBarStatus,
    setSnackBarSeverity,
    setSnackBarMessage
  } = props;

  const [authorPhoto, setAuthorPhoto] = useState('');
  const [newsImage, setNewsImage] = useState('');
  const [newsVideo, setNewsVideo] = useState('');

  const [ukAuthorName, ukSetAuthor] = useState('');
  const [ukText, ukSetText] = useState('');
  const [ukTitle, ukSetTitle] = useState('');

  const [enAuthorName, enSetAuthor] = useState('');
  const [enText, enSetText] = useState('');
  const [enTitle, enSetTitle] = useState('');

  const newsSaveHandler = async (e) => {
    e.preventDefault();

    const video = e.target.newsVideo.value;

    const author = {
      name: [
        {
          lang: 'ua',
          value: e.target.ukAuthorName.value
        },
        {
          lang: 'en',
          value: e.target.enAuthorName.value
        }
      ],
      image: {
        small: e.target.authorPhoto.value
      }
    };

    const title = [
      {
        lang: languages[0],
        value: e.target.ukTitle.value
      },
      {
        lang: languages[1],
        value: e.target.enTitle.value
      }
    ];

    const text = [
      {
        lang: languages[0],
        value: e.target.ukText.value
      },
      {
        lang: languages[1],
        value: e.target.enText.value
      }
    ];

    const images = {
      primary: {
        medium: e.target.newsImage.value
      },
      additional: {
        medium: 'Test_additional_photo'
      }
    };

    const date = new Date().toISOString();

    await newsService.createNewsItem(video, author, date, text, title, images);
    setSnackBarSeverity('success');
    setSnackBarMessage(`succesfully saved!`);
    setSnackBarStatus(true);

    setAuthorPhoto('');
    setNewsImage('');
    setNewsVideo('');

    ukSetAuthor('');
    ukSetText('');
    ukSetTitle('');

    enSetAuthor('');
    enSetText('');
    enSetTitle('');

    history.push(`/news`);
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
        className={classes.saveButton}
        id='save'
        type='submit'
        title='Save'
      />
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
