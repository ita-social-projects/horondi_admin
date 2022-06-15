import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  heading: {
    fontSize: theme.typography
  },
  secondaryHeading: {
    fontSize: theme.typography,
    color: theme.palette.text.secondary
  },
  column: {
    display: 'flex',
    flexDirection: 'column'
  }
}));
