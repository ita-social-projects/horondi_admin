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
  ellipsis: {
    maxWidth: 200,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  smallCell: {
    width: '150px'
  }
}));
