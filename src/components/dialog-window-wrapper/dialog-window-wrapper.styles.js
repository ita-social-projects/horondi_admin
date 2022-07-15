import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
  dialogComponent: {
    alignContent: 'start'
  },
  dialogTitleWrapper: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  dialogTitle: {
    '& h2': {
      fontSize: '1.5rem !important',
      fontWeight: '700 !important'
    }
  },
  closeButton: {
    fontSize: '2rem',
    padding: '1rem',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#e8e8e8'
    }
  }
}));
