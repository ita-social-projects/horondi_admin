import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  colorForm: {
    '& div': {
      '& div': {
        '& div': {
          paddingLeft: 0,
          paddingRight: 0,
          marginLeft: '0 !important',
          marginRight: '0 !important',
          marginBottom: '0 !important',
          '& textarea': {
            paddingLeft: '1rem !important'
          }
        }
      }
    }
  },
  materialItemAdd: {
    display: 'flex',
    flexDirection: 'column',
    margin: '0 0 20px !important'
  },
  textfield: {
    margin: '10px 0 !important'
  },
  materialAdd: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  saveButton: {
    margin: theme.spacing(2)
  },
  container: {
    width: '360px',
    padding: 20,
    marginTop: 70
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
    color: theme.palette.error.main,
    padding: '0 5px'
  },
  errorTab: {
    backgroundColor: theme.palette.error.main,
    '& span': {
      color: 'white !important'
    }
  },
  popover: {
    position: 'absolute',
    zIndex: '2'
  },
  cover: {
    position: 'fixed',
    top: '0px',
    right: '0px',
    bottom: '0px',
    left: '0px'
  },
  colorPickerBlock: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
}));
