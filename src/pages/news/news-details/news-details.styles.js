import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  newsItemUpdate: {
    display: 'flex',
    flexDirection: 'column',
    margin: '20px 0'
  },
  newsDetails: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  detailsContainer: {
    width: '100%',
    padding: 20,
    marginTop: 70
  },
  saveButton: {
    margin: theme.spacing(2)
  },
  textField: {
    margin: '10px 5px'
  },
  tabs: {
    backgroundColor: '#424242'
  },
  controlsBlock: {
    display: 'flex',
    justifyContent: 'space-between'
  }
}));
