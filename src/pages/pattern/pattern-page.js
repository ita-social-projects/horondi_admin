import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { Link } from 'react-router-dom';
import { Button, Typography } from '@material-ui/core';
import { useCommonStyles } from '../common.styles';
import {
  getPatterns,
  deletePattern
} from '../../redux/pattern/pattern.actions';

import { closeDialog } from '../../redux/dialog-window/dialog-window.actions';
import useSuccessSnackbar from '../../utils/use-success-snackbar';
import TableContainerRow from '../../containers/table-container-row';
import TableContainerGenerator from '../../containers/table-container-generator';
import LoadingBar from '../../components/loading-bar';
import { config } from '../../configs';
import { patternSelectorWithPagination } from '../../redux/selectors/pattern.selectors';

const map = require('lodash/map');

const { PATTERN_REMOVE_MESSAGE } = config.messages;
const { CREATE_PATTERN_TITLE } = config.buttonTitles;

const pathToPatternAddPage = config.routes.pathToAddPattern;
const tableTitles = config.tableHeadRowTitles.patterns;

const PatternPage = () => {
  const common = useCommonStyles();

  const { openSuccessSnackbar } = useSuccessSnackbar();

  const { list, loading, currentPage, rowsPerPage, itemsCount } = useSelector(
    patternSelectorWithPagination
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getPatterns({
        limit: rowsPerPage,
        skip: currentPage * rowsPerPage
      })
    );
  }, [dispatch, rowsPerPage, currentPage]);

  const patternDeleteHandler = (id) => {
    const removePattern = () => {
      dispatch(closeDialog());
      dispatch(deletePattern(id));
    };
    openSuccessSnackbar(removePattern, PATTERN_REMOVE_MESSAGE);
  };

  const patternItems = map(list, (patternItem) => (
    <TableContainerRow
      image={
        patternItem.images.thumbnail
          ? `${config.imagePrefix}${patternItem.images.thumbnail}`
          : ''
      }
      key={patternItem._id}
      id={patternItem._id}
      name={patternItem.name[0].value}
      material={patternItem.material.name[0].value}
      available={patternItem.available ? 'Так' : 'Ні'}
      deleteHandler={() => patternDeleteHandler(patternItem._id)}
      editHandler={() => {
        dispatch(push(`/patterns/${patternItem._id}`));
      }}
    />
  ));

  return (
    <div className={common.container}>
      <div className={common.adminHeader}>
        <Typography
          variant='h1'
          className={common.materialTitle}
          data-cy='pattern-header'
        >
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
      {!loading ? (
        <TableContainerGenerator
          pagination
          data-cy='patternTable'
          count={itemsCount}
          tableTitles={tableTitles}
          tableItems={patternItems}
        />
      ) : (
        <LoadingBar />
      )}
    </div>
  );
};

export default PatternPage;
