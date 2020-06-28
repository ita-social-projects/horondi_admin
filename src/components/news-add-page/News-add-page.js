import React, { useState } from 'react';
import { FormControl, Paper, TextField, Grid } from '@material-ui/core';
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

const { languages } = config.app;
const SUCCESS_STATUS = 'Успішно додано!';

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
    const news = {
      video: e.target.newsVideo.value,
      author: {
        name: [
          {
            lang: languages[0],
            value: e.target.ukAuthorName.value
          },
          {
            lang: languages[1],
            value: e.target.enAuthorName.value
          }
        ],
        image: {
          large: e.target.authorPhoto.value
        }
      },
      title: [
        {
          lang: languages[0],
          value: e.target.ukTitle.value
        },
        {
          lang: languages[1],
          value: e.target.enTitle.value
        }
      ],
      text: [
        {
          lang: languages[0],
          value: e.target.ukText.value
        },
        {
          lang: languages[1],
          value: e.target.enText.value
        }
      ],
      images: {
        primary: {
          large: e.target.newsImage.value
        },
        additional: {
          large: 'Test_additional_photo'
        }
      },
      date: new Date().toISOString()
    };

    await newsService.createNewsItem(news);
    setSnackBarSeverity('success');
    setSnackBarMessage(SUCCESS_STATUS);
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
      label: 'Фото автора',
      authorPhoto,
      handler: authorPhotoHandler,
      required: true
    },
    {
      id: 'newsImage',
      className: classes.textfield,
      variant: 'outlined',
      label: 'Головне зображення',
      newsImage,
      handler: newsImageHandler,
      required: true
    },
    {
      id: 'newsVideo',
      className: classes.textfield,
      variant: 'outlined',
      label: 'Посилання на відео',
      newsVideo,
      handler: newsVideoHandler
    }
  ];

  const ukNewsOptions = [
    {
      id: 'ukAuthorName',
      className: classes.textfield,
      variant: 'outlined',
      label: 'Автор (укр.)',
      ukAuthorName,
      handler: ukAuthorHandler
    },
    {
      id: 'ukTitle',
      className: classes.textfield,
      variant: 'outlined',
      label: 'Заголовок (укр.)',
      ukTitle,
      handler: ukTitleHandler,
      required: true
    },
    {
      id: 'ukText',
      className: classes.textfield,
      variant: 'outlined',
      label: 'Текст (укр.)',
      ukText,
      handler: ukTextHandler,
      required: true
    }
  ];

  const enNewsOptions = [
    {
      id: 'enAuthorName',
      className: classes.textfield,
      variant: 'outlined',
      label: 'Автор (англ.)',
      enAuthorName,
      handler: enAuthorHandler
    },
    {
      id: 'enTitle',
      className: classes.textfield,
      variant: 'outlined',
      label: 'Заголовок (англ.)',
      enTitle,
      handler: enTitleHandler,
      required: true
    },
    {
      id: 'enText',
      className: classes.textfield,
      variant: 'outlined',
      label: 'Текст (англ.)',
      enText,
      handler: enTextHandler,
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
        InputLabelProps={{
          classes: {
            root: classes.inputLabel,
            shrink: 'shrink'
          }
        }}
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
        InputLabelProps={{
          classes: {
            root: classes.inputLabel,
            shrink: 'shrink'
          }
        }}
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
        InputLabelProps={{
          classes: {
            root: classes.inputLabel,
            shrink: 'shrink'
          }
        }}
      />
    )
  );

  return (
    <div className={classes.container}>
      <form onSubmit={newsSaveHandler}>
        <FormControl className={classes.newsAdd}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Paper className={classes.newsItemAdd}>
                {entertaimentInputs}
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper className={classes.newsItemAdd}>{ukNewsInputs}</Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper className={classes.newsItemAdd}>{enNewsInputs}</Paper>
            </Grid>
          </Grid>
        </FormControl>
        <SaveButton
          className={classes.saveButton}
          id='save'
          type='submit'
          title='Зберегти'
        />
      </form>
    </div>
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
