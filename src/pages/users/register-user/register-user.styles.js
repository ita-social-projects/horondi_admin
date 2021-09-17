import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles((theme) => ({
  detailsContainer: {
    width: '100%',
    margin: theme.spacing(1),
    padding: 15,
    '@media (max-width: 450px)': {
      padding: 0,
      margin: 0
    }
  },
  userInputPanel: {
    width: '90%',
    display: 'flex',
    flexDirection: 'column',
    '@media (max-width: 450px)': {
      width: '100%'
    }
  },
  formControl: {
    margin: '15px 25px',
    minWidth: 120
  },
  formSelect: {
    width: 120,
    '@media (max-width: 450px)': {
      width: '100%'
    }
  },
  registrationTitle: {
    margin: '10px 0'
  },
  saveButton: {
    height: 40
  },
  sendButton: {
    margin: '15px 25px',
    '@media (max-width: 450px)': {
      margin: '0 0 25px'
    }
  }
}));
