import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { useStyles } from './news-details.styles';
import NewsForm from '../../../components/news-form';
import LoadingBar from '../../../components/loading-bar';

import { getArticle } from '../../../redux/news/news.actions';

const NewsDetails = ({ match }) => {
  const { id } = match.params;

  const dispatch = useDispatch();
  const { loading, newsArticle } = useSelector(({ News }) => ({
    loading: News.newsLoading,
    newsArticle: News.newsArticle
  }));
  const classes = useStyles();

  useEffect(() => {
    dispatch(getArticle(id));
  }, [dispatch, id]);

  if (loading) {
    return <LoadingBar />;
  }

  return (
    <div className={classes.detailsContainer}>
      {newsArticle !== null ? <NewsForm id={id} article={newsArticle} /> : null}
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
