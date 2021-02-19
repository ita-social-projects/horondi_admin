import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, Button } from '@material-ui/core';
import { push } from 'connected-react-router';
import { Link } from 'react-router-dom';

import { useCommonStyles } from '../common.styles';
import { closeDialog } from '../../redux/dialog-window/dialog-window.actions';
import { getSizes, deleteSize } from '../../redux/sizes/sizes.actions';
import TableContainerRow from '../../containers/table-container-row';
import TableContainerGenerator from '../../containers/table-container-generator';
import useSuccessSnackbar from '../../utils/use-success-snackbar';
import LoadingBar from '../../components/loading-bar';
import { config } from '../../configs';
import { sizesSelectorWithPagination } from '../../redux/selectors/sizes.selector';

const map = require('lodash/map');

const tableTitles = config.tableHeadRowTitles.sizes.sizesPageTitles;
const pathToAddSizePage = config.routes.pathToAddSize;
const { CREATE_SIZE_TITLE } = config.buttonTitles;
const { DELETE_SIZE_MESSAGE, NO_SIZES_MESSAGE } = config.messages;
const { AVALIABLE_TEXT, UNAVALIABLE_TEXT } = config.sizesAvailableVariants;

const Sizes = () => {
  const dispatch = useDispatch();
  const commonStyles = useCommonStyles();
  const { openSuccessSnackbar } = useSuccessSnackbar();

  const { sizesList, loading, itemsCount } = useSelector(
    sizesSelectorWithPagination
  );

  useEffect(() => {
    dispatch(getSizes());
  }, [sizesList]);

  const SizeDeleteHandler = (id) => {
    const removeSize = () => {
      dispatch(closeDialog());
      dispatch(deleteSize(id));
    };
    openSuccessSnackbar(removeSize, DELETE_SIZE_MESSAGE);
  };

  if (loading) {
    return <LoadingBar />;
  }
  const sizeItems = map(sizesList, (size) => (
    <TableContainerRow
      showAvatar={false}
      showEdit
      showDelete
      name={size.simpleName[0].value}
      size={size.name}
      available={size.available ? AVALIABLE_TEXT : UNAVALIABLE_TEXT}
      id={size._id}
      key={size._id}
      deleteHandler={() => {
        SizeDeleteHandler(size._id);
      }}
      editHandler={() => {
        dispatch(push(`/sizes/${size._id}`));
      }}
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
          to={pathToAddSizePage}
        >
          {CREATE_SIZE_TITLE}
        </Button>
      </div>
      {!loading ? (
        <TableContainerGenerator
          pagination
          data-cy='sizesTable'
          count={itemsCount}
          tableTitles={sizeItems ? tableTitles : [NO_SIZES_MESSAGE]}
          tableItems={sizeItems}
        />
      ) : (
        <LoadingBar />
      )}
    </div>
  );
};

export default Sizes;
