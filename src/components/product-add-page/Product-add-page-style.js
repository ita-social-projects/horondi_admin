import { makeStyles } from '@material-ui/core/styles';
import { config } from '../../config';

const { drawerWidth } = config.app;

export const useStyles = makeStyles((theme) => ({
  content: {
    marginTop: 90,
    margin: theme.spacing(2),
    minHeight: '80vh',
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`
    }
  },
  textfield: {
    textTransform: 'uppercase',
    margin: theme.spacing(1),
    minWidth: 200
  },
  productPropetries: {
    margin: 10,
    padding: 10
  }
}));
