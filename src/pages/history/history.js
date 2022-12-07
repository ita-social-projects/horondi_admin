import React, { useEffect } from 'react';
import { Typography } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { config } from '../../configs';
import { useCommonStyles } from '../common.styles';
import { useStyles } from './history.styles';
import materialUiConstants from '../../configs/material-ui-constants';
import { getHistoryRecords } from '../../redux/history/history.actions';
import TableContainerGenerator from '../../containers/table-container-generator';
import { handleHistory } from '../../utils/history';
import LoadingBar from '../../components/loading-bar';
import TableContainerRow from '../../containers/table-container-row';
import { historySelector } from '../../redux/selectors/history';
import { historyEvents } from '../../consts/history-events';
import routes from '../../configs/routes';
import Filters from './filters/filters';

const History = () => {
  const {
    darkMode,
    filters,
    records,
    historyLoading,
    currentPage,
    rowsPerPage,
    itemsCount
  } = useSelector(historySelector);

  const commonStyles = useCommonStyles();
  const styles = useStyles({ darkMode });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getHistoryRecords({
        limit: rowsPerPage,
        skip: currentPage * rowsPerPage,
        filter: {
          date: { dateFrom: filters.dateFrom, dateTo: filters.dateTo },
          role: filters.role,
          action: filters.action,
          historyName: filters.historyName,
          fullName: filters.search
        }
      })
    );
  }, [dispatch, currentPage, rowsPerPage, filters]);

  const historyItems = records?.map((record) => (
    <TableContainerRow
      showAvatar={false}
      showDelete={false}
      showCheckbox={false}
      showEdit={false}
      id={record._id}
      key={record._id}
      subject={record.subject.name}
      historyName={historyEvents.historyName[record.historyName]}
      action={historyEvents.historyAction[record.action]}
      userName={`${record.userId.firstName} ${record.userId.lastName}`}
      date={new Date(record.createdAt).toLocaleString('uk-UA')}
      details={
        <NavLink
          to={`${routes.pathToHistory}/${record._id}`}
          className={styles.detailsBtn}
        >
          {config.buttonTitles.LOOK}
        </NavLink>
      }
    />
  ));

  if (historyLoading) {
    return <LoadingBar />;
  }

  return (
    <div className={commonStyles.container}>
      <Typography
        variant={materialUiConstants.typographyVariantH1}
        className={commonStyles.materialTitle}
      >
        {config.titles.historyTitles.mainTitle}
      </Typography>

      <Filters />

      {!records?.length ? (
        <p className={styles.noRecordsTitle}>
          {config.messages.NO_HISTORY_RECORDS_MESSAGE}
        </p>
      ) : (
        <TableContainerGenerator
          pagination
          data-cy='historyTable'
          count={itemsCount}
          tableTitles={handleHistory(
            records,
            config.tableHeadRowTitles.history,
            config.messages.NO_HISTORY_RECORDS_MESSAGE
          )}
          tableItems={historyItems}
        />
      )}
    </div>
  );
};

export default History;
