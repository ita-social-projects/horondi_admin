import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, Button } from '@material-ui/core';

import { Link } from 'react-router-dom';
import { useCommonStyles } from '../common.styles';
import { getSizes } from '../../redux/sizes/sizes.actions';

import TableContainerRow from '../../containers/table-container-row';
import TableContainerGenerator from '../../containers/table-container-generator';
import LoadingBar from '../../components/loading-bar';
import { config } from '../../configs';
import { sizesSelectorWithPagination } from '../../redux/selectors/sizes.selector';

const tableTitles = config.tableHeadRowTitles.sizes.sizesPageTitles;
const { CREATE_SIZE_TITLE } = config.buttonTitles;
const { DELETE_SIZE_MESSAGE } = config.messages;
const { AVALIABLE_TEXT, UNAVALIABLE_TEXT } = config.sizesAvailableVariants;
const map = require('lodash/map');

const Sizes = () => {
  const dispatch = useDispatch();
  const commonStyles = useCommonStyles();

  const { sizesList, loading, itemsCount } = useSelector(
    sizesSelectorWithPagination
  );

  useEffect(() => {
    dispatch(getSizes());
  }, [sizesList]);

  if (loading) {
    return <LoadingBar />;
  }
  const sizeItems = map(sizesList, (size) => (
    <TableContainerRow
      showAvatar={false}
      showEdit
      showDelete
      name='Розмір для сумки'
      size={size.name}
      available={size.available ? AVALIABLE_TEXT : UNAVALIABLE_TEXT}
      id={size._id}
      key={size._id}
    />
  ));

  return (
    <div className={commonStyles.container}>
      <div className={commonStyles.adminHeader}>
        <Typography
          variant='h1'
          className={commonStyles.materialTitle}
          data-cy='sizes-header'
        >
          {config.titles.sizesTitles.mainPageTitle}
        </Typography>
        <Button
          id='add-sizes'
          component={Link}
          variant='contained'
          color='primary'
        >
          {CREATE_SIZE_TITLE}
        </Button>
      </div>
      {!loading ? (
        <TableContainerGenerator
          pagination
          data-cy='sizesTable'
          count={itemsCount}
          tableTitles={sizeItems ? tableTitles : DELETE_SIZE_MESSAGE}
          tableItems={sizeItems}
        />
      ) : (
        <LoadingBar />
      )}
    </div>
  );
};

export default Sizes;
