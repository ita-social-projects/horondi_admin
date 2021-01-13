import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
  root: {
    margin: '0 10px',
    '& input': {
      width: '40px',
      height: '16px',
      padding: '10px'
    }
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  goToPage: {
    display: 'flex',
    alignItems: 'center',
    margin: '0 15px',
    position: 'relative'
  },
  error: {
    color: '#e60000',
    position: 'absolute',
    bottom: '-15px'
  }
}));
