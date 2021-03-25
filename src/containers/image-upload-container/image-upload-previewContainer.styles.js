import { makeStyles } from '@material-ui/core/styles';
import upload from '../../assets/images/upload.png';

export const useStyles = makeStyles(() => ({
  labelWithBack: {
    display: 'inline-block',
    width: '200px',
    height: '200px',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundImage: `url(${upload})`,
    '&:hover': {
      cursor: 'pointer',
      opacity: 0.7
    }
  },
  labelWithoutBack: {
    display: 'inline-block',
    width: '200px',
    height: '200px',
    '&:hover': {
      backgroundImage: `url(${upload})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat'
    },
    '&:hover > img': {
      opacity: 0,
      cursor: 'pointer'
    }
  },
  image: {
    width: '200px',
    height: '200px'
  },
  input: {
    display: 'none'
  }
}));
