import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
  title: {
    color: '#3f51b5',
    padding: '5px'
  },
  inputPanel: {
    display: 'flex',
    flexDirection: 'column',
    margin: '10px 0',
    padding: '10px'
  },
  textField: {
    margin: '10px 5px'
  },
  error: {
    color: '#e60000',
    marginLeft: '5px'
  },
  languagePanel: {}
}));
