import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  brandEdit: {
    display: 'flex',
    flexDirection: 'column',
    margin: theme.spacing(2),
    flexGrow: 1,
    paddingTop: 70
  },
  textfield: {
    textTransform: 'uppercase',
    margin: 10,
    width: 300
  }
}));
