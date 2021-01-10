import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  tableHead: {
    backgroundColor: `${theme.palette.type}grey`
  },
  actionCell: {
    paddingLeft: 30
  }
}));
