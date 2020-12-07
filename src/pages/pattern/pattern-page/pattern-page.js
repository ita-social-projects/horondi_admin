import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { Link } from 'react-router-dom';
import { Button, Typography } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import { useStyles } from './pattern-page.styles';
import { useCommonStyles } from '../../common.styles';
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
import { config } from '../../../configs';

const { PATTERN_REMOVE_MESSAGE } = config.messages;
const { CREATE_PATTERN_TITLE, PATTERN_REMOVE_TITLE } = config.buttonTitles;

const pathToPatternAddPage = config.routes.pathToAddPattern;
const tableTitles = config.tableHeadRowTitles.patterns;

const PatternPage = () => {
  const styles = useStyles();
  const common = useCommonStyles();

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
      ? list.map((patternItem) => (
        <TableContainerRow
          image={
            patternItem.images.thumbnail
              ? `${config.imagePrefix}${patternItem.images.thumbnail}`
              : ''
          }
          key={patternItem._id}
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
    <div className={common.container}>
      <div className={common.adminHeader}>
        <Typography variant='h1' className={common.materialTitle}>
          {config.titles.patternTitles.mainPageTitle}
        </Typography>
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
      <TableContainerGenerator
        data-cy='patternTable'
        tableTitles={tableTitles}
        tableItems={patternItems}
      />
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
