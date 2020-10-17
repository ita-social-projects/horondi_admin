import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  button: {
    '& .MuiButton-outlined': {
      border: `1px solid ${theme.palette.error.main}`,
      color: theme.palette.error.light
    }
  }
}));
