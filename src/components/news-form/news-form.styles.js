import { makeStyles } from '@material-ui/core/styles';
import { formStyles } from '../../configs/styles';

export const useStyles = makeStyles((theme) => {
  const { saveButton, tabs, controlsBlock, itemUpdate, textField } = formStyles(
    theme
  );
  return {
    newsItemUpdate: {
      ...itemUpdate
    },
    formContainer: {
      width: '100%',
      padding: 20,
      marginTop: 70
    },
    textField,
    tabs,
    controlsBlock,
    saveButton
  };
});
