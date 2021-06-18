import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  paginationDiv: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '30px'
  },
  constructorButton: {
    display: 'inline',
    '@media (max-width: 450px)': {
      '& button': {
        margin: '10px 0px 10px'
      }
    }
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200
  },
  selectedEmpty: {
    margin: theme.spacing(2)
  }
}));
