import { makeStyles } from '@material-ui/core/styles';
import upload from '../../assets/images/upload.png';

export const useStyles = makeStyles(() => ({
  label: {
    display: 'inline-block',
    width: '200px',
    height: '200px',
    backgroundImage: `url(${upload})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    '&:hover': {
      cursor: 'pointer',
      opacity: 0.7
    },
    '&:hover > img': {
      opacity: 0,
      cursor: 'pointer'
    }
  },
  image: {
    width: '200px',
    height: '200px',
    transition: '0.5s'
  },
  input: {
    display: 'none'
  }
}));
