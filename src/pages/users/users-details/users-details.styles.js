import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles((theme) => ({
  detailsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%',
    '@media (max-width: 768px)': {
      flexDirection: 'column',
      justifyContent: 'center'
    }
  },
  controlsBlock: {
    display: 'flex',
    margin: '40px 10px 20px 0',
    '@media (max-width: 768px)': {
      margin: '20px 10px 20px 0'
    }
  }
}));
