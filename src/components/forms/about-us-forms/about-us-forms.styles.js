import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((_theme) => ({
  title: {
    color: '#3f51b5',
    padding: '5px'
  },
  imageUploadContainer: {
    padding: '15px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  paper: {
    margin: '10px 0'
  }
}));
