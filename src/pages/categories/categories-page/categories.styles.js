import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  outerContainer: {
    paddingTop: '84px',
    width: '100%'
  },
  tableNav: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: theme.spacing(1),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(2)
  }
}));
