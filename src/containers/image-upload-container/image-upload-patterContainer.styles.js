import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
  image: {
    width: '200px',
    height: '200px',
    '&:hover': {
      cursor: 'pointer',
      opacity: 0.7
    }
  }
}));
