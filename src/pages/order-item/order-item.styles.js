import { makeStyles } from '@material-ui/core/styles';
import { formStyles } from '../../configs/styles';

export const useStyles = makeStyles((theme) => {
  const { inputError } = formStyles(theme);
  return {
    orderContainer: {
      width: '100%',
      padding: '0 20px',
      '@media (max-width: 450px)': {
        '& button': {
          'font-size': '11px'
        }
      }
    },
    saveBtn: {
      marginLeft: 20
    },
    general: {
      display: 'grid',
      gridGap: '15px',
      padding: '20px 15px 10px'
    },
    registeredUser: {
      display: 'grid',
      gridGap: '15px',
      padding: '20px 15px 10px'
    },
    delivery: {
      display: 'grid',
      gridGap: '15px',
      padding: '20px 15px 10px'
    },
    recipient: {
      display: 'grid',
      gridGap: '15px',
      padding: '20px 15px 10px'
    },
    products: {
      display: 'grid',
      gridGap: '15px',
      padding: '20px 15px 10px'
    },
    selectedProduct: {
      backgroundColor: theme.palette.textColor,
      display: 'flex',
      flexDirection: 'column',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
      width: 550,
      fontSize: 20,
      padding: 20,
      position: 'absolute',
      '&:focus': {
        outline: 'none'
      }
    },
    productHeading: {
      textAlign: 'center'
    },
    productField: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 14
    },
    dateContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '0px 14px'
    },
    isPaid: {
      marginLeft: '14px'
    },
    idContainer: {
      padding: '0px 14px'
    },
    deliveryDetails: {
      display: 'grid',
      gridGap: 10
    },
    renderList: {
      margin: '9px 0px',
      '& > li': {
        marginBottom: '5px'
      }
    },
    controlsBlock: {
      display: 'flex',
      margin: '20px 0'
    },
    buttonContainer: {
      position: 'relative',
      width: '100%',
      height: 60,
      marginTop: 51,
      '@media (max-width: 600px)': {
        marginTop: '36px'
      },
      '@media (max-width: 333px)': {
        marginTop: '43px'
      }
    },
    fixedButtons: {
      position: 'fixed',
      height: 60,
      zIndex: 1001,
      backgroundColor: theme.palette.bodyColor
    },
    button: {
      marginTop: theme.spacing(0.5)
    },
    ul: {
      padding: '5px 0px',
      '& > li': {
        display: 'flex',
        gap: '5px',
        margin: '5px 0'
      }
    },
    tableCollapse: {
      padding: '0 50px'
    },
    cellHeader: {
      marginTop: '10px'
    },
    materialName: {
      fontWeight: 'bold'
    },
    inputError
  };
});
