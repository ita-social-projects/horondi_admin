import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
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
  quantity: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center'
  }
}));
