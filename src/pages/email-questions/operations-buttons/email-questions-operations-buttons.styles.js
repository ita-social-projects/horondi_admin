import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
  spamBtn: {
    marginLeft: '10px',
    '@media (max-width: 450px)': {
      fontSize: '10px'
    }
  },
  deleteBtn: {
    marginLeft: '10px',
    '@media (max-width: 450px)': {
      fontSize: '10px'
    }
  }
}));
