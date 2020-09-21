import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 150
  },
  checkbox: {
    margin: '20px 7px'
  },
  gridContainer: {
    marginTop: theme.spacing(2)
  }
}));

export default useStyles;
