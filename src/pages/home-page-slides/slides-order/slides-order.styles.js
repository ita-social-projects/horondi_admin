import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  container:{
    display: 'flex',
    width: `100%`,
    flexDirection: 'column',
    justifyContent: 'center',
    padding: theme.spacing(2),
  },
  dndContainer: {
    display: 'flex',
    width: `100%`,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dndGroup: {
    margin: '20px',
    height: '400px',
    overflowY: 'scroll',
    minHeight: '400px',
    width: '350px',
    padding: theme.spacing(2),
    position:'relative',
  },
  dndItem: {
    marginBottom: theme.spacing(1),
    display:'flex',
    position:'relative',
    justifyContent:'center',
    alignItems:'center',
    height:'150px',
  },
  current:{
    backgroundColor:'gray',
  },
  cardTitle: {
    top: '0',
    maxWidth:'inherit',
    height:'40px'
  },
  square:{
    position:'absolute',
    height:'80%',
    width:'80%',
    backgroundColor:'gray',
  },
  slideContent:{
    paddingTop: theme.spacing(2),
    position:'absolute',
    height:'80%',
    width:'80%',
    color: 'white',
    display:'flex',
    alignItems:'center',
    flexDirection: 'column',
    textShadow:'2px 2px 5px black',
    '& div': {
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
      flexDirection: 'column',
      textAlign:'center',
      '& h3': {
        fontSize:'13px',
        margin:'0px'
      },
      '& p': {
        fontSize:'11px',
      },
    },

  },
  slideTitle: {
    marginBottom: theme.spacing(1),
    fontSize: 24,
    color: theme.palette.text.disabled,
    fontWeight: 'bold'
  },
  discoverMore:{
    position:'absolute',
    bottom:'0px',
    fontSize:'11px',
    '& span': {
      paddingLeft:'3px'
    }
  },
  saveButton:{
    marginLeft: theme.spacing(1),
  }
}));
