import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';

import { useStyles } from './business-page.styles';
import { config } from '../../configs';
import { getAllBusinessPages } from '../../redux/businessPages/businessPages.actions';

import { closeDialog } from '../../redux/dialog-window/dialog-window.actions';
import useSuccessSnackbar from '../../utils/use-success-snackbar';
import TableContainerRow from '../../components/table-container-row';
import TableContainerGenerator from '../../components/table-container-generator';
import LoadingBar from '../../components/loading-bar';
import { deleteArticle } from '../../redux/news/news.actions';

const { routes } = config.app;
const { REMOVE_MESSAGE } = config.messages;
const { REMOVE_TITLE } = config.buttonTitles;

const { CREATE_BUSINESS_PAGE } = config.buttonTitles;

const {pathToAddBusinessPage} = routes;
const tableTitles = config.tableHeadRowTitles.businessPages;

const BusinessPages = () => {
  const classes = useStyles();
  const { openSuccessSnackbar } = useSuccessSnackbar();
  const { list, loading } = useSelector(({ BusinessPages }) => ({
    list: BusinessPages.list,
    loading: BusinessPages.loading
  }));

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllBusinessPages());
  }, [dispatch]);

  const newsDeleteHandler = (id) => {
    const removeNews = () => {
      dispatch(closeDialog());
      dispatch(deleteArticle(id));
    };
    openSuccessSnackbar(removeNews, REMOVE_TITLE, REMOVE_MESSAGE, REMOVE_TITLE);
  };

  const pages =
    list !== undefined
      ? list.map((page, index) => (
        <TableContainerRow
          key={index}
          id={page._id}
          code={page.code}
          title={page.title[0].value}
          deleteHandler={() => newsDeleteHandler(page._id)}
          editHandler={() => {
            dispatch(push(`/business-pages/${page._id}`));
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
          id='add-business-page'
          component={Link}
          to={pathToAddBusinessPage}
          variant='contained'
          color='primary'
        >
          {CREATE_BUSINESS_PAGE}
        </Button>
      </div>
      <div className={classes.tableContainer}>
        <TableContainerGenerator
          id='newsTable'
          tableTitles={tableTitles}
          tableItems={pages}
        />
      </div>
    </div>
  );
};

export default BusinessPages;
