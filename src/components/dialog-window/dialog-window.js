import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@material-ui/core';
import { connect, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { noop } from 'lodash';
import { config } from '../../configs';
import { closeDialog } from '../../redux/dialog-window/dialog-window.actions';
import { StandardButton } from '../buttons';
import { useStyles } from './dialog-window.styles';
import DeleteButton from '../buttons/delete-button';
import { basicSelector } from '../../redux/dialog-window/dialog-window.reducer';

const { DELETE_TITLE } = config.buttonTitles;
const { NO_BUTTON, YES_BUTTON } = config.buttonTitles;

const DialogWindow = ({
  isOpen,
  dialogTitle,
  dialogContent,
  showCancelButton,
  onClickHandler
}) => {
  const styles = useStyles();
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(closeDialog());
  };

  return (
    <Dialog
      data-testid='dialog-window'
      id='dialog-window'
      onClose={handleClose}
      open={isOpen}
    >
      <DialogTitle className={styles.dialogTitle}>{dialogTitle}</DialogTitle>
      <DialogContent dividers>
        <div>{dialogContent}</div>
      </DialogContent>
      <DialogActions className={styles.buttonStyles}>
        {showCancelButton ? (
          <>
            <StandardButton
              className={styles.yesButton}
              data-testid='dialog-confirm'
              variant='outlined'
              title={YES_BUTTON}
              onClickHandler={onClickHandler}
            />
            <DeleteButton
              data-testid='dialog-cancel'
              onClickHandler={handleClose}
            >
              {NO_BUTTON}
            </DeleteButton>
          </>
        ) : (
          <StandardButton
            data-cy='dialog-confirm'
            variant='contained'
            title={dialogTitle}
            onClickHandler={onClickHandler}
          />
        )}
      </DialogActions>
    </Dialog>
  );
};

const mapStateToProps = basicSelector;

DialogWindow.propTypes = {
  isOpen: PropTypes.bool,
  dialogTitle: PropTypes.string,
  dialogContent: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  showCancelButton: PropTypes.bool,
  onClickHandler: PropTypes.func
};

DialogWindow.defaultProps = {
  isOpen: false,
  dialogTitle: DELETE_TITLE,
  dialogContent: '',
  showCancelButton: true,
  onClickHandler: noop
};

export default connect(mapStateToProps, null)(DialogWindow);
