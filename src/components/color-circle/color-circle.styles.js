import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  colorCircle: (props) => ({
    width: props.size,
    height: props.size,
    backgroundColor: props.color,
    borderRadius: '100%',
    border: '1px solid gray',
    margin: '5px'
  })
}));
