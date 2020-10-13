import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import { useStyles } from './news-page.styles';
import {
  messages,
  buttonTitles,
  routes,
  tableHeadRowTitles
} from '../../../configs';
import {
  getNews,
  deleteArticle,
  setCurrentPage
} from '../../../redux/news/news.actions';

import { closeDialog } from '../../../redux/dialog-window/dialog-window.actions';
import useSuccessSnackbar from '../../../utils/use-success-snackbar';
import TableContainerRow from '../../../containers/table-container-row';
import TableContainerGenerator from '../../../containers/table-container-generator';
import LoadingBar from '../../../components/loading-bar';

const { REMOVE_MESSAGE } = messages;
const { REMOVE_TITLE } = buttonTitles;

const { CREATE_NEWS_TITLE } = buttonTitles;

const pathToNewsAddPage = routes.pathToAddNews;
const tableTitles = tableHeadRowTitles.news;

const NewsPage = () => {
  const classes = useStyles();
  const { openSuccessSnackbar } = useSuccessSnackbar();
  const { list, loading, pagesCount, currentPage, newsPerPage } = useSelector(
    ({ News }) => ({
      list: News.list,
      loading: News.newsLoading,
      pagesCount: News.pagination.pagesCount,
      currentPage: News.pagination.currentPage,
      newsPerPage: News.pagination.newsPerPage
    })
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getNews({
        limit: newsPerPage,
        skip: currentPage * newsPerPage,
        newsPerPage
      })
    );
  }, [dispatch, newsPerPage, currentPage]);

  const newsDeleteHandler = (id) => {
    const removeNews = () => {
      dispatch(closeDialog());
      dispatch(deleteArticle(id));
    };
    openSuccessSnackbar(removeNews, REMOVE_TITLE, REMOVE_MESSAGE, REMOVE_TITLE);
  };

  const changeHandler = (e, value) => dispatch(setCurrentPage(value));

  const newsItems =
    list !== undefined
      ? list.map((newsItem, index) => (
        <TableContainerRow
          key={index}
          id={newsItem.id}
          author={
            newsItem.title[0].value !== null
              ? newsItem.author.name[0].value
              : newsItem.author.name[1].value
          }
          title={
            newsItem.title[0].value !== null
              ? newsItem.title[0].value
              : newsItem.title[1].value
          }
          deleteHandler={() => newsDeleteHandler(newsItem._id)}
          editHandler={() => {
            dispatch(push(`/news/${newsItem._id}`));
          }}
        />
      ))
      : null;

  if (loading) {
    return <LoadingBar />;
  }

  return (
    <div className={classes.container}>
      <div className={classes.tableNav}>
        <Button
          id='add-news'
          component={Link}
          to={pathToNewsAddPage}
          variant='contained'
          color='primary'
        >
          {CREATE_NEWS_TITLE}
        </Button>
      </div>
      <div className={classes.tableContainer}>
        <TableContainerGenerator
          id='newsTable'
          tableTitles={tableTitles}
          tableItems={newsItems}
        />
      </div>
      <div className={classes.paginationDiv}>
        <Pagination
          count={pagesCount}
          variant='outlined'
          shape='rounded'
          page={currentPage + 1}
          onChange={changeHandler}
        />
      </div>
    </div>
  );
};

export default NewsPage;
