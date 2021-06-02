import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  datePicker: {
    width: 240,
    '& span': { color: 'grey !important' }
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
    '@media (max-width: 450px)': {
      width: '100%'
    }
  }
}));
