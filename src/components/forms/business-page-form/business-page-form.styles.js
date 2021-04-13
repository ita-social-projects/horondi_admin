import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  businessPageForm: {
    display: 'flex',
    flexDirection: 'column',
    margin: '20px 0',
    padding: '10px'
  },
  textField: {
    margin: '10px 5px'
  },
  tabs: {
    backgroundColor: '#424242'
  },
  controlsBlock: {
    display: 'flex',
    marginTop: 20
  },
  controlButton: {
    marginLeft: 20
  },
  errorMessage: {
    color: 'red',
    marginTop: 5,
    marginLeft: 15,
    fontSize: '.9em'
  },
  tabField: {
    padding: 20,
    display: 'flex',
    flexDirection: 'column'
  }
}));
