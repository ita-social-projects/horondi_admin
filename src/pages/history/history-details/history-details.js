import React, { useEffect } from 'react';
import { withRouter } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import { useStyles } from './history-details.styles';
import { getRecordItem } from '../../../redux/history/history.actions';
import { historySelector } from '../../../redux/selectors/history';
import LoadingBar from '../../../components/loading-bar';
import HistoryDetailsInfo from '../history-details-info';
import BackButton from '../../../components/buttons/back-button';
import { config } from '../../../configs';

const HistoryDetails = ({ match }) => {
  const { id } = match.params;
  const { pathToHistory } = config.routes;
  const { recordItem, darkMode, recordItemLoading } =
    useSelector(historySelector);
  const dispatch = useDispatch();
  const styles = useStyles({ darkMode });

  useEffect(() => {
    dispatch(getRecordItem(id));
  }, [dispatch, id]);

  if (recordItemLoading) {
    return <LoadingBar />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.buttonContainer}>
        <Grid container spacing={2} className={styles.fixedButtons}>
          <Grid item className={styles.button}>
            <BackButton pathBack={pathToHistory} />
          </Grid>
        </Grid>
      </div>
      {recordItem && (
        <HistoryDetailsInfo recordItem={recordItem} darkMode={!!darkMode} />
      )}
    </div>
  );
};

HistoryDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    })
  }).isRequired
};

export default withRouter(HistoryDetails);
