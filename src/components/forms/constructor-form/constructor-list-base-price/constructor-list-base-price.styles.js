import { makeStyles } from '@material-ui/core/styles';
import { formStyles } from '../../../../configs/styles';

export const useStyles = makeStyles((theme) => {
  const { textField } = formStyles(theme);

  return {
    heading: {
      fontSize: theme.typography
    },
    secondaryHeading: {
      fontSize: theme.typography,
      color: theme.palette.text.secondary
    },
    textField
  };
});
