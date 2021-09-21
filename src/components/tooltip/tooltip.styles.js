import { makeStyles } from '@material-ui/core/styles';
import { config } from '../../configs';

const { drawerWidth } = config.app;

export const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    fontWeight: 600
  }
}));
