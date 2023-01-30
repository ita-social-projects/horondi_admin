import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
  title: {
    '@media (max-width: 450px)': {
      '& h2': {
        fontSize: '20px'
      }
    }
  }
}));
