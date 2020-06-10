import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import wrapWithAdminService from '../wrappers';
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

import useStyle from './News-page-style';
import LoadingBar from '../loading-bar';
import TableContainerRow from '../table-container-row';
import TableContainerGenerator from '../table-container-generator/Table-container-generator';

import { config } from '../../config';

const tableTitles = config.tableHeadRowTitles.news;
const pathToNewsAddPage = '/newsadd';

const REMOVE_TITLE = 'Remove news';
const REMOVE_MESSAGE = 'Are you sure you want to remove this item?';
const SUCCESS_STATUS = 'success';

const TestList = ({
  news,
  adminService,
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
  const { newsService } = adminService;

  const classes = useStyle();

  useEffect(() => {
    newsLoadingStatus();
    newsService.getAllNews().then((res) => setNews(res));
  }, [newsService, setNews, newsLoadingStatus]);

  const openSuccessSnackbar = (eventHandler) => {
    setDialogTitle(REMOVE_TITLE);
    setDialogContent(REMOVE_MESSAGE);
    setButtonTitle(REMOVE_TITLE);
    setEventHandler(eventHandler);
    setDialogStatus(true);
  };

  const newsDeleteHandler = (id) => async () => {
    const removeNews = async () => {
      const res = await newsService.deleteNewsItem(id);
      setDialogStatus(false);
      setSnackBarMessage(res);
      setSnackBarSeverity(SUCCESS_STATUS);
      setSnackBarStatus(true);
      newsLoadingStatus();
      const newNewsItems = await newsService.getAllNews();
      setNews(newNewsItems);
    };
    openSuccessSnackbar(removeNews);
  };

  const newsItems =
    news.length > 0
      ? news.map((newsItem, index) => (
          <TableContainerRow
            key={index}
            id={newsItem._id}
            author={newsItem.author}
            title={newsItem.title}
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
  connect(mapStateToProps, mapDispatchToProps)(withRouter(TestList))
);
