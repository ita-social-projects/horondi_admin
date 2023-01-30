import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
  container: {
    '&.MuiPaper-root': {
      backgroundColor: 'inherit'
    },
    width: 150,
    '& button': {
      width: '100%'
    }
  }
}));
