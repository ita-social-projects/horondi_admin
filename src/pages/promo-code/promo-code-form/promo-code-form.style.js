import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
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
  dataContainer: {
    display: 'flex'
  },
  dataPickerContainer: {
    marginRight: '16px'
  },
  errorDate: {
    fontSize: '11px',
    margin: '3px 0 0 14px',
    textAlign: 'left',
    color: theme.palette.red
  },
  textField: {
    display: 'block',
    '& input': {
      width: '162px'
    }
  },
  fixedButtons: {
    display: 'flex',
    alignItems: 'center',
    gap: '30px'
  }
}));
