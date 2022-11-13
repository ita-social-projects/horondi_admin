import { makeStyles } from '@material-ui/core/styles';
import certificate from '../../../assets/images/certificate.png';

export const useStyles = makeStyles(() => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  certificate: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '136px',
    height: '63px',
    background: `center/cover url(${certificate}) no-repeat`
  },
  title: {
    fontSize: '11px'
  },
  value: {
    width: '35px',
    fontWeight: '700',
    fontSize: '5px',
    lineHeight: '9px',
    textAlign: 'center',
    fontStyle: 'italic'
  },
  name: {
    textAlign: 'center',
    fontSize: '10px',
    fontWeight: '900',
    lineHeight: '20px',
    margin: '0'
  }
}));
