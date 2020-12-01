import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  container:{
    width:'100%',
  },
  badge:{
    width:'100%',
  },
  formControl: {
    margin: theme.spacing(1),
    width:'100%',
  },
  menuItems:{
    textTransform:'capitalize'
  },
  filterIcon:{
    position:'absolute',
    right:15,
    top:-12
  }
}));
