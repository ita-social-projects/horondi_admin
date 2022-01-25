import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  certificate: {
    width: '134px',
    height: '63px'
  },
  logo: {
    fontSize: '10px',
    fontWeight: '900',
    textAlign: 'center',
    textTransform: 'uppercase'
  },
  text: {
    fontSize: '9px',
    textAlign: 'center'
  },
  name: {
    textAlign: 'center',
    fontSize: '10px',
    fontWeight: '600',
    lineHeight: '20px',
    letterSpacing: '0.001em'
  }
}));
