import { makeStyles } from '@material-ui/core/styles';
import { config } from '../../config';

const { drawerWidth } = config.app;

export const useStyles = makeStyles((theme) => ({
  container: {
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`
    },
    marginTop: 65,
    padding: theme.spacing(2),
    width: '100%'
  }
}));
