import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 250,
    width: '100%',
    boxSizing: 'border-box'
  },
  dropdown: {
    margin: theme.spacing(1),
    width: 'initial'
  }
}));
