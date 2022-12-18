import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  text: {
    whiteSpace: 'nowrap',
    maxWidth: '40vw',
    textOverflow: 'ellipsis',
    overflow: 'hidden'
  },
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
    width: '180px'
  },
  image: {
    maxWidth: '300px'
  },
  imageValue: {
    '& img': {
      maxWidth: '150px'
    }
  }
}));
