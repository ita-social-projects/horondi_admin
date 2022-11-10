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
    backgroundImage: `url(${certificate})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    position: 'relative'
  },
  value: {
    position: 'absolute',
    top: '45px',
    left: '62px',
    fontWeight: '700',
    fontSize: '5px',
    lineHeight: '8px',
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
