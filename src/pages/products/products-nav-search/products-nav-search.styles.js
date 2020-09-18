import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  clearButton: {
    height: '36px'
  },
  root: {
    '&.MuiPaper-root': {
      backgroundColor: 'inherit'
    },
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 230,
    height: '36px'
  },
  iconButton: {
    padding: 10
  }
}));
