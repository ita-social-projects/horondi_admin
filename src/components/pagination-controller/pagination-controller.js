import React from 'react';

import { IconButton } from '@material-ui/core';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import { useDispatch, useSelector } from 'react-redux';
import useStyles from './pagination-controller.styles';
import { setCurrentPage } from '../../redux/table/table.actions';

const PaginationController = () => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const { currentPage, itemsCount, rowsPerPage } = useSelector(
    ({
      Table: {
        itemsCount,
        pagination: { currentPage, rowsPerPage }
      }
    }) => ({
      currentPage,
      itemsCount,
      rowsPerPage
    })
  );

  const handleFirstPageButtonClick = () => {
    dispatch(setCurrentPage(0));
  };

  const handleBackButtonClick = () => {
    dispatch(setCurrentPage(currentPage - 1));
  };

  const handleNextButtonClick = () => {
    dispatch(setCurrentPage(currentPage + 1));
  };

  const handleLastPageButtonClick = () => {
    dispatch(
      setCurrentPage(Math.max(0, Math.ceil(itemsCount / rowsPerPage) - 1))
    );
  };
  return (
    <div className={styles.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={currentPage === 0}
        aria-label='first page'
      >
        <FirstPageIcon />
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={currentPage === 0}
        aria-label='previous page'
      >
        <KeyboardArrowLeft />
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={Boolean(currentPage >= itemsCount / rowsPerPage - 1)}
        aria-label='next page'
      >
        <KeyboardArrowRight />
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={Boolean(currentPage >= itemsCount / rowsPerPage - 1)}
        aria-label='last page'
      >
        <LastPageIcon />
      </IconButton>
    </div>
  );
};

export default PaginationController;
