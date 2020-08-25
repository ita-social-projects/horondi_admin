import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { useStyles } from './pattern-page.styles';
import { config } from '../../../configs';
import {
  getPatterns,
  deletePattern
} from '../../../redux/pattern/pattern.actions';

import { closeDialog } from '../../../redux/dialog-window/dialog-window.actions';
import useSuccessSnackbar from '../../../utils/use-success-snackbar';

import TableContainerRow from '../../../components/table-container-row';
import TableContainerGenerator from '../../../components/table-container-generator';
import LoadingBar from '../../../components/loading-bar';

const { routes } = config.app;
const { REMOVE_MESSAGE } = config.patternMessages;
const { REMOVE_TITLE } = config.buttonTitles;

const { CREATE_PATTERN_TITLE } = config.buttonTitles;

const tableTitles = config.tableHeadRowTitles.pattern;

const PatternPage = () => {
  const classes = useStyles();
  const { openSuccessSnackbar } = useSuccessSnackbar();

  const { patterns, loading } = useSelector(
    ({ Pattern: { patterns, patternLoading } }) => ({
      patterns,
      loading: patternLoading
    })
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPatterns());
  }, [dispatch]);

  const patternDeleteHandler = (id) => {
    const removePattern = () => {
      dispatch(closeDialog());
      dispatch(deletePattern(id));
    };
    openSuccessSnackbar(
      removePattern,
      REMOVE_TITLE,
      REMOVE_MESSAGE,
      REMOVE_TITLE
    );
  };

  const patternItems =
    patterns !== undefined
      ? patterns.map((patternItem, index) => (
        <TableContainerRow
          key={index}
          id={patternItem.id}
          name={patternItem.name[0].value}
          material={patternItem.material}
          available={patternItem.available}
          deleteHandler={() => patternDeleteHandler(patternItem._id)}
          editHandler={() => {
            dispatch(push(`/pattern/${patternItem._id}`));
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
          data-cy='add-pattern'
          component={Link}
          to={routes.pathToAddPatern}
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
    </div>
  );
};

export default PatternPage;
