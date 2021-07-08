import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  headerItemAdd: {
    display: 'flex',
    flexDirection: 'column',
    margin: '20px 0'
  },
  textField: {
    margin: '10px 5px'
  },
  headerAdd: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  saveButton: {
    margin: theme.spacing(2),
  },
  container: {
    width: '100%',
    padding: 20,
    '@media (max-width: 600px)': {
      'paddingTop': '5px'
    },
    '@media (max-width: 392px)': {
      'paddingTop': '15px'
    },
  },
  tabs: {
    backgroundColor: 'white',
    color: 'black'
  },
  controlsBlock: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  inputError: {
    color: '#e60000',
    marginLeft: '5px'
  },
  headerInputFile: { display: 'none' }
}));
