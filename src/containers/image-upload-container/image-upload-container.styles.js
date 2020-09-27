import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  imageUploadContainer: {
    display: 'flex',
    alignItems: 'center',
    margin: '10px'
  },
  large: {
    marginLeft: '10px',
    width: theme.spacing(6),
    height: theme.spacing(6)
  },
  imageName: {
    fontSize: '.9rem',
    marginLeft: '10px',
    color: 'rgba(0, 0, 0, 0.54)',
    '@media (max-width: 768px)': {
      display: 'none'
    }
  },
  imageUpload: {
    fontSize: 14,
    marginLeft: '10px',
    color: 'rgba(0, 0, 0, 0.54)'
  },
  attachFile: {
    marginRight: '5px'
  }
}));
