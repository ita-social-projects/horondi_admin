import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  textField: {
    margin: '10px 5px'
  },
  formControl: {
    width: '100%',
    display: 'grid',
    gridTemplateColumns: '1fr auto',
    alignItems: 'center'
  }
}));
