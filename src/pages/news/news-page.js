import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { Link } from 'react-router-dom';
import { Button, Typography } from '@material-ui/core';
import { useCommonStyles } from '../../common.styles';
import { config } from '../../../configs';
import { getNews, deleteArticle } from '../../../redux/news/news.actions';
import { closeDialog } from '../../../redux/dialog-window/dialog-window.actions';
import useSuccessSnackbar from '../../../utils/use-success-snackbar';
import TableContainerRow from '../../../containers/table-container-row';
import TableContainerGenerator from '../../../containers/table-container-generator';
import LoadingBar from '../../../components/loading-bar';
import { selectNewsAndTable } from '../../../redux/selectors/news.selectors';

const { REMOVE_MESSAGE } = config.messages;
const { CREATE_NEWS_TITLE } = config.buttonTitles;

const pathToNewsAddPage = config.routes.pathToAddNews;
const tableTitles = config.tableHeadRowTitles.news;

const NewsPage = () => {
  const commonStyles = useCommonStyles();
  const dispatch = useDispatch();
  const { openSuccessSnackbar } = useSuccessSnackbar();
  const { list, loading, currentPage, rowsPerPage, itemsCount } = useSelector(
    selectNewsAndTable
  );

  useEffect(() => {
    dispatch(
      getNews({
        limit: rowsPerPage,
        skip: currentPage * rowsPerPage,
        rowsPerPage
      })
    );
  }, [dispatch, rowsPerPage, currentPage]);

  const newsDeleteHandler = (id) => {
    const removeNews = () => {
      dispatch(closeDialog());
      dispatch(deleteArticle(id));
    };
    openSuccessSnackbar(removeNews, REMOVE_MESSAGE);
  };

  const newsItems =
    list !== undefined
      ? list.map((newsItem, index) => (
        <TableContainerRow
          key={index}
          image={newsItem.author.image.small}
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
    <div className={commonStyles.container}>
      <div className={commonStyles.adminHeader}>
        <Typography variant='h1' className={commonStyles.materialTitle}>
          {config.titles.newsPageTitles.mainPageTitle}
        </Typography>
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
      <TableContainerGenerator
        pagination
        id='newsTable'
        count={itemsCount}
        tableTitles={tableTitles}
        tableItems={newsItems}
      />
    </div>
  );
};

export default NewsPage;
