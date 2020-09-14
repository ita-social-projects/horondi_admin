import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { Typography } from '@material-ui/core/';
import { Pagination } from '@material-ui/lab';

import { useStyles } from './comments.style';
import { config } from '../../../configs';

import {} from '../../../redux/comments.actions';

import { closeDialog } from '../../../redux/dialog-window/dialog-window.actions';
import useSuccessSnackbar from '../../../utils/use-success-snackbar';
import TableContainerRow from '../../../components/table-container-row';
import TableContainerGenerator from '../../../components/table-container-generator';
import LoadingBar from '../../../components/loading-bar';

const { routes } = config.app;
const { REMOVE_MESSAGE } = config.messages;
const { REMOVE_TITLE } = config.buttonTitles;

const { CREATE_NEWS_TITLE } = config.buttonTitles;

const pathToNewsAddPage = routes.pathToAddNews;
const tableTitles = config.tableHeadRowTitles.news;

const CommentsPage = () => {
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

  if (loading) {
    return <LoadingBar />;
  }

  return (
    <div className={classes.container}>
      <div className={classes.tableNav}>
        <Typography variant='h1' className={styles.usersTitle}></Typography>
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

export default CommentsPage;
