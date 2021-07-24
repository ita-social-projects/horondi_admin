import { makeStyles } from '@material-ui/core/styles';
import { formStyles } from '../../../configs/styles';

export const useStyles = makeStyles((theme) => {
  const { saveButton, textField, returnButton } = formStyles(theme);
  return {
    error: {
      color: '#e60000',
      marginLeft: '5px'
    },
    buttonContainer: {
      position: 'relative',
      width: '100%',
      height: 90,
      marginTop: -13,
      '@media (max-width: 600px)': {
        marginTop: -21
      }
    },
    button: {
      marginTop: theme.spacing(0.5)
    },
    fixedButtons: {
      position: 'fixed',
      height: 90,
      zIndex: 1001,
      backgroundColor: theme.palette.bodyColor
    },
    textField,
    saveButton,
    returnButton
  };
});
