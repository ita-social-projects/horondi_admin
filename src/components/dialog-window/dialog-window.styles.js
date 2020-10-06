import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
  dialogTitle: {
    '& h2': {
      fontSize: '1.5rem !important',
      fontWeight: '700 !important'
    }
  }
}));
