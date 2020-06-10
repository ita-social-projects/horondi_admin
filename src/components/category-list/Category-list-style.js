import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  tableNav: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: theme.spacing(1),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(2)
  }
}));

export default useStyles;
