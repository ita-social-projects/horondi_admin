import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
  container: {
    width: `100%`,
    marginTop: 65,
    position: 'static',
    padding: 20,
    '@media (max-width: 450px)': {
      padding: '0px'
    }
  }
}));
