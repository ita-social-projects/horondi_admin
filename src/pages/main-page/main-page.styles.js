import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 65,
    padding: theme.spacing(3),
    width: '100vw',
    height: `calc(100vh - 125px)`,
    boxSizing: 'border-box'
  },
  pageTitle: {
    fontSize: 24,
    color: theme.palette.text.disabled,
    fontWeight: 'bold'
  },
  container: {
    display: 'flex',
    padding: '15px 0',
    boxSizing: 'border-box',
    '@media (max-width: 599px)': {
      display: 'block'
    }
  },
  blockTitle: {
    padding: 15,
    color: theme.palette.text.disabled
  },
  commentsOrders: {
    height: 'calc(100vh - 179px)',
    width: '50%',
    '@media (max-width: 599px)': {
      width: '100%',
      height: 'fit-content'
    }
  },
  ordersContainer: {
    height: '50%',
    marginBottom: theme.spacing(3),
    '@media (max-width: 599px)': {
      height: '100vh'
    }
  },
  orders: {
    height: 'calc(100% - 50px)',
    overflowY: 'auto'
  },
  order: {
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: 'darkgrey',
      fontWeight: 'bold'
    }
  },
  commentsContainer: {
    height: '50%',
    marginTop: theme.spacing(3),
    paddingBottom: 15,
    '@media (max-width: 599px)': {
      height: 'fit-content',
      width: '100%',
      paddingBottom: 0
    }
  },
  comments: {
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'auto',
    padding: '0 15px',
    height: 'calc(100% - 50px)',
    boxSizing: 'border-box'
  },
  comment: {
    borderBottom: '1px solid lightgrey',
    marginBottom: 10
  },
  commentInfo: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  commentText: {
    fontSize: '1.1em',
    marginBottom: 5
  },
  changesContainer: {
    width: '50%',
    height: 'calc(100vh - 155px)',
    marginLeft: theme.spacing(3),
    '@media (max-width: 599px)': {
      height: 'fit-content',
      width: '100%',
      marginLeft: 0,
      marginTop: theme.spacing(3)
    }
  },
  emptyOrders: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '1.5em',
    marginTop: -55,
    textAlign: 'center'
  }
}));
