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

import { tableTranslations } from '../../translations/table.translations';
import { selectTablePaginationCurrentRowsOptions } from '../../redux/selectors/table.selectors';

const { ROWS_PER_PAGE } = tableTranslations;
const {
  labels: { goToPage },
  buttonTitles: { GO },
  paginationInputErrorMessages: { MUST_BE_NUMBER, MUST_BE_POSITIVE }
} = config;

export const TablePaginator = () => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const {
    itemsCount,
    rowsPerPage,
    rowsPerPageOptions,
    currentPage
  } = useSelector(selectTablePaginationCurrentRowsOptions);

  const formSchema = Yup.object().shape({
    pageInput: Yup.number()
      .min(1)
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
      let page = data.pageInput;
      const lastPage = Math.ceil(itemsCount / rowsPerPage);
      page = page > lastPage ? lastPage : page;

      dispatch(setCurrentPage(page - 1));
    }
  });

  const handleChangePage = (event, newPage) => {
    dispatch(setCurrentPage(newPage));
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
