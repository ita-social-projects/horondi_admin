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
import { useCommonStyles } from '../common.styles';
import { config } from '../../configs';
import { getModels } from '../../redux/model/model.actions';
import LoadingBar from '../../components/loading-bar';
import { selectModel } from '../../redux/model/model.reducer';
import { useStyles } from '../../components/forms/model-form/model-form.styles';

const { materialUiConstants } = config;
const { CREATE_CONSTRUCTOR } = config.buttonTitles;

const pageTitle = config.titles.constructorListPageTitles.mainPageTitle;

const ConstructorListPage = () => {
  const [id, setId] = useState('');

  const handleChange = (event) => {
    setId(event.target.value);
  };

  const commonStyles = useCommonStyles();
  const styles = useStyles();
  const { list, loading, currentPage, rowsPerPage } = useSelector(selectModel);

  const dispatch = useDispatch();

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

  if (loading) {
    return <LoadingBar />;
  }

  const DropDownModelList = () => (
    <FormControl required className={styles.formControl}>
      <InputLabel shrink>Оберіть модель для конструктора</InputLabel>
      <Select
        value={id}
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
    </div>
  );
};

export default ConstructorListPage;
