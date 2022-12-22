import { makeStyles } from '@material-ui/core/styles';
import { formStyles } from '../../configs/styles';

export const useStyles = makeStyles((theme) => {
  const { tabs, textField, inputError, saveButton, controlsBlock } =
    formStyles(theme);
  return {
    materialItemAdd: {
      display: 'flex',
      flexDirection: 'column',
    },
    materialAdd: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around'
    },
    container: {
      width: '360px',
      padding: 20,
      '@media (max-width: 450px)': {
        width: '100%',
        padding: 0
      }
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
      alignItems: 'center',
      padding: '8px',
      '& .MuiOutlinedInput-root': {
        minWidth: '208px'
      }
    },
    tabs: {
      ...tabs,
      '& span.MuiTabs-indicator': {
        height: '3px'
      }
    },
    saveBtnContainer: {
      textAlign: 'center'
    },
    saveButton: {
      ...saveButton,
      '&.MuiButton-root': {
        margin: '0'
      },
    },
    textField,
    inputError,
    controlsBlock
  };
});
