import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3)
  },
  medium: {
    width: theme.spacing(5),
    height: theme.spacing(5)
  },
  pageTruncateTableControl: {
    maxWidth: 200,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontSize: '16px',
    fontWeight: 400
  },
  controlButton: {
    margin: '20px 10px 20px 0'
  },
  tableRowCursor: {
    cursor: 'default'
  }
}));
