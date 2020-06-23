import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { useStyles } from './News-page-style';
import wrapWithAdminService from '../wrappers';
import newsService from '../../services/News-service';

import {
  setSnackBarStatus,
  setSnackBarSeverity,
  setSnackBarMessage,
  setDialogStatus,
  setDialogTitle,
  setDialogContent,
  setButtonTitle,
  setEventHandler,
  setNews,
  newsLoadingStatus
} from '../../actions';

import LoadingBar from '../loading-bar';
import TableContainerRow from '../table-container-row';
import TableContainerGenerator from '../table-container-generator/Table-container-generator';

import { config } from '../../config';

const tableTitles = config.tableHeadRowTitles.news;
const pathToNewsAddPage = '/newsadd';

const REMOVE_TITLE = 'Remove news';
const REMOVE_MESSAGE = 'Are you sure you want to remove this item?';
const SUCCESS_STATUS = 'success';

const NewsPage = ({
  news,
  loading,
  setNews,
  newsLoadingStatus,
  history,
  setSnackBarStatus,
  setSnackBarSeverity,
  setSnackBarMessage,
  setDialogStatus,
  setDialogTitle,
  setDialogContent,
  setButtonTitle,
  setEventHandler
}) => {
  const classes = useStyles();

  useEffect(() => {
    newsLoadingStatus();
    newsService.getAllNews().then((res) => setNews(res));
  }, [setNews, newsLoadingStatus]);

  const openSuccessSnackbar = (eventHandler) => {
    setDialogTitle(REMOVE_TITLE);
    setDialogContent(REMOVE_MESSAGE);
    setButtonTitle(REMOVE_TITLE);
    setEventHandler(eventHandler);
    setDialogStatus(true);
  };

  const newsDeleteHandler = (id) => async () => {
    const removeNews = async () => {
      await newsService.deleteNewsItem(id);
      setDialogStatus(false);
      setSnackBarMessage(SUCCESS_STATUS);
      setSnackBarSeverity(SUCCESS_STATUS);
      setSnackBarStatus(true);
      newsLoadingStatus();
      const newNewsItems = await newsService.getAllNews();
      setNews(newNewsItems);
    };
    openSuccessSnackbar(removeNews);
  };

  const newsItems =
    news.data !== undefined
      ? news.data.getAllNews.map((newsItem, index) => (
        <TableContainerRow
          key={index}
          id={newsItem._id}
          author={newsItem.author.name[0].value}
          title={newsItem.title[0].value}
          editHandler={() => {
            history.push(`/news/${newsItem._id}`);
          }}
          deleteHandler={newsDeleteHandler(newsItem._id)}
        />
      ))
      : null;

  if (loading) {
    return <LoadingBar />;
  }
  return (
    <div>
      <div className={classes.tableNav}>
        <Button
          id='add-news'
          component={Link}
          to={pathToNewsAddPage}
          variant='contained'
          color='primary'
        >
          Create News
        </Button>
      </div>
      <TableContainerGenerator
        id='newsTable'
        tableTitles={tableTitles}
        tableItems={newsItems}
      />
    </div>
  );
};

const mapStateToProps = ({ newsState: { news, loading } }) => ({
  news,
  loading
});

const mapDispatchToProps = {
  setNews,
  newsLoadingStatus,
  setSnackBarStatus,
  setSnackBarSeverity,
  setSnackBarMessage,
  setDialogStatus,
  setDialogTitle,
  setDialogContent,
  setButtonTitle,
  setEventHandler
};

export default wrapWithAdminService()(
  connect(mapStateToProps, mapDispatchToProps)(withRouter(NewsPage))
);
