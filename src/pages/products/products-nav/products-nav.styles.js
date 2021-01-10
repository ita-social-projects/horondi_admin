import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  filters: {
    paddingRight: '0px !important'
  },
  filtersMenu: {
    width: '100%',
    padding: '5px 5px 10px'
  },
  wrapper: {
    padding: '0px 14px 0px 8px',
    marginBottom: theme.spacing(1)
  },
  heading: {
    marginBottom: theme.spacing(1),
    paddingLeft: '10px',
    fontSize: 20,
    color: theme.palette.text.disabled,
    fontWeight: 'bold'
  }
}));
