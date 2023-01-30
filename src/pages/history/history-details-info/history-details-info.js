import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TableContainerRow from '../../../containers/table-container-row';
import TableContainerGenerator from '../../../containers/table-container-generator';
import titles from '../../../configs/titles';
import { userRolesForFilter } from '../../../utils/history';
import { useStyles } from '../history-details/history-details.styles';
import { historyEvents } from '../../../consts/history-events';

const HistoryDetailsInfo = ({ recordItem, darkMode }) => {
  const styles = useStyles({ darkMode });
  const { historyTitles } = titles;
  const {
    _id,
    userId,
    action,
    historyName,
    subject,
    valueAfterChange,
    valueBeforeChange
  } = recordItem;

  const userInfo = [
    {
      title: historyTitles.name,
      data: `${userId.firstName} ${userId.lastName}`
    },
    {
      title: historyTitles.role,
      data: userRolesForFilter[userId.role]
    },
    { title: historyTitles.email, data: userId.email },
    { title: historyTitles.id, data: userId._id }
  ];

  const itemInfo = [
    { title: historyTitles.action, data: historyEvents.historyAction[action] },
    {
      title: historyTitles.itemType,
      data: historyEvents.historyName[historyName]
    },
    {
      title: historyTitles.itemName,
      data: subject.name
    }
  ];

  const createHeadInfo = (info, title) => (
    <Grid item xs>
      <h3 className={styles.userInfoTitle}>{title}</h3>
      {info.map(({ title, data }, idx) => (
        <div className={styles.userInfoData} key={title + idx}>
          <p className={styles.userInfoItem}>{title}</p>
          <p className={styles.userInfoItem}>{data}</p>
        </div>
      ))}
    </Grid>
  );

  const userInfoHeadLines = createHeadInfo(userInfo, historyTitles.userInfo);
  const itemInfoHeadLines = createHeadInfo(itemInfo, historyTitles.itemsInfo);
  const arrayLength = (array) =>
    array.filter((value) => !_.isEmpty(value)).length;

  const tableTitles =
    arrayLength(valueBeforeChange) > arrayLength(valueAfterChange)
      ? valueBeforeChange
      : valueAfterChange;

  const tableRows = tableTitles.map((data, idx) => {
    const createCellValue = (value) =>
      value && JSON.stringify(Object.values(value)[0])?.replace(/,/g, ', ');
    const name = Object.keys(data)[0];

    return (
      <TableContainerRow
        key={name + idx}
        name={name}
        before={createCellValue(valueBeforeChange[idx])}
        after={createCellValue(valueAfterChange[idx])}
        showAvatar={false}
        showEdit={false}
        showDelete={false}
      />
    );
  });

  return (
    <>
      <h2 className={styles.detailsTitle}>
        {historyTitles.detailsTitleNumber(_id)}
      </h2>
      <Paper className={styles.userPaper}>
        <Grid container>
          {userInfoHeadLines}
          {itemInfoHeadLines}
        </Grid>
      </Paper>
      <h3 className={styles.userInfoTitle}>{historyTitles.changesTitle}</h3>
      <TableContainerGenerator
        tableItems={tableRows}
        tableTitles={historyTitles.tableTitles}
      />
    </>
  );
};

HistoryDetailsInfo.propTypes = {
  recordItem: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.array, PropTypes.object, PropTypes.string])
  ).isRequired,
  darkMode: PropTypes.bool.isRequired
};

export default HistoryDetailsInfo;
