import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  orderContainer: {
    width: '100%',
    padding: '84px 20px 0px'
  },
  saveBtn: {
    marginTop: 20
  },
  general: {
    display: 'grid',
    gridGap: '5px',
    padding: '0px 15px 10px'
  },
  delivery: {
    display: 'grid',
    gridGap: '10px',
    padding: '0px 15px 10px'
  },
  recipient: {
    display: 'grid',
    gridGap: '25px',
    padding: '0px 15px 10px'
  },
  selectedProduct: {
    backgroundColor: theme.palette.textColor,
    display: 'flex',
    flexDirection: 'column',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    width: 550,
    fontSize: 20,
    padding: 20,
    position: 'absolute',
    '&:focus': {
      outline: 'none'
    }
  },
  productHeading: {
    textAlign: 'center'
  },
  productField: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14
  },
  dateContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0px 14px'
  },
  isPaid: {
    marginLeft: '14px'
  },
  idContainer: {
    padding: '0px 14px'
  },
  deliveryDetails: {
    display: 'grid',
    gridGap: 10
  },
  renderList: {
    margin: '9px 0px',
    '& > li': {
      marginBottom: '5px'
    }
  },
  controlsBlock: {
    display: 'flex',
    margin: '20px 0'
  }
}));
