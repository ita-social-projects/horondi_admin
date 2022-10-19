import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
  detailsContainer: {
    width: '100%',
    padding: 20,
    '@media (max-width: 600px)': {
      padding: '10px 20px'
    },
    '@media (max-width: 481px)': {
      marginTop: '10px'
    }
  }
}));
