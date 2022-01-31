import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import TableContainerRow from '../../../../containers/table-container-row';
import TableContainerGenerator from '../../../../containers/table-container-generator';
import { getAllBlocks } from '../../operations/about-us.queries';
import { useStyles } from './table-about-us.style';
import { config } from '../../../../configs';
import LoadingBar from '../../../../components/loading-bar';

const tableTitles = config.tableHeadRowTitles.aboutUsTitles;

const TableAboutUs = () => {
  const classes = useStyles();
  const { data, refetch, loading } = useQuery(getAllBlocks);
  const aboutUsData = data?.getAllBlocks || {};

  const runRefetchData = () => refetch();
  useEffect(runRefetchData, [data]);
  if (loading) {
    return <LoadingBar />;
  }
  const aboutUsItems = aboutUsData
    ? aboutUsData.map(({ _id, title, text }) => (
        <TableContainerRow
          className={classes.table}
          showAvatar={false}
          key={_id}
          title={title}
          text={text}
          deleteHandler
          editHandler
        />
      ))
    : null;
  return (
    <TableContainerGenerator
      id='AboutUsTable'
      tableTitles={tableTitles}
      tableItems={aboutUsItems}
    />
  );
};

export default TableAboutUs;
