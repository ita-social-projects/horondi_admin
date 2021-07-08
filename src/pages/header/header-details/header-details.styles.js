import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  headerItemUpdate: {
    display: 'flex',
    flexDirection: 'column',
    margin: '20px 0'
  },
  headerDetails: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  detailsContainer: {
    width: '100%',
    padding: 20,
    '@media (max-width: 600px)': {
      paddingTop: '5px'
    },
    '@media (max-width: 392px)': {
      paddingTop: '13px'
    }
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
  },
  inputError: {
    color: '#e60000',
    marginLeft: '5px'
  }
}));
