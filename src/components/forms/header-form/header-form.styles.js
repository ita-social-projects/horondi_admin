import { makeStyles } from '@material-ui/core/styles';
import { formStyles } from '../../../configs/styles';

export const useStyles = makeStyles((theme) => {
  const {
    large,
    controlsBlock,
    tabs,
    itemUpdate,
    details,
    returnButton,
    textField,
    inputError
  } = formStyles(theme);
  return {
    headerItemUpdate: {
      ...itemUpdate
    },
    headerDetails: {
      ...details
    },
    saveButton: {
      '@media (max-width: 350px)': {
        margin: '10px 0 10px'
      },
      '@media (min-width: 350px)': {
        margin: '10px 10px 10px'
      }
    },
    buttonContainer: {
      position: 'relative',
      width: '100%',
      height: 60,
      marginTop: 51
    },
    fixedButtons: {
      position: 'fixed',
      height: 60,
      zIndex: 1001,
      backgroundColor: theme.palette.bodyColor,
      '@media (max-width: 310px)': {
        'height': '112px'
      }
    },
    button: {
      marginTop: theme.spacing(0.5)
    },
    returnButton,
    large,
    controlsBlock,
    tabs,
    textField,
    inputError
  };
});
