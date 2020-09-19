import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import { useStyles } from './pattern-page.styles';
import { config } from '../../../configs';
import {
  getPatterns,
  deletePattern,
  setPatternsCurrentPage
} from '../../../redux/pattern/pattern.actions';

import { closeDialog } from '../../../redux/dialog-window/dialog-window.actions';
import useSuccessSnackbar from '../../../utils/use-success-snackbar';
import TableContainerRow from '../../../containers/table-container-row';
import TableContainerGenerator from '../../../containers/table-container-generator';
import LoadingBar from '../../../components/loading-bar';

const { routes } = config.app;
const { PATTERN_REMOVE_MESSAGE } = config.messages;
const { PATTERN_REMOVE_TITLE } = config.buttonTitles;

const { CREATE_PATTERN_TITLE } = config.buttonTitles;
const pathToPatternAddPage = routes.pathToAddPattern;
const tableTitles = config.tableHeadRowTitles.patterns;

const PatternPage = () => {
  const styles = useStyles();
  const { openSuccessSnackbar } = useSuccessSnackbar();
  const {
    list,
    loading,
    pagesCount,
    currentPage,
    patternsPerPage
  } = useSelector(({ Pattern }) => ({
    list: Pattern.list,
    loading: Pattern.newsLoading,
    pagesCount: Pattern.pagination.pagesCount,
    currentPage: Pattern.pagination.currentPage,
    patternsPerPage: Pattern.pagination.patternsPerPage
  }));

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getPatterns({
        limit: patternsPerPage,
        skip: currentPage * patternsPerPage,
        patternsPerPage
      })
    );
  }, [dispatch, patternsPerPage, currentPage]);

  const patternDeleteHandler = (id) => {
    const removePattern = () => {
      dispatch(closeDialog());
      dispatch(deletePattern(id));
    };
    openSuccessSnackbar(
      removePattern,
      PATTERN_REMOVE_TITLE,
      PATTERN_REMOVE_MESSAGE,
      PATTERN_REMOVE_TITLE
    );
  };

  const changeHandler = (e, value) => dispatch(setPatternsCurrentPage(value));

  const patternItems =
    list !== undefined
      ? list.map((patternItem, index) => (
        <TableContainerRow
          image={`${config.patternImageLink}${patternItem.images.thumbnail}`}
          key={index}
          id={patternItem.id}
          name={patternItem.name[0].value}
          material={patternItem.material}
          available={patternItem.available ? 'Так' : 'Ні'}
          deleteHandler={() => patternDeleteHandler(patternItem._id)}
          editHandler={() => {
            dispatch(push(`/patterns/${patternItem._id}`));
          }}
        />
      ))
      : null;

  if (loading) {
    return <LoadingBar />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.tableNav}>
        <Button
          data-cy='add-pattern'
          component={Link}
          to={pathToPatternAddPage}
          variant='contained'
          color='primary'
        >
          {CREATE_PATTERN_TITLE}
        </Button>
      </div>
      <div className={styles.tableContainer}>
        <TableContainerGenerator
          data-cy='patternTable'
          tableTitles={tableTitles}
          tableItems={patternItems}
        />
      </div>
      <div className={styles.paginationDiv}>
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

export default PatternPage;
