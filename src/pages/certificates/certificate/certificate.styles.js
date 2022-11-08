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
    margin: '0'
  },
  img: {
    width: '136px',
    height: '63px',
    objectFit: 'cover'
  }
}));
