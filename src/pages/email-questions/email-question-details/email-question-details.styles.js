import { makeStyles } from '@material-ui/core/styles';

const colors = {
  light: {
    darken: '#303030',
    lighten: '#7a7a7a'
  },
  dark: {
    darken: '#eeeeee',
    lighten: '#b0b0b0'
  }
};

export const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
    padding: 100,
    marginTop: 70
  },
  data: {
    display: 'flex',
    '& > *': {
      flexBasis: '50%'
    }
  },
  customer: {
    marginBottom: '10px',
    '& p': {
      fontSize: '1.5em',
      color: colors[theme.palette.type].lighten,
      margin: '10px 0',

      '& span': {
        fontWeight: 'bold',
        color: colors[theme.palette.type].darken
      }
    }
  },
  admin: {
    marginBottom: '10px',
    '& p': {
      fontSize: '1.5em',
      color: colors[theme.palette.type].lighten,
      margin: '10px 0',

      '& span': {
        fontWeight: 'bold',
        color: colors[theme.palette.type].darken
      }
    }
  },
  controlsBlock: {
    display: 'flex'
  },
  controlButton: {
    margin: '20px 10px 20px 0'
  },
  errorMessage: {
    color: 'red',
    marginTop: 5,
    marginLeft: 15,
    fontSize: '.9em'
  },
  title: {
    marginBottom: '10px',
    fontSize: 24,
    color: theme.palette.text.disabled,
    fontWeight: 'bold'
  }
}));
