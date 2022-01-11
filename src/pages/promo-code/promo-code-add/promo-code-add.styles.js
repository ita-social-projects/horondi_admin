import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
  container: {
    marginLeft: 16,
    fontFamily: 'Open Sans',
    marginTop: 100
  },
  promoNameContainer: {
    display: 'flex'
  },
  title: {
    marginTop: 25,
    fontSize: '34px',
    lineHeight: '46px',
    letterSpacing: '0.0025em'
  },
  subTitle: {
    margin: '30px 0 20px',
    display: 'block',
    fontWeight: 'bold',
    fontSize: '24px',
    lineHeight: '32px'
  },
  amountInput: {
    display: 'block'
  },
  fixedButtons: {
    display: 'flex',
    alignItems: 'center',
    gap: '30px'
  }
}));
