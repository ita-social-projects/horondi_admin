import { makeStyles } from '@material-ui/core/styles';
import { formStyles } from '../../../configs/styles';

export const useStyles = makeStyles((theme) => {
  const { saveButton, tabs, controlsBlock, itemUpdate, textField } = formStyles(
    theme
  );
  return {
    newsItemUpdate: {
      ...itemUpdate
    },
    inputError: {
      color: '#e60000',
      marginLeft: '5px'
    },
    formContainer: {
      width: '100%',
      padding: 20,
      marginTop: 70
    },
    imageUploadAvatar: {
      padding: '10px',
      display: 'flex',
      alignItems: 'center',
      '& div:nth-child(2)': {
        marginLeft: '15px'
      }
    },
    textField,
    tabs,
    controlsBlock,
    saveButton
  };
});
