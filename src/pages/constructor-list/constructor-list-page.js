import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { Button, Typography } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import { useCommonStyles } from '../common.styles';
import { config } from '../../configs';
import { getModels, deleteModel } from '../../redux/model/model.actions';
import { closeDialog } from '../../redux/dialog-window/dialog-window.actions';
import useSuccessSnackbar from '../../utils/use-success-snackbar';
import TableContainerRow from '../../containers/table-container-row';
import TableContainerGenerator from '../../containers/table-container-generator';
import LoadingBar from '../../components/loading-bar';
import { selectModelAndTable } from '../../redux/selectors/model.selectors';
import { useStyles } from '../../components/forms/model-form/model-form.styles';

const { labelsEn } = config.labels.model;
const { materialUiConstants } = config;
const { CREATE_CONSTRUCTOR } = config.buttonTitles;
const map = require('lodash/map');

const { MODEL_REMOVE_MESSAGE } = config.messages;

const tableTitles = config.tableHeadRowTitles.models;
const pageTitle = config.titles.constructorListPageTitles.mainPageTitle;
const { IMG_URL } = config;
const { showEnable, showDisable } = config.labels.model;

const ConstructorListPage = () => {
  const [value, setValue] = useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const id = value;
  console.log(id);
  const commonStyles = useCommonStyles();
  const styles = useStyles();
  const { openSuccessSnackbar } = useSuccessSnackbar();
  const { list, loading, currentPage, rowsPerPage, itemsCount } =
    useSelector(selectModelAndTable);

  const dispatch = useDispatch();

  const handleConstructor = () => {
    dispatch(push(config.routes.pathToConstructor.replace(':id', id)));
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

  const modelDeleteHandler = (id) => {
    const removeModel = () => {
      dispatch(closeDialog());
      dispatch(deleteModel(id));
    };
    openSuccessSnackbar(removeModel, MODEL_REMOVE_MESSAGE);
  };

  if (loading) {
    return <LoadingBar />;
  }
  // console.log(list)
  const modelItems = map(list, (modelItem) => (
    <TableContainerRow
      image={modelItem.images ? `${IMG_URL}${modelItem.images.thumbnail}` : ''}
      key={modelItem._id}
      id={modelItem._id}
      name={modelItem.name[0].value}
      category={modelItem.category?.name[0].value}
      show={modelItem.show ? showEnable : showDisable}
      priority={modelItem.priority}
      deleteHandler={() => modelDeleteHandler(modelItem._id)}
      editHandler={() => {
        dispatch(push(`/models/${modelItem._id}`));
      }}
    />
  ));

  const DropDownModelList = () => (
      <FormControl required className={styles.formControl}>
        <InputLabel shrink>Оберіть модель для конструктора</InputLabel>
        <Select
          // labelId='select-demo'
          // id='florida_select'
          // displayEmpty
          value={value}
          onChange={handleChange}
          autoWidth
          className={styles.selectedEmpty}
          inputProps={{ 'aria-label': 'Without label' }}
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
        <FormHelperText>
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
            data-cy={labelsEn.constructor}
            className={styles.saveButton}
            onClick={handleConstructor}
            color={materialUiConstants.secondary}
            variant={materialUiConstants.contained}
          >
            {/* {MODEL_CONSTRUCTOR} */}
            {CREATE_CONSTRUCTOR}
          </Button>
        </div>
      </div>
      <div>
        <DropDownModelList />
      </div>
      <TableContainerGenerator
        data-cy='modelTable'
        pagination
        count={itemsCount}
        tableTitles={tableTitles}
        tableItems={modelItems}
      />
    </div>
  );
};

export default ConstructorListPage;
