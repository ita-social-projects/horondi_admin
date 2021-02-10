import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Typography } from '@material-ui/core';
import ReactHtmlParser from 'react-html-parser';
import { Link } from 'react-router-dom';

import { useCommonStyles } from '../common.styles';
import {
  getComments,
  deleteComment
} from '../../redux/comments/comments.actions';

import { closeDialog } from '../../redux/dialog-window/dialog-window.actions';
import useSuccessSnackbar from '../../utils/use-success-snackbar';
import TableContainerRow from '../../containers/table-container-row';
import TableContainerGenerator from '../../containers/table-container-generator';
import LoadingBar from '../../components/loading-bar';
import { config } from '../../configs';
import { commentSelectorWithPagination } from '../../redux/selectors/comments.selectors';
import getTime from '../../utils/getTime';

const { CREATE_SIZE_TITLE } = config.buttonTitles;

const Sizes = () => {
  const dispatch = useDispatch();
  const commonStyles = useCommonStyles();

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
    </div>
  );
};

export default Sizes;
