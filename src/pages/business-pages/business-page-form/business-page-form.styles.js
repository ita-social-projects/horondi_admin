import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  businessPageForm: {
    display: 'flex',
    flexDirection: 'column',
    margin: '20px 0'
  },
  textField: {
    margin: '10px 5px'
  },
  saveButton: {
    margin: '20px 0'
  },
  container: {
    width: '100%',
    padding: 20,
    marginTop: 70
  },
  tabs: {
    backgroundColor: '#424242'
  },
  controlsBlock: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  errorMessage: {
    color: 'red',
    marginTop: 5,
    marginLeft: 15,
    fontSize: '.9em'
  }
}));
