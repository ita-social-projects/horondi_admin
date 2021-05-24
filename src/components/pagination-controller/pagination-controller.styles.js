import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    '@media (max-width: 450px)': {
      margin: 'auto'
    }
  }
}));
