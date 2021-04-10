import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import tableHeadRowTitles from '../../../configs/table-head-row-titles';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import titles from '../../../configs/titles';

const styles = (theme) => ({
  root: {
    margin: 0,
    width: '60vw',
    padding: theme.spacing(2)
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  }
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant='h6'>{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label='close'
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2)
  }
}))(MuiDialogContent);

export default function HistoryDetails() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div style={{ height: 800, width: 800 }}>
      <Dialog
        maxWidth={'lg'}
        onClose={handleClose}
        aria-labelledby='customized-dialog-title'
        open={false}
      >
        <DialogTitle id='customized-dialog-title' onClose={handleClose}>
          {titles.historyTitles.detailsTitle}
        </DialogTitle>
        <DialogContent dividers>
          <div>
            <Table classes={{ root: styles.tableHeader }}>
              <TableHead>
                {tableHeadRowTitles.historyDetails.map((title) => (
                  <TableCell align={'center'} className={styles.tableCell}>
                    {title}
                  </TableCell>
                ))}
              </TableHead>
              <TableBody className={styles.tableBody}>
                <TableRow classes={{ root: styles.root }}>
                  <TableCell classes={{ root: styles.image }}></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
