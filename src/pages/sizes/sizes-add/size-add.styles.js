import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  container: {
    width: `100%`,
    position: 'static',
    '@media (max-width: 450px)': {
      padding: '0px'
    }
  }
}));
