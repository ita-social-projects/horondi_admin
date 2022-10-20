import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
  promoTitle: {
    fontSize: '34px',
    lineHeight: '46px',
    letterSpacing: '0.0025em'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '20px',
    '@media (max-width: 450px)': {
      display: 'block'
    }
  }
}));
