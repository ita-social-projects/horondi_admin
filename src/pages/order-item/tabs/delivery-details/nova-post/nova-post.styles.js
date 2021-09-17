import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
  error: {
    color: '#e60000',
    marginTop: 15
  },
  novaPostTitle: {
    fontWeight: 400,
    fontSize: 18,
    color: '#1D1C1C'
  },
  novaPostDataTitle: {
    fontWeight: 400,
    fontSize: 16,
    color: '#4E4E4E'
  },
  novaPostData: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    marginBottom: '15px'
  },
  dataInput: {
    width: '100%'
  }
}));
