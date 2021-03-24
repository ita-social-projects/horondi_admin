import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
  error: {
    color: '#e60000',
    marginBottom: '2%'
  },
  textField: {
    width: '100%',
    marginBottom: '15px'
  },
  courierTitle: {
    fontWeight: 400,
    fontSize: 20,
    width: '100%',
    color: 'rgba(0, 0, 0, 0.87)',
    margin: '20px 0 20px 0'
  },
  courierInputDataTitle: {
    fontWeight: 400,
    fontSize: 20,
    color: 'rgba(0, 0, 0, 0.87)',
    margin: '0 0 20px 0'
  }
}));
