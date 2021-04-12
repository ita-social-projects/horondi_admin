import React, { useEffect } from 'react';
import _ from 'lodash';

import { config } from '../../configs';
import { useCommonStyles } from '../common.styles';
import { Typography } from '@material-ui/core';
import materialUiConstants from '../../configs/material-ui-constants';
import { getHistoryRecords } from '../../redux/history/history.actions';
import TableContainerGenerator from '../../containers/table-container-generator';
import {
  handleHistory,
  roleFilterObject,
  filterInputToRender,
  userRolesForFilter,
  actionFilterObj
} from '../../utils/history';
import { useDispatch, useSelector } from 'react-redux';
import LoadingBar from '../../components/loading-bar';
import TableContainerRow from '../../containers/table-container-row';
import ReactHtmlParser from 'react-html-parser';
import getTime from '../../utils/getTime';
import { historySelector } from '../../redux/selectors/history';
import { userRoleTranslations } from '../../translations/user.translations';
import { NavLink } from 'react-router-dom';
import { historyActions } from '../../consts/history-actions';
import FilterNavbar from '../../components/filter-search-sort';
import useHistoryFilters from '../../hooks/filters/use-history-filters';
import FilterByMultipleValues from './history-filters/filter-by-miltiple-values/filter-by-miltiple-values';
import buttonTitles from '../../configs/button-titles';
import FilterByDate from './history-filters/filter-by-date';

const History = () => {
  const commonStyles = useCommonStyles();
  const dispatch = useDispatch();
  const {
    searchOptions,
    clearOptions,
    filterOptions
  } = useHistoryFilters();
  const filters = useSelector(({ History }) => History.filters);
  const {
    records,
    historyLoading,
    currentPage,
    rowsPerPage,
    itemsCount
  } = useSelector(historySelector);

  useEffect(() => {
    dispatch(
      getHistoryRecords({
        limit: rowsPerPage,
        skip: currentPage * rowsPerPage,
        filter: {
          date: { dateFrom: '', dateTo: '' },
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
        !record.subject.model ?
          record.subject.name :
          `${record.subject.model}/${record.subject.name}`
      }
      details={<NavLink to={'/'}>{config.buttonTitles.LOOK}</NavLink>}
    />
  ));

  return (
    <div className={commonStyles.container}>
      <Typography
        variant={materialUiConstants.typographyVariantH1}
        className={commonStyles.materialTitle}
      >
        {config.titles.historyTitles.mainTitle}
      </Typography>
      <div>
        {/*<FilterByDate/>*/}
        <FilterByMultipleValues
          label={buttonTitles.EVENT_TITLE}
          selectItems={actionFilterObj()}
          setFilterHandler={filterOptions.setActionsFilter}
          renderFilterItems={filterInputToRender}
          objForTranslateRenderItems={historyActions}
        />

        <FilterByMultipleValues
          label={buttonTitles.USER_ROLE_TITLE}
          selectItems={roleFilterObject}
          setFilterHandler={filterOptions.setRolesFilter}
          renderFilterItems={filterInputToRender}
          objForTranslateRenderItems={userRolesForFilter}
        />
        <FilterNavbar options={{ clearOptions, searchOptions } || {}}/>
      </div>
      {
        historyLoading ? <LoadingBar/> :
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
      }

    </div>
  );
};

export default History;
