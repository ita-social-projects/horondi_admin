import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
  product: {
    margin: 10,
    padding: 10
  },
  props: {
    display: 'flex'
  },
  propsText: {
    textTransform: 'uppercase'
  }
}));
