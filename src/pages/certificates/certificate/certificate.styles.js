import { makeStyles } from '@material-ui/core/styles';
import certificate from '../../../assets/images/certificate.png';

export const useStyles = makeStyles(() => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  certificate: {
    width: '136px',
    height: '63px',
    background: `center/cover url(${certificate}) no-repeat`,
    position: 'relative'
  },
  title: {
    position: 'absolute',
    top: '8px',
    left: '45px',
    fontSize: '11px'
  },
  value: {
    position: 'absolute',
    top: '30px',
    left: '53px',
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
