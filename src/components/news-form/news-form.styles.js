import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  newsItemUpdate: {
    display: 'flex',
    flexDirection: 'column',
    margin: '20px 0'
  },
  newsDetails: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  saveButton: {
    margin: theme.spacing(2)
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
  }
}));
