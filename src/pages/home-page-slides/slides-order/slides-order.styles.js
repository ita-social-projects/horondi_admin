import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    width: `100%`,
    flexDirection: 'column',
    justifyContent: 'center',
    padding: theme.spacing(2)
  },
  dndContainer: {
    display: 'flex',
    width: `100%`,
    flexDirection: 'row',
    justifyContent: 'center',
    '@media (max-width: 768px)': {
      flexDirection: 'column',
      alignItems: 'center'
    }
  },
  dndGroup: {
    margin: '20px',
    height: '400px',
    overflowY: 'scroll',
    width: '350px',
    padding: theme.spacing(2),
    position: 'relative',
    '@media (max-width: 768px)': {
      margin: '20px 0px',
      padding: theme.spacing(1),
      height: '100%',
      minHeight: '200px',
      overflowY: 'hidden'
    },
    '@media (max-width: 430px)': {
      width: '100%'
    }
  },
  dndItem: {
    marginBottom: theme.spacing(1),
    display: 'flex',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    height: theme.spacing(20)
  },
  current: {
    backgroundColor: 'gray'
  },
  cardTitle: {
    top: '0',
    maxWidth: 'inherit',
    height: '40px'
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
    '& div': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      textAlign: 'center',
      '& h3': {
        fontSize: '13px',
        margin: '0px'
      },
      '& p': {
        fontSize: '10px',
        wordWrap: 'initial'
      }
    }
  },
  slideTitle: {
    marginBottom: '10px',
    fontSize: theme.spacing(3),
    color: theme.palette.text.disabled,
    fontWeight: 'bold',
    '@media (max-width: 375px)': {
      fontSize: theme.spacing(2)
    }
  },
  discoverMore: {
    position: 'absolute',
    bottom: '0px',
    fontSize: '11px',
    '& span': {
      paddingLeft: '3px'
    }
  },
  saveButton: {
    marginRight: theme.spacing(1),
    '@media (max-width: 576px)': {
      zoom: '80%'
    },
    '@media (max-width: 375px)': {
      zoom: '65%'
    }
  }
}));
