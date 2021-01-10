import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  tableNav: {
    display: 'flex',
    flexDirection: 'column',
    margin: theme.spacing(1),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(2)
  }
}));
