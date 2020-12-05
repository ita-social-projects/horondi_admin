import { makeStyles } from '@material-ui/core/styles';
import { formStyles } from '../../../configs/styles';

export const useStyles = makeStyles((theme) => {
  const { imageUploadAvatar } = formStyles(theme);

  return {
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
      margin: '10px 5px !important'
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
      width: '100%',
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
    imageUploadAvatar
  };
});
