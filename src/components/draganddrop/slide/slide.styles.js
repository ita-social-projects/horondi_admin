import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  dndItem: {
    marginBottom: theme.spacing(1),
    display: 'flex',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    height: theme.spacing(20)
  },

  square: {
    position: 'absolute',
    width: theme.spacing(30),
    height: theme.spacing(15),
    backgroundColor: 'gray',
    '@media (max-width: 375px)': {
      width: theme.spacing(25)
    }
  },
  slideContent: {
    paddingTop: theme.spacing(2),
    position: 'absolute',
    width: theme.spacing(30),
    height: theme.spacing(15),
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    textShadow: '2px 2px 5px black',
    '& h3': {
      lineHeight: 'normal'
    },
    '& div': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      textAlign: 'center',
      '& h3': {
        fontSize: '13px',
        margin: '0px',
        '@media (max-width: 450px)': {
          fontSize: '10px'
        },
        '@media (max-width: 375px)': {
          display: 'none'
        }
      },
      '& p': {
        fontSize: '10px',
        wordWrap: 'initial',
        '@media (max-width: 375px)': {
          display: 'none'
        },
        '@media (max-width: 450px)': {
          fontSize: '8px'
        }
      }
    }
  },
  discoverMore: {
    position: 'absolute',
    bottom: '0px',
    fontSize: '11px',
    '@media (max-width: 375px)': {
      display: 'none'
    },
    '& span': {
      paddingLeft: '3px'
    }
  },

  dndDivison: {
    padding: '8px',
    width: '380px'
  }
}));
