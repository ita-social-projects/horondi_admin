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
  uploadContainer: {
    display: 'inline-block',
    marginLeft: 0,
    cursor: 'pointer',
    width: '200px',
    height: '200px',
    transition: '0.4s ease',
    '&:hover': {
      opacity: 0.5,
      backgroundImage: `url(${upload})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat'
    },
    '& img': {
      width: 'inherit',
      height: 'inherit'
    },
    '&:hover > img': {
      opacity: 0.1,
      cursor: 'pointer'
    }
  },
  image: {
    width: '200px',
    height: '200px'
  },
  input: {
    display: 'none'
  },
  thumbsContainer: {
    display: 'inline-flex',
    width: '370px',
    flexWrap: 'wrap'
    // marginTop: 16
  },
  thumb: {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: 'border-box'
  },
  thumbInner: {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden'
  },
  img: {
    display: 'block',
    width: 'auto',
    height: '100%'
  }
}));
