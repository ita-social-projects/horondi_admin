import { makeStyles } from '@material-ui/core/styles';
import { formStyles } from '../../../../configs/styles';

export const useStyles = makeStyles((theme) => {
  const { textField, inputError } = formStyles(theme);

  return {
    heading: {
      fontSize: theme.typography,
      marginRight: '10px'
    },
    secondaryHeading: {
      fontSize: theme.typography,
      ...inputError
    },
    textField
  };
});
