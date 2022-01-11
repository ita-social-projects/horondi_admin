import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
  container: {
    width: '100%',
    margin: '100px 16px 0 16px'
  },
  promoTitle: {
    fontSize: '34px',
    lineHeight: '46px',
    letterSpacing: '0.0025em'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between'
  }
}));
