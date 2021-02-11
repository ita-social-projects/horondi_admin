import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

import { useCommonStyles } from '../common.styles';
import { getSizes } from '../../redux/sizes/sizes.actions';

import { closeDialog } from '../../redux/dialog-window/dialog-window.actions';
import useSuccessSnackbar from '../../utils/use-success-snackbar';
import TableContainerRow from '../../containers/table-container-row';
import TableContainerGenerator from '../../containers/table-container-generator';
import LoadingBar from '../../components/loading-bar';
import { config } from '../../configs';
import { sizesSelectorWithPagination } from '../../redux/selectors/sizes.selector';

const tableTitles = config.tableHeadRowTitles.sizes.sizesPageTitles;
const { CREATE_SIZE_TITLE } = config.buttonTitles;
const map = require('lodash/map');

const Sizes = () => {
  const dispatch = useDispatch();
  const commonStyles = useCommonStyles();

  const {
    sizesList,
    loading,
    currentPage,
    rowsPerPage,
    itemsCount
  } = useSelector(sizesSelectorWithPagination);

  useEffect(() => {
    dispatch(getSizes());
  }, []);

  const sizeItems = map(sizesList, (size) => (
    <TableContainerRow
      showAvatar={false}
      showEdit
      name='До рюбзака'
      size={size.name}
      available={size.available ? 'В наявності' : 'Відсітній'}
      id={size._id}
      key={size._id}
    />
  ));
  console.log(sizesList);
  return (
    <div className={commonStyles.container}>
      <div className={commonStyles.adminHeader}>
        <Typography
          variant='h1'
          className={commonStyles.materialTitle}
          data-cy='comment-header'
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
          tableTitles={sizeItems ? tableTitles : 'NO sizes'}
          tableItems={sizeItems}
        />
      ) : (
        <LoadingBar />
      )}
    </div>
  );
};

export default Sizes;
