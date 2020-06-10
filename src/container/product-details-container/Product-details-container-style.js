import { makeStyles } from '@material-ui/core/styles';
import { config } from '../../config';

const { drawerWidth } = config.app;

export const useStyles = makeStyles(() => ({
  container: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginTop: 65,
    position: 'static',
    padding: 20
  }
}));
