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
    returnButton,
    large,
    controlsBlock,
    tabs,
    textField,
    inputError
  };
});
