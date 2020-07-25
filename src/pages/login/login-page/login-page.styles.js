import { makeStyles } from '@material-ui/core/styles';
import { config } from '../../../configs';

const { drawerWidth } = config.app;

export const useStyles = makeStyles((theme) => ({
  login: {
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    textAlign: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  submit: {
    margin: theme.spacing(1)
  },
  container: {
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`
    },
    marginTop: 65,
    padding: theme.spacing(2),
    width: '100%'
  },
  input: {
    width: '300px',
    margin: theme.spacing(1)
  }
}));
