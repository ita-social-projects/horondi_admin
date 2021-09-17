import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles(() => ({
  container: {
    margin: '30px 0',
    '@media (max-width: 450px)': {
      width: '100%',
      margin: '10px 0 30px',
      '& .MuiGrid-item': {
        width: '100%'
      }
    }
  }
}));
