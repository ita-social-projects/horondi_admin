import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography
} from '@material-ui/core';
import { connect, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { config } from '../../configs';
import { closeDialog } from '../../redux/dialog-window/dialog-window.actions';
import { StandardButton } from '../buttons';
import { useStyles } from './dialog-window.styles';
import DeleteButton from '../buttons/delete-button';

const { CANCEL_TITLE } = config.buttonTitles;

const DialogWindow = ({
  isOpen,
  dialogTitle,
  dialogContent,
  buttonTitle,
  showCancelButton
}) => {
  const styles = useStyles();
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(closeDialog());
  };

  return (
    <Dialog id='dialog-window' onClose={handleClose} open={isOpen}>
      <DialogTitle className={styles.dialogTitle}>{dialogTitle}</DialogTitle>
      <DialogContent dividers>
        <Typography gutterBottom>{dialogContent}</Typography>
      </DialogContent>
      <DialogActions>
        {showCancelButton ? (
          <>
            <StandardButton
              data-cy='dialog-cancel'
              variant='outlined'
              title={CANCEL_TITLE}
            />
            <DeleteButton data-cy='dialog-confirm'>{buttonTitle}</DeleteButton>
          </>
        ) : (
          <StandardButton
            data-cy='dialog-confirm'
            variant='contained'
            title={buttonTitle}
          />
        )}
      </DialogActions>
    </Dialog>
  );
};

const mapStateToProps = ({ DialogWindow }) => ({
  isOpen: DialogWindow.isOpen,
  dialogTitle: DialogWindow.dialogTitle,
  dialogContent: DialogWindow.dialogContent,
  buttonTitle: DialogWindow.buttonTitle,
  showCancelButton: DialogWindow.showCancelButton
});

DialogWindow.propTypes = {
  isOpen: PropTypes.bool,
  dialogTitle: PropTypes.string,
  dialogContent: PropTypes.string,
  buttonTitle: PropTypes.string,
  showCancelButton: PropTypes.bool
};

DialogWindow.defaultProps = {
  isOpen: false,
  dialogTitle: '',
  dialogContent: '',
  buttonTitle: '',
  showCancelButton: true
};

export default connect(mapStateToProps, null)(DialogWindow);
