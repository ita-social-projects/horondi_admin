import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  formContainer: {
    width: '100%',
    padding: '20px',
  },
  slideItemUpdate: {
    display: 'flex',
    flexDirection: 'column',
    margin: '20px 0px'
  },
  patternDetails: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  saveButton: {
    margin: theme.spacing(2)
  },
  returnButton: {
    margin: theme.spacing(2),
    marginRight: 0
  },
  textField: {
    margin: '10px 5px'
  },
  tabs: {
    backgroundColor: 'white',
    '& span.MuiTab-wrapper': {
      color: '#3F51B5'
    },
    '& span.MuiTabs-indicator': {
      backgroundColor: '#3F51B5'
    }
  },
  controlsBlock: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  inputError: {
    color: '#e60000',
    marginLeft: '5px'
  },

  imageUploadContainer: {
    display: 'flex',
    alignItems: 'center',
    margin: '10px'
  },
  large: {
    marginLeft: '10px',
    width: theme.spacing(6),
    height: theme.spacing(6)
  },
  imageName: {
    fontSize: '.9rem',
    marginLeft: '10px',
    color: 'rgba(0, 0, 0, 0.54)',
    '@media (max-width: 768px)': {
      display: 'none'
    }
  },
  imageUpload: {
    fontSize: 14,
    marginLeft: '10px',
    color: 'rgba(0, 0, 0, 0.54)'
  },
  attachFile: {
    marginRight: '5px'
  },
  square:{
    position:'absolute',
    height:'90%',
    width:'90%',
    backgroundColor:'gray',
  },
  slideContent:{
    paddingTop: theme.spacing(2),
    position:'absolute',
    height:'90%',
    width:'90%',
    color: 'white',
    display:'flex',
    alignItems:'center',
    flexDirection: 'column',
    textShadow:'2px 2px 5px black',
    '& div': {
      marginTop: theme.spacing(4),
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
      flexDirection: 'column',
      textAlign:'center',
      '& h3': {
        fontSize:'28px',
        margin:'0px'
      },
      '& p': {
        fontSize:'24px',
        padding: theme.spacing(1),
        lineHeight: '30px',
      },
    },

  },
  discoverMore:{
    position:'absolute',
    bottom:'0px',
    fontSize:'18px',
    '& span': {
      paddingLeft:'3px'
    }
  },
  slideWrapper:{
    margin: theme.spacing(2),
    width:'50%',
    minHeight:'350px',
    display:'flex',
    position:'relative',
    justifyContent:'center',
    alignItems:'center',
    height:'150px',
  },
  slideIcon:{
    height:'100px',
    width:'100px',
  },
  slideTitle: {
    marginBottom: theme.spacing(1),
    fontSize: 24,
    color: theme.palette.text.disabled,
    fontWeight: 'bold'
  },
}));
