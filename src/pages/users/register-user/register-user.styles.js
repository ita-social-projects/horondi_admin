import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles(() => ({
  detailsContainer: {
    padding: 15,
    '@media (max-width: 450px)': {
      padding: 0
    }
  },
  userInputPanel: {
    display: 'flex',
    flexDirection: 'column'
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
      margin: '10px 0 25px'
    }
  }
}));
