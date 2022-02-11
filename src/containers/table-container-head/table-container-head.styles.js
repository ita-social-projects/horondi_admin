import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  tableHead: {
    backgroundColor: `${theme.palette.type}grey`,

    '& th': {
      color: theme.palette.textColor,
      fontWeight: 600,
      fontSize: '14px',
      lineHeight: '20px',
      letterSpacing: '0.001em'
    }
  },
  actionCell: {
    paddingLeft: 30
  }
}));
