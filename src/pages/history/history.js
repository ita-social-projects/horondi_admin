import React, { useEffect } from 'react';
import _ from 'lodash';

import { config } from '../../configs';
import { useCommonStyles } from '../common.styles';
import { Typography } from '@material-ui/core';
import materialUiConstants from '../../configs/material-ui-constants';
import { getHistoryRecords } from '../../redux/history/history.actions';
import TableContainerGenerator from '../../containers/table-container-generator';
import { handleHistory } from '../../utils/history';
import { useDispatch, useSelector } from 'react-redux';
import LoadingBar from '../../components/loading-bar';
import TableContainerRow from '../../containers/table-container-row';
import ReactHtmlParser from 'react-html-parser';
import getTime from '../../utils/getTime';
import { push } from 'connected-react-router';
import { commentSelectorWithPagination } from '../../redux/selectors/comments.selectors';
import { historySelector } from '../../redux/selectors/history';
import { userRoleTranslations } from '../../translations/user.translations';
import { NavLink } from 'react-router-dom';
import DialogWindow from '../../components/dialog-window/dialog-window';
import HistoryDetails from './history-details';

const History = () => {
  const commonStyles = useCommonStyles();
  const dispatch = useDispatch();
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
        skip: currentPage * rowsPerPage
      })
    );
  }, [dispatch, currentPage, rowsPerPage]);

  if (historyLoading) {
    return <LoadingBar />;
  }
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
      action={record.action}
      userName={`${record.userId.firstName} ${record.userId.lastName}`}
      userRole={userRoleTranslations[record.userId.role]}
      subject={record.subject.name}
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
    </div>
  );
};

export default History;
