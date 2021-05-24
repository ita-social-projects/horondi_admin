import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'fixed',
    zIndex: theme.zIndex.drawer + 1
  },
  title: {
    flexGrow: 1,
    '@media (max-width: 450px)': {
      fontSize: '16px',
      lineHeight: '20px'
    }
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  }
}));
