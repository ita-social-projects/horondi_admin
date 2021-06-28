import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
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
