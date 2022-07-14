import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
  container: {
    '&.MuiPaper-root': {
      backgroundColor: 'inherit'
    },
    display: 'flex',
    alignItems: 'center',
    width: 250,
    height: 36,
    paddingLeft: 7,
    '& div': {
      width: '100%'
    }
  }
}));
