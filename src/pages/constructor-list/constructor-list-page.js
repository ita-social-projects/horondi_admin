import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { Button, Typography } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import { Link } from 'react-router-dom';
import { map } from 'lodash';
import { useCommonStyles } from '../common.styles';
import { config } from '../../configs';
import { getModels } from '../../redux/model/model.actions';
import LoadingBar from '../../components/loading-bar';
import { selectModel } from '../../redux/model/model.reducer';
import { useStyles } from './constructor-list-page.styles';
import {
  getConstructors,
  deleteConstructor
} from '../../redux/constructor/constructor.actions';
import { constructorSelectorWithPagination } from '../../redux/selectors/constructor.selectors';
import TableContainerGenerator from '../../containers/table-container-generator';
import TableContainerRow from '../../containers/table-container-row';
import { closeDialog } from '../../redux/dialog-window/dialog-window.actions';
import useSuccessSnackbar from '../../utils/use-success-snackbar';

const { NO_CONSTRUCTOR_MESSAGE, DELETE_CONSTRUCTOR_MESSAGE } = config.messages;
const { materialUiConstants } = config;
const { CREATE_CONSTRUCTOR } = config.buttonTitles;
const tableTitles = config.tableHeadRowTitles.constructorList;
const pageTitle = config.titles.constructorListPageTitles.mainPageTitle;

const ConstructorListPage = () => {
  const [id, setId] = useState('');
  const dispatch = useDispatch();

  const { openSuccessSnackbar } = useSuccessSnackbar();

  const constructorDeleteHandler = (constructorId) => {
    const removeConstructor = () => {
      dispatch(closeDialog());
      dispatch(deleteConstructor(constructorId));
    };
    openSuccessSnackbar(removeConstructor, DELETE_CONSTRUCTOR_MESSAGE);
  };

  const handleChange = (event) => {
    setId(event.target.value);
  };

  const commonStyles = useCommonStyles();
  const styles = useStyles();
  const { list, loading, currentPage, rowsPerPage } = useSelector(selectModel);
  const {
    items: constructorItems,
    loading: constructorLoading,
    currentPage: constructorCurrentPage,
    filter: constructorFilter,
    rowsPerPage: constructorRowsPerPage,
    itemsCount
  } = useSelector(constructorSelectorWithPagination);

  const handleConstructor = () => {
    dispatch(push(`/constructor-model/${id}`));
  };

  useEffect(() => {
    dispatch(
      getModels({
        limit: rowsPerPage,
        skip: currentPage * rowsPerPage,
        rowsPerPage
      })
    );
  }, [dispatch, rowsPerPage, currentPage]);

  useEffect(() => {
    dispatch(
      getConstructors({
        limit: constructorRowsPerPage,
        skip: constructorCurrentPage * constructorRowsPerPage,
        filter: constructorFilter
      })
    );
  }, [
    dispatch,
    constructorRowsPerPage,
    constructorCurrentPage,
    constructorFilter
  ]);

  const constructorRows = map(constructorItems, (item) => (
    <TableContainerRow
      image={
        item.model.images.thumbnail
          ? `${config.imagePrefix}${item.model.images.thumbnail}`
          : ''
      }
      key={item._id}
      id={item._id}
      name={item.name[0].value}
      deleteHandler={() => constructorDeleteHandler(item._id)}
      editHandler={() => {
        dispatch(push(`/constructor-list/${item._id}`));
      }}
    />
  ));

  if (loading || constructorLoading) {
    return <LoadingBar />;
  }

  const DropDownModelList = () => (
    <FormControl required className={styles.formControl}>
      <InputLabel className={styles.textAbove}>
        Оберіть модель для конструктора
      </InputLabel>
      <Select
        value={id}
        id={id}
        onChange={handleChange}
        autoWidth
        className={styles.selectedEmpty}
      >
        <MenuItem value='' disabled>
          Модель
        </MenuItem>
        {list.map((modelItem) => (
          <MenuItem key={modelItem._id} value={modelItem._id}>
            {modelItem.name[0].value}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText className={styles.textAbove}>
        Після вибору моделі настисніть кнопку створити новий
      </FormHelperText>
    </FormControl>
  );

  return (
    <div className={commonStyles.container}>
      <div className={commonStyles.adminHeader}>
        <Typography variant='h1' className={commonStyles.materialTitle}>
          {pageTitle}
        </Typography>

        <div className={styles.constructorButton}>
          <Button
            disabled={!id ? 'disabled' : ''}
            data-cy='add-back'
            component={Link}
            onClick={handleConstructor}
            variant={materialUiConstants.contained}
            color={materialUiConstants.primary}
          >
            {CREATE_CONSTRUCTOR}
          </Button>
        </div>
      </div>
      <div>
        <DropDownModelList />
      </div>
      {constructorRows.length ? (
        <TableContainerGenerator
          pagination
          data-cy='constructorTable'
          count={itemsCount}
          tableTitles={tableTitles}
          tableItems={constructorRows}
        />
      ) : (
        <p className={styles.noConstructor}>{NO_CONSTRUCTOR_MESSAGE}</p>
      )}
    </div>
  );
};

export default ConstructorListPage;
