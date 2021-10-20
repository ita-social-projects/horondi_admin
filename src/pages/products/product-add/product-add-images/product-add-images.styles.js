import { makeStyles } from '@material-ui/core/styles';
import { formStyles } from '../../../../configs/styles';

export const useStyles = makeStyles((theme) => {
  const { inputError } = formStyles(theme);

  return {
    inputError
  };
});
