import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  filters: {
    marginTop: theme.spacing(1),
    paddingRight:'0px !important',
  },
  filtersMenu:{
    width:'100%',
    padding:'10px'
  },
  heading: {
    marginBottom: theme.spacing(1),
    paddingLeft:'10px',
    fontSize: 20,
    color: theme.palette.text.disabled,
    fontWeight: 'bold'
  },
}));
