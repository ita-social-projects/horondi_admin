import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import Pagination from '@material-ui/lab/Pagination';
import { useStyles } from './pagination-controller.styles';
import { setCurrentPage } from '../../redux/table/table.actions';
import { selectTablePaginationCurrentRows } from '../../redux/selectors/table.selectors';

const PaginationController = () => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const { currentPage, itemsCount, rowsPerPage } = useSelector(
    selectTablePaginationCurrentRows
  );

  return (
    <div className={styles.root}>
      <Pagination
        count={Math.ceil(itemsCount / rowsPerPage)}
        page={currentPage + 1}
        onChange={(e, page) => {
          dispatch(setCurrentPage(page - 1));
        }}
      />
    </div>
  );
};

export default PaginationController;
