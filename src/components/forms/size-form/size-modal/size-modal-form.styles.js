import { makeStyles } from '@material-ui/core/styles';

export const useModalStyles = makeStyles((theme) => ({
  mainWrapper: {
    width: '500px'
  },
  saveButton: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    marginLeft: '.5rem'
  }
}));
