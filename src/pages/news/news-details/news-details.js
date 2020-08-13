import React, { useEffect } from 'react';
import { Paper, TextField, FormControl, Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import { useFormik } from 'formik';
import { useStyles } from './news-details.styles';
import { SaveButton } from '../../../components/buttons';
import { config } from '../../../configs';
import useNewsHandlers from '../../../utils/use-news-handlers';
import LoadingBar from '../../../components/loading-bar';
import { getArticle, updateArticle } from '../../../redux/news/news.actions';

const { languages } = config;
const NewsDetails = ({ match }) => {
  const dispatch = useDispatch();
  const { loading, newsArticle } = useSelector(({ News }) => ({
    loading: News.newsLoading,
    newsArticle: News.newsArticle
  }));
  const classes = useStyles();
  const {
    authorPhoto,
    newsImage,
    ukAuthorName,
    ukText,
    ukTitle,
    enAuthorName,
    enText,
    enTitle,
    setAuthorPhoto,
    setNewsImage,
    ukSetAuthor,
    ukSetText,
    ukSetTitle,
    enSetAuthor,
    enSetText,
    enSetTitle
  } = useNewsHandlers();
  const { id } = match.params;
  useEffect(() => {
    dispatch(getArticle(id));
  }, [dispatch, id]);
  console.log(newsArticle);
  useEffect(() => {
    if (newsArticle !== null) {
      setAuthorPhoto(newsArticle.author.image.small);
      setNewsImage(newsArticle.images.primary.medium);

      ukSetAuthor(newsArticle.author.name[0].value || '');
      ukSetText(newsArticle.text[0].value || '');
      ukSetTitle(newsArticle.title[0].value || '');

      enSetAuthor(newsArticle.author.name[1].value || '');
      enSetText(newsArticle.text[1].value || '');
      enSetTitle(newsArticle.title[1].value || '');
    }
  }, [newsArticle]);

  const formik = useFormik({
    initialValues: {
      authorPhoto,
      newsImage,
      ukAuthorName,
      ukTitle,
      ukText,
      enAuthorName,
      enTitle,
      enText
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    }
  });
  console.log(formik.values);
  if (loading) {
    return <LoadingBar />;
  }

  return <div className={classes.detailsContainer}>Hey Dude!</div>;
};

NewsDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    })
  }).isRequired
};

export default withRouter(NewsDetails);
