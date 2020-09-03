import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
    padding: '0 20px',
    paddingTop: '90px'
  },
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
  tabs: {
    backgroundColor: '#3F51B5',
    '& span.MuiTab-wrapper': {
      color: 'white'
    },
    '& span.MuiTabs-indicator': {
      backgroundColor: 'white'
    }
  },
  addNameBtnGroup: {
    display: 'flex',
    flexDirection: 'row'
  },
  divider: {
    width: '5px',
    height: 'auto',
    display: 'inline-block'
  }
}));
