import { makeStyles } from '@material-ui/core/styles';
import { formStyles } from '../../../../configs/styles';

export const useStyles = makeStyles((theme) => {
  const {
    tabs
  } = formStyles(theme);
  return {
    backButton: {
      paddingBottom: '20px'
    },
    tabs,
  };
});
