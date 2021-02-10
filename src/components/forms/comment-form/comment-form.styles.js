import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  saveCommentButton: {
    margin: theme.spacing(2)
  },
  paper: {
    display: 'flex',
    alignItems: 'center'
  },
  textField: {
    margin: '10px 5px',
    width: '1150px'
  },
  error: {
    color: '#e60000',
    marginLeft: '5px'
  }
}));
