import { makeStyles } from '@material-ui/core/styles';
import { formStyles } from '../../configs/styles';

export const useStyles = makeStyles((theme) => {
  const { textField } = formStyles(theme);
  return {
    additionalPrice: {
      '@media (max-width: 450px)': {
        width: 'inherit'
      },
      width: '550px'
    },
    additionalPricePaper: {
      display: 'flex',
      flexDirection: 'column',
      margin: '10px 0',
      padding: '10px'
    },
    currencyField: {
      width: '170px',
      '@media (max-width: 450px)': {
        width: 'inherit'
      }
    },
    textField
  };
});
