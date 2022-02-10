import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  name: {
    textAlign: 'center',
    fontSize: '10px',
    fontWeight: '900',
    lineHeight: '20px',
    letterSpacing: '0.001em'
  }
}));
