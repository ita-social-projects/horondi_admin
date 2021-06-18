import { makeStyles } from '@material-ui/core/styles';
import { formStyles } from '../../../../configs/styles';

export const useStyles = makeStyles((theme) => {
  const { tabs } = formStyles(theme);
  return {
    backButton: {
      paddingBottom: '20px'
    },
    dialogTitle: {
      width: '400px'
    },
    avatar: {
      marginLeft: theme.spacing(8),
      marginRight: theme.spacing(2),
      width: theme.spacing(8),
      height: theme.spacing(8),
      padding: '5px',
      backgroundColor: '#ceded2'
    },
    tabs
  };
});
