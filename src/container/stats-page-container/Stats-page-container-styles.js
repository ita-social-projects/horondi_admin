import { makeStyles } from '@material-ui/core/styles';
import { config } from '../../config';

const { drawerWidth } = config.app;

export const useStyles = makeStyles((theme) => ({
  statsPageContainer: {
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`
    },
    marginTop: 65,
    padding: 20,
    width: '100%'
  }
}));
