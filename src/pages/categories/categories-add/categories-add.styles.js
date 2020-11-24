import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  addCategory: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  addFields: {
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
    margin: theme.spacing(2)
  },
  addForm: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  wrapper: {
    width: '100%'
  },
  saveBtn: {
    margin: '0 16px 16px'
  },
  addNameForm: {
    maxWidth: '400px',
    minWidth: '200px',
    display: 'flex',
    flexDirection: 'column'
  },
  addNameInput: {
    margin: '8px 0'
  },
  addNameBtn: {
    marginBottom: '8px'
  },
  imageSelect: {
    display: 'flex',
    flexDirection: 'column',
    margin: '8px 0'
  },
  addImageForm: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '400px',
    minWidth: '200px'
  },
  addNameBtnGroup: {
    display: 'flex',
    flexDirection: 'row'
  },
  divider: {
    width: '5px',
    height: 'auto',
    display: 'inline-block'
  },
  imageContainer: {
    width: 100,
    height: 100,
    position: 'relative'
  },
  photoUpload: {
    display: 'none'
  },
  userImage: {
    height: '100%',
    width: '100%',
    borderRadius: 5
  },
  uploadLabel: {
    height: '100%',
    width: '100%',
    opacity: 0,
    textAlign: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 2,
    border: '3px solid #3f51b5',
    background: 'white',
    borderRadius: 5,
    transition: 'all 1s ease',
    '& > span': {
      fontSize: 100,
      color: 'white',
      textShadow:
        '-3px -3px 0 #3f51b5,3px -3px 0 #3f51b5,-3px 3px 0 #3f51b5,3px 3px 0 #3f51b5'
    },
    '&:hover': {
      opacity: 1,
      transition: 'all 1s ease'
    }
  },
  uploadBtn: {
    width: '100%',
    height: '100%',
    fontWeight: 'bold'
  },
  controlsBlock: {
    display: 'flex'
  }
}));
