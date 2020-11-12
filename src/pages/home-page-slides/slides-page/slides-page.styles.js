import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  container: {
    width: `100%`,
    marginTop: 65,
    position: 'static',
    padding: theme.spacing(3)
  },
  slideTitle: {
    marginBottom: theme.spacing(1),
    fontSize: 24,
    color: theme.palette.text.disabled,
    fontWeight: 'bold',
    '@media (max-width: 375px)': {
      fontSize:theme.spacing(2),
    }
  },
  createButton:{
    '@media (max-width: 576px)': {
      zoom:'80%'
    },
    '@media (max-width: 375px)': {
      zoom:'65%'
    },
  },
  paginationDiv:{
    display: 'flex',
    justifyContent: 'center',
    margin: theme.spacing(2),
  },
  pagination:{
    '@media (max-width: 576px)': {
      zoom:'80%'
    },
    '@media (max-width: 375px)': {
      zoom:'65%'
    },
  },
  tableNav: {
    margin: theme.spacing(1),
  },
  tableContainer:{
    '@media (max-width: 576px)': {
      zoom:'80%'
    },
    '@media (max-width: 375px)': {
      zoom:'70%'
    },
  }

}));
