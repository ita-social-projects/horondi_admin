import { makeStyles } from '@material-ui/core/styles';
import { formStyles } from '../../../../configs/styles';

export const useStyles = makeStyles((theme) => {
  const { inputError } = formStyles(theme);
  return {
    quantity: {
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center'
    },
    addBtn: {
      margin: '12px 0px'
    },
    generate: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end'
    },
    section: {
      display: 'flex',
      justifyContent: 'flex-start',
      gap: '20%',
      width: '100%',
      '@media(max-width:580px)': {
        flexDirection: 'column',
        gap: '5%'
      }
    },
    promoBtn: {
      margin: '12px 0px',
      '@media(max-width:580px)': {
        width: 'fit-content'
      }
    },
    error: {
      color: 'red',
      fontSize: '12px',
      height: '12px'
    },
    inputError
  };
});
