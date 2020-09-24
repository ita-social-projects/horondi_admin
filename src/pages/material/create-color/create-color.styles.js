import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  materialItemAdd: {
    display: 'flex',
    flexDirection: 'column',
    margin: '0 0 20px !important'
  },
  textfield: {
    margin: '10px 5px !important'
  },
  materialAdd: {
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
    marginTop: 70
  },
  tabs: {
    backgroundColor: 'white',
    '& span.MuiTab-wrapper': {
      color: '#3F51B5'
    },
    '& span.MuiTabs-indicator': {
      backgroundColor: '#3F51B5'
    }
  },
  controlsBlock: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  inputError: {
    color: '#e60000',
    padding: '0 5px'
  },

  colorInputFile: { display: 'none' },
  colorImage: {
    fontSize: '.7rem',
    padding: '.2rem important'
  }
}));
