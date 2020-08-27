import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  patternItem: {
    display: 'flex',
    flexDirection: 'column',
    margin: theme.spacing(2),
    padding: '10px 10px'
  },
  textField: {
    margin: '5px 0'
  }
}));
