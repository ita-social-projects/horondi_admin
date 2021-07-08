import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  container: {
    width: `100%`,
    position: 'static',
    padding: '0 20px',  
    '@media (max-width: 358px)': {
      'padding': '0'
    }
  }
}));
