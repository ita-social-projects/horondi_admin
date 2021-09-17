import React, { useEffect } from 'react';
import _ from 'lodash';
import { Typography } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import ReactHtmlParser from 'react-html-parser';
import { config } from '../../configs';
import { useCommonStyles } from '../common.styles';
import { useStyles } from './history.styles';
import materialUiConstants from '../../configs/material-ui-constants';
import { getHistoryRecords } from '../../redux/history/history.actions';
import TableContainerGenerator from '../../containers/table-container-generator';
import { handleHistory } from '../../utils/history';
import LoadingBar from '../../components/loading-bar';
import TableContainerRow from '../../containers/table-container-row';
import getTime from '../../utils/getTime';
import { historySelector } from '../../redux/selectors/history';
import { userRoleTranslations } from '../../translations/user.translations';
import { historyActions } from '../../consts/history-actions';
import useHistoryFilters from '../../hooks/filters/use-history-filters';
import routes from '../../configs/routes';
import FilterNavbar from '../../components/filter-search-sort';

const History = () => {
  const {
    searchOptions,
    clearOptions,
    filterByMultipleOptions,
    filterByDateOptions
  } = useHistoryFilters();

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
          fullName: filters.search
        }
      })
    );
  }, [dispatch, currentPage, rowsPerPage, filters]);

  const historyItems = _.map(records, (record) => (
    <TableContainerRow
      showAvatar={false}
      showDelete={false}
      showCheckbox={false}
      showEdit={false}
      id={record._id}
      key={record._id}
      date={ReactHtmlParser(
        getTime(new Date(record.createdAt).getTime(), true)
      )}
      action={historyActions[record.action]}
      userName={`${record.userId.firstName} ${record.userId.lastName}`}
      userRole={userRoleTranslations[record.userId.role]}
      subject={
        !record.subject.model
          ? record.subject.name
          : `${record.subject.model}/${record.subject.name}`
      }
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

      <FilterNavbar
        options={
          {
            filterByMultipleOptions,
            filterByDateOptions,
            clearOptions,
            searchOptions
          } || {}
        }
      />

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
