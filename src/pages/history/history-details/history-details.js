import React, { useEffect } from 'react';
import { withRouter } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';

import { useStyles } from './history-details.styles';
import { getRecordItem } from '../../../redux/history/history.actions';
import { historySelector } from '../../../redux/selectors/history';
import { useCommonStyles } from '../../common.styles';
import LoadingBar from '../../../components/loading-bar';
import { useStyles as useTableHeadStyles } from
    '../../../containers/table-container-head/table-container-head.styles';
import Paper from '@material-ui/core/Paper';
import titles from '../../../configs/titles';
import { userRolesForFilter } from '../../../utils/history';
import BackButton from '../../../components/buttons/back-button';

const HistoryDetails = ({ match }) => {
  const { id } = match.params;

  const {
    recordItem,
    darkMode,
    recordItemLoading
  } = useSelector(historySelector);

  const styles = useStyles({ darkMode });
  const commonStyles = useCommonStyles();
  const tableHeadStyles = useTableHeadStyles();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRecordItem(id));
  }, []);

  if (recordItemLoading) {
    return <LoadingBar/>;
  }

  return (
    <div className={commonStyles.container}>
      <BackButton initial={false}/>
      <h2 className={styles.detailsTitle}>
        {titles.historyTitles.detailsTitleNumber(recordItem?._id)}
      </h2>
      <Paper>
        <h3 className={styles.userInfoTitle}>{titles.historyTitles.userInfo}</h3>
        <div className={styles.userInfoData}>
          <p className={styles.userInfoItem}>{titles.historyTitles.id}</p>
          <p className={styles.userInfoItem}>{recordItem?.userId._id}</p>
        </div>
        <div className={styles.userInfoData}>
          <p className={styles.userInfoItem}>{titles.historyTitles.email}</p>
          <p className={styles.userInfoItem}>{recordItem?.userId.email}</p>
        </div>
        <div className={styles.userInfoData}>
          <p className={styles.userInfoItem}>{titles.historyTitles.id}</p>
          <p className={styles.userInfoItem}>
            {`${recordItem?.userId.firstName} ${recordItem?.userId.lastName}`}
          </p>
        </div>
        <div className={styles.userInfoData}>
          <p className={styles.userInfoItem}>{titles.historyTitles.role}</p>
          <p className={styles.userInfoItem}>{userRolesForFilter[recordItem?.userId.role]}</p>
        </div>

      </Paper>
      <Paper>
        <h3 className={styles.userInfoTitle}>{titles.historyTitles.changesTitle}</h3>
        <Table>
          <TableHead className={tableHeadStyles.tableHead}>
            <TableRow>
              <TableCell className={styles.tableCell}>{titles.historyTitles.subject}</TableCell>
              <TableCell className={styles.tableCell}>{titles.historyTitles.before}</TableCell>
              <TableCell className={styles.tableCell}>{titles.historyTitles.after}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell className={styles.tableCell}>{
                !recordItem?.subject.model ? recordItem?.subject.name :
                  `${recordItem?.subject.model}/${recordItem?.subject.name}`
              }</TableCell>
              <TableCell className={styles.tableCell}>{
                !recordItem?.valueBeforeChange.length ? <p>{titles.historyTitles.noChanges}</p> :
                  recordItem?.valueBeforeChange.map(value =>
                    <p>{JSON.stringify(value)}</p>)
              }</TableCell>
              <TableCell className={styles.tableCell}>{
                !recordItem?.valueAfterChange.length ? <p>{titles.historyTitles.noChanges}</p> :
                  recordItem?.valueAfterChange.map(value =>
                    <p>{JSON.stringify(value)}</p>)
              }</TableCell>
            </TableRow>
          </TableBody>
        </Table>

      </Paper>
    </div>
  );
};
export default withRouter(HistoryDetails);
