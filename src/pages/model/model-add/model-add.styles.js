import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  modelItemAdd: {
    display: 'flex',
    flexDirection: 'column',
    margin: '20px 0'
  },
  textField: {
    margin: '10px 5px'
  },
  modelAdd: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  saveButton: {
    margin: theme.spacing(2)
  },
  container: {
    width: '100%',
    padding: 20,
    '@media (max-width: 600px)': {
      padding: '10px 20px'
    },
    '@media (max-width: 481px)': {
      marginTop: '0'
    },
    '@media (max-width: 405px)': {
      paddingTop: '20px'
    }
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
  modelImage: {
    width: '5rem',
    height: '5rem',
    margin: '5px',
    fontSize: '.7rem',
    padding: '.2rem'
  },
  modelInputFile: { display: 'none' }
}));
