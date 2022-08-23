import { makeStyles } from '@material-ui/core/styles';
import { formStyles } from '../../../../../configs/styles';

export const useStyles = makeStyles((theme) => {
  const { inputError } = formStyles(theme);
  return {
    selectWrapper: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '10px 30px',
      marginBottom: 0,

      '@media (max-width: 575px)': {
        gridTemplateColumns: '1fr'
      }
    },
    paymentSelect: {
      marginBottom: '15px'
    },
    addressInput: {
      marginBottom: '15px',
      width: '100%'
    },
    addressTitle: {
      fontWeight: 400,
      fontSize: 16,
      color: '#4E4E4E'
    },
    addressInputCode: {
      width: '160px'
    },
    inputError
  };
});
