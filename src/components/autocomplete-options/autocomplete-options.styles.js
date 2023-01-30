import { makeStyles } from '@material-ui/core';
import { formStyles } from '../../configs/styles';

export const useStyles = makeStyles((theme) => {
  const { textField } = formStyles(theme);

  return {
    inputPanel: {
      display: 'flex',
      flexDirection: 'column',
      margin: '10px 0',
      padding: '10px'
    },
    error: {
      color: '#e60000',
      marginLeft: '5px'
    },
    textField
  };
});
