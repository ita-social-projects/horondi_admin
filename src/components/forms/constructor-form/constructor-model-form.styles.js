import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%'
  },
  constructorButton: {
    display: 'inline',
    '@media (max-width: 450px)': {
      '& button': {
        margin: '10px 0px 10px'
      }
    }
  },
  materialTitle: {
    marginBottom: '10px',
    fontSize: 24,
    color: theme.palette.text.disabled,
    fontWeight: 'bold',
    '@media (max-width: 450px)': {
      fontSize: theme.spacing(2)
    }
  }
}));
