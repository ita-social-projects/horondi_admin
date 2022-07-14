import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
  createButton: {
    '@media (max-width: 576px)': {
      zoom: '80%'
    },
    '@media (max-width: 375px)': {
      zoom: '65%'
    }
  },
  tableContainer: {
    '@media (max-width: 576px)': {
      zoom: '80%'
    },
    '@media (max-width: 375px)': {
      zoom: '70%'
    }
  }
}));
