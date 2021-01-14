import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useCommonStyles } from '../../common.styles';
import NewsForm from '../news-form/news-form';
import LoadingBar from '../../../components/loading-bar';
import { getArticle } from '../../../redux/news/news.actions';

const NewsDetails = ({ match }) => {
  const { id } = match.params;

  const dispatch = useDispatch();
  const common = useCommonStyles();

  const { loading, newsArticle } = useSelector(({ News }) => ({
    loading: News.newsLoading,
    newsArticle: News.newsArticle
  }));

  useEffect(() => {
    id && dispatch(getArticle(id));
  }, [dispatch, id]);

  if (loading) {
    return <LoadingBar />;
  }

  return (
    <div className={common.container}>
      {newsArticle !== null ? (
        <NewsForm id={id} newsArticle={newsArticle} editMode />
      ) : null}
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

export default NewsDetails;
