import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  quantity: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  addBtn: {
    margin: '12px 0px'
  },
  generate: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end'
  },
  discounts: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    fontSize: '14px'
  },
  discountTittle: {
    fontWeight: 600,
    fontSize: '18px'
  },
  discountSubTittle: {
    fontWeight: 600
  },
  section: {
    display: 'flex',
    gap: '48px',
    '@media(max-width:600px)': {
      flexDirection: 'column',
      gap: '12px'
    }
  },
  discountInput: {
    minWidth: '248px'
  },
  promoBtn: {
    margin: '12px 0px',
    '@media(max-width:600px)': {
      width: 'fit-content'
    }
  },
  error: {
    color: 'red',
    fontSize: '12px',
    height: '12px'
  }
}));
