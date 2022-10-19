import React from 'react';
import {
  TablePagination,
  Typography,
  TextField,
  Button
} from '@material-ui/core';

import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { config } from '../../configs';
import PaginationController from '../../components/pagination-controller';
import { useStyles } from './table-pagination-container.styles';
import {
  setCurrentPage,
  setRowsPerPage
} from '../../redux/table/table.actions';

import { tableTranslations } from '../../configs/table-translations';
import { selectTablePaginationCurrentRowsOptions } from '../../redux/selectors/table.selectors';

const { ROWS_PER_PAGE } = tableTranslations;
const {
  labels: { goToPage },
  buttonTitles: { GO },
  paginationInputErrorMessages: {
    MUST_BE_NUMBER,
    MUST_BE_POSITIVE,
    PAGE_NOT_FOUND
  }
} = config;

export const TablePaginator = () => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const { itemsCount, rowsPerPage, rowsPerPageOptions, currentPage } =
    useSelector(selectTablePaginationCurrentRowsOptions);

  const formSchema = Yup.object().shape({
    pageInput: Yup.number()
      .min(1)
      .max(Math.ceil(itemsCount / rowsPerPage), PAGE_NOT_FOUND)
      .typeError(MUST_BE_NUMBER)
      .positive(MUST_BE_POSITIVE)
  });

  const { values, handleChange, handleSubmit, errors } = useFormik({
    validationSchema: formSchema,
    validateOnBlur: true,
    initialValues: {
      pageInput: ''
    },
    onSubmit: (data) => {
      dispatch(setCurrentPage(data.pageInput - 1));
    }
  });

  const handleChangePage = (_event, newPage) => {
    dispatch(setCurrentPage(newPage));
  };

  const handlePressEnter = (event) => {
    if (event.key === 'Enter' && values.pageInput && !errors.pageInput) {
      handleSubmit(values);
    }
  };

  const handleChangeRowsPerPage = (event) => {
    const rowsPerPageValue = parseInt(event.target.value);
    dispatch(setCurrentPage(0));
    dispatch(setRowsPerPage(rowsPerPageValue));
  };

  const getDisplayedRowsLabel = (from, to, count) => `${from}-${to} з ${count}`;
  return (
    <div className={styles.pagination}>
      <TablePagination
        component='div'
        rowsPerPageOptions={rowsPerPageOptions}
        count={itemsCount}
        rowsPerPage={rowsPerPage}
        page={currentPage}
        SelectProps={{ native: true }}
        labelRowsPerPage={ROWS_PER_PAGE}
        labelDisplayedRows={({ from, to, count }) =>
          getDisplayedRowsLabel(from, to, count)
        }
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        ActionsComponent={PaginationController}
      />
      <div className={styles.goToPage}>
        <Typography variant='body2'>{goToPage}</Typography>
        <TextField
          id='pageInput'
          className={styles.root}
          variant='outlined'
          value={values.pageInput}
          onChange={handleChange}
          onKeyPress={handlePressEnter}
          error={!!errors.pageInput}
        />
        <Button
          disabled={!values.pageInput || !!errors.pageInput}
          onClick={handleSubmit}
          variant='outlined'
          color='default'
        >
          {GO}
        </Button>
        {errors.pageInput && (
          <div className={styles.error}>{errors.pageInput}</div>
        )}
      </div>
    </div>
  );
};
