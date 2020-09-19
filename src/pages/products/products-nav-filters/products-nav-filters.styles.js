import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  tableNav: {
    padding: theme.spacing(1)
  },
  wrapper: {
    '& .MuiButton-root': {
      padding: '6px !important'
    }
  }
}));
