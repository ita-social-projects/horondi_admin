import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  newsItemAdd: {
    display: 'flex',
    flexDirection: 'column',
    margin: '20px 0'
  },
  textField: {
    margin: '10px 5px'
  },
  newsAdd: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  saveButton: {
    margin: '20px 0'
  },
  container: {
    width: '100%',
    padding: 20,
    marginTop: 70
  },
  controlsBlock: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  select: {
    width: '150px'
  }
}));
