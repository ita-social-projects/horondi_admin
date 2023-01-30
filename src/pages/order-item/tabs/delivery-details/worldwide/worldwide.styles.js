import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
    selectWrapper: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '10px 30px',

      '@media (max-width: 575px)': {
        gridTemplateColumns: '1fr'
      }
    },
    formControl: {
      marginBottom: '5px'
    },
    addressInput: {
      marginBottom: '5px',
      width: '100%'
    },
    addressTitle: {
      fontWeight: 400,
      fontSize: 16,
      color: '#4E4E4E'
    },
    addressInputCode: {
      width: '160px'
    }
  }));
